import "./RandomProduct.scss";
import { CardLayout, Rating } from "@components/common/ui";
import { Loading, RenderList } from "@components/common/utils";
import { TProduct } from "@custom-types/product";
import { useGetProductsQuery } from "@store/features/products/productsSlice";
import { formatCurrency, getProductFinalPrice } from "@utils";
import { useMemo } from "react";
import { Link } from "react-router-dom";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
function RandomProductsCard() {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const randomProductsIndices = useMemo(
    () =>
      Array.from({
        length: getRandomNumber(3, 6),
      }).map(() => getRandomNumber(0, products?.length ?? -1)),
    [products?.length]
  );
  const randomProducts = useMemo(
    () => products?.filter((_, idx) => randomProductsIndices.includes(idx)),
    [products, randomProductsIndices]
  );
  console.log({ randomProductsIndices });
  return (
    <CardLayout title="Random Products">
      <Loading
        renderLoader="Loading random products"
        isFetching={isLoading}
        error={error}
      >
        <div className="random-products-wrapper">
          <RenderList
            items={randomProducts}
            renderItem={(product) => (
              <RandomProduct key={product.id} product={product} />
            )}
          />
        </div>
      </Loading>
    </CardLayout>
  );
}

type RandomProductProps = {
  product: TProduct;
};
function RandomProduct({ product }: RandomProductProps) {
  return (
    <div className="random-product-card">
      <div className="random-product-card__image-wrapper">
        <img
          src={product.thumbnails[0]}
          className="random-product-card__img"
          alt="product"
        />
      </div>
      <div className="random-product-card__description-wrapper">
        <Link
          className="random-product-card__title"
          to={`/products/${product.id}`}
          title={product.title}
        >
          {product.title}
        </Link>
        <Rating size={18} value={product.rating.value} />
        <div className="random-product-card__price-wrapper">
          <span
            className={`random-product-card__price${
              product.discountPercentage ? "--old" : ""
            }`}
          >
            {formatCurrency(product.price)}{" "}
          </span>
          {product.discountPercentage && (
            <span className="random-product-card__price--new">
              {formatCurrency(
                getProductFinalPrice(product.price, product.discountPercentage)
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
export default RandomProductsCard;
