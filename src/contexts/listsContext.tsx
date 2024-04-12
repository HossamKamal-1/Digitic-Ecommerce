import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { Size } from '../components/Product/Product';

export type ListType = 'cart' | 'favorite' | 'compare';
type ProductId = number;
type CartProduct = {
  id: number;
  quantity: number;
  color?: string;
  size?: Size;
};
type UpdateProductQtyActionType = {
  type: 'UPDATE_PRODUCT_QTY';
  payload: {
    productId: ProductId;
    qty: number;
  };
};
type ClearProductActionType = {
  type: 'REMOVE_PRODUCT_FROM_CART';
  payload: {
    productId: ProductId;
  };
};
type ClearAllActionType = {
  type: 'CLEAR_ALL';
  payload: {
    listType: ListType;
  };
};
type AddProductToCartAction = {
  type: 'ADD_PRODUCT_TO_CART';
  payload: {
    cartProduct: CartProduct;
  };
};
type ActionType =
  | {
      type: 'INCREASE_PRODUCT' | 'DECREASE_PRODUCT';
      payload: { productId: ProductId; listType: ListType };
    }
  | ClearProductActionType
  | ClearAllActionType
  | AddProductToCartAction
  | UpdateProductQtyActionType;

type UserProductsCollection = {
  cart: CartProduct[];
  favorite: number[];
  compare: number[];
};
type ProductsListProviderProps = {
  children: ReactNode;
};
const INITIAL_STATE = {
  cart: [],
  favorite: [],
  compare: [],
};
export const ProductsListContext = createContext<{
  dispatch: Dispatch<ActionType>;
  userProductsCollection: UserProductsCollection;
  addProductToCart: (cartProduct: CartProduct) => void;
  toggleListProduct: (
    listType: Exclude<ListType, 'cart'>,
    productId: number
  ) => void;
  isProductExistsInList: (listType: ListType, productId: number) => boolean;
  getTotalCartProductsCount: () => number;
  clearListProducts: (listType: ListType) => void;
  removeProductFromList: (listType: ListType, productId: number) => void;
  updateCartProductQty: (productId: ProductId, qty: number) => void;
  increaseCartProductByOne: (cartProductId: number) => void;
  decreaseCartProductByOne: (cartProductId: number) => void;
}>({
  userProductsCollection: INITIAL_STATE,
  dispatch: () => {},
  toggleListProduct: () => {},
  isProductExistsInList: () => false,
  getTotalCartProductsCount: () => 0,
  clearListProducts: () => {},
  removeProductFromList: () => {},
  addProductToCart: () => {},
  updateCartProductQty: () => {},
  increaseCartProductByOne: () => {},
  decreaseCartProductByOne: () => {},
});

function reducer(currentState: UserProductsCollection, action: ActionType) {
  switch (action.type) {
    case 'INCREASE_PRODUCT': {
      console.log({ action });
      const { listType, productId } = action.payload;
      if (listType === 'cart') {
        // map (update)
        if (currentState.cart.some(({ id }) => id === productId)) {
          const newCartItems = currentState.cart.map((cartProduct) => {
            return cartProduct.id === productId
              ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
              : cartProduct;
          });
          localStorage.setItem('cart-products', JSON.stringify(newCartItems));
          return {
            ...currentState,
            cart: newCartItems,
          };
        } else {
          // pushing (new one)
          const newProduct: CartProduct = { id: productId, quantity: 1 };
          const newCartItems = [...currentState.cart, newProduct];
          localStorage.setItem('cart-products', JSON.stringify(newCartItems));
          return {
            ...currentState,
            cart: newCartItems,
          };
        }
      } else {
        if (!currentState[listType].includes(productId)) {
          const newList = [...currentState[listType], productId];
          localStorage.setItem(`${listType}-products`, JSON.stringify(newList));
          return {
            ...currentState,
            [listType]: newList,
          };
        } else {
          return currentState;
        }
      }
    }
    case 'DECREASE_PRODUCT': {
      const { listType, productId } = action.payload;
      if (listType !== 'cart') {
        if (currentState[listType].includes(productId)) {
          const newCompareList = currentState[listType].filter(
            (id) => id !== productId
          );
          localStorage.setItem(
            `${listType}-products`,
            JSON.stringify(newCompareList)
          );
          return {
            ...currentState,
            [listType]: newCompareList,
          };
        } else {
          return currentState;
        }
      } else {
        // cart decrease logic
        const targetCartItemIndex = currentState.cart.findIndex(
          ({ id }) => id === productId
        );
        if (currentState.cart[targetCartItemIndex].quantity === 1) {
          const filteredCartItems = currentState.cart.filter(
            ({ id }) => id !== productId
          );
          localStorage.setItem(
            'cart-products',
            JSON.stringify(filteredCartItems)
          );
          return {
            ...currentState,
            cart: filteredCartItems,
          };
        } else {
          const newCartItemsWithQuantityChanged = currentState.cart.map(
            (cartProduct) =>
              cartProduct.id === productId
                ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
                : cartProduct
          );
          localStorage.setItem(
            'cart-products',
            JSON.stringify(newCartItemsWithQuantityChanged)
          );
          return {
            ...currentState,
            cart: newCartItemsWithQuantityChanged,
          };
        }
      }
    }
    case 'UPDATE_PRODUCT_QTY': {
      const updatedCartList = currentState.cart.map((cartProduct) => {
        if (cartProduct.id === action.payload.productId) {
          return { ...cartProduct, quantity: action.payload.qty };
        } else {
          return cartProduct;
        }
      });
      localStorage.setItem('cart-products', JSON.stringify(updatedCartList));
      return { ...currentState, cart: updatedCartList };
    }
    case 'ADD_PRODUCT_TO_CART': {
      const newCartProduct = action.payload.cartProduct;
      const cart = [...currentState.cart, newCartProduct];
      localStorage.setItem('cart-products', JSON.stringify(cart));
      return { ...currentState, cart };
    }
    case 'REMOVE_PRODUCT_FROM_CART': {
      const filteredProducts = currentState.cart.filter(
        ({ id }) => id !== action.payload.productId
      );
      localStorage.setItem('cart-products', JSON.stringify(filteredProducts));
      return {
        ...currentState,
        cart: filteredProducts,
      };
    }
    case 'CLEAR_ALL': {
      const { listType } = action.payload;
      localStorage.removeItem(`${listType}-products`);
      return {
        ...currentState,
        [listType]: [],
      };
    }
    default:
      throw new Error(
        `Unexpected action type: ${JSON.stringify(action, undefined, 2)}`
      );
  }
}

const ProductsListProvider = ({ children }: ProductsListProviderProps) => {
  const [userProductsCollection, dispatch] = useReducer(
    reducer,
    INITIAL_STATE,
    () => {
      const cartProductsLs = localStorage.getItem('cart-products');
      const favoriteProductsLs = localStorage.getItem('favorite-products');
      const compareProductsLs = localStorage.getItem('compare-products');
      return {
        cart: cartProductsLs ? JSON.parse(cartProductsLs) : [],
        favorite: favoriteProductsLs ? JSON.parse(favoriteProductsLs) : [],
        compare: compareProductsLs ? JSON.parse(compareProductsLs) : [],
      };
    }
  );
  function isProductExistsInList(listType: ListType, productId: number) {
    if (listType === 'cart') {
      return !!userProductsCollection[listType].find(
        ({ id }) => id === productId
      );
    } else {
      return userProductsCollection[listType].includes(productId);
    }
  }
  function toggleListProduct(
    listType: Exclude<ListType, 'cart'>,
    productId: number
  ) {
    dispatch({
      type: isProductExistsInList(listType, productId)
        ? 'DECREASE_PRODUCT'
        : 'INCREASE_PRODUCT',
      payload: { productId, listType },
    });
  }
  function addProductToCart(cartProduct: CartProduct) {
    dispatch({
      type: 'ADD_PRODUCT_TO_CART',
      payload: {
        cartProduct,
      },
    });
  }
  function clearListProducts(listType: ListType) {
    dispatch({ type: 'CLEAR_ALL', payload: { listType } });
  }
  function getTotalCartProductsCount() {
    return userProductsCollection.cart.reduce(
      (prev, current) => prev + current.quantity,
      0
    );
  }
  function removeProductFromList(listType: ListType, productId: number) {
    if (listType === 'cart') {
      dispatch({
        type: 'REMOVE_PRODUCT_FROM_CART',
        payload: {
          productId,
        },
      });
    } else {
      dispatch({ type: 'DECREASE_PRODUCT', payload: { listType, productId } });
    }
  }
  function updateCartProductQty(productId: ProductId, qty: number) {
    dispatch({
      type: 'UPDATE_PRODUCT_QTY',
      payload: {
        productId,
        qty,
      },
    });
  }
  function increaseCartProductByOne(cartProductId: number) {
    dispatch({
      type: 'INCREASE_PRODUCT',
      payload: { listType: 'cart', productId: cartProductId },
    });
  }
  function decreaseCartProductByOne(cartProductId: number) {
    dispatch({
      type: 'DECREASE_PRODUCT',
      payload: { listType: 'cart', productId: cartProductId },
    });
  }
  return (
    <ProductsListContext.Provider
      value={{
        dispatch,
        userProductsCollection,
        toggleListProduct,
        isProductExistsInList,
        getTotalCartProductsCount,
        clearListProducts,
        removeProductFromList,
        addProductToCart,
        updateCartProductQty,
        increaseCartProductByOne,
        decreaseCartProductByOne,
      }}
    >
      {children}
    </ProductsListContext.Provider>
  );
};
// TODO: make a parameter called listType
export const useListContext = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { userProductsCollection, ...rest } = useContext(ProductsListContext);
  return rest;
};

export default ProductsListProvider;
