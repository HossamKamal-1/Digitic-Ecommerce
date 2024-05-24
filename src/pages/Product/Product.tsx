import { Link, useParams } from "react-router-dom";
import "./Product.scss";
import { useGetProductBySlugQuery } from "@store/features/products/productsSlice";
import { Rating } from "@components/common/ui";
import { ProductCountDown } from "@components/ecommerce/ui";
import { Heart, Shuffle } from "lucide-react";
import productImage1 from "@assets/images/tab1.jpg";
import productImage2 from "@assets/images/tab2.jpg";
import productImage3 from "@assets/images/tab3.jpg";
function Product() {
  const { productSlug } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductBySlugQuery(productSlug as string, {
    skip: !productSlug,
  });
  console.log({ productSlug, product });
  return (
    <main className="product-page">
      <div className="container">
        <div className="product-page__content-wrapper">
          <div className="product-page__imgs-wrapper">
            <div className="product-page__viewed-img-wrapper">
              <img
                src={productImage1}
                alt=""
                className="product-page__viewed-img"
              />
            </div>
            <div className="product-page__other-imgs-wrapper">
              <div className="product-page__other-img-wrapper">
                <img
                  className="product-page__other-img"
                  src={productImage2}
                  alt=""
                />
              </div>
              <div className="product-page__other-img-wrapper">
                <img
                  className="product-page__other-img"
                  src={productImage3}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="product-page__info-wrapper">
            <h3 className="product-page__title">{product?.title}</h3>
            <div className="product-page__price-rating-wrapper">
              <div className="product-page__price-wrapper">
                <span className="product-page__price">1500</span>
                <span className="product-page__price">2000</span>
              </div>
              <span className="product-page__sale-badge">Sale</span>
              <div className="product-page__rating-wrapper">
                <Rating value={3} spacing={"0"} size={18} />
                <span className="product-page__total-rating">(1 Reviews)</span>
              </div>
              <span className="product-page__write-review-btn">
                Write a review
              </span>
            </div>
            <div className="product-page__details-wrapper">
              {product?.offerExpirationDate && (
                <ProductCountDown
                  productExpirationDate={product.offerExpirationDate}
                />
              )}

              <div className="product-page__brand-wrapper">
                <span className="product-page__info-label">Brand:</span>
                <span className="product-page__brand">Haveless</span>
              </div>
              <div className="product-page__tags-wrapper">
                <span className="product-page__info-label">Tags:</span>
                <ul className="product-page__tags-list">
                  <li className="product-page__tags-list-item">tag1</li>
                  <li className="product-page__tags-list-item">tag1</li>
                </ul>
              </div>
              <div className="product-page__sizes-wrapper">
                <span className="product-page__info-label">Size:</span>
                <div className="product-page__sizes">
                  {product?.size?.map((s) => (
                    <div key={s}>
                      <input
                        id={`${s}-input`}
                        className="product-page__size-radio-input"
                        type="radio"
                        name="sizes"
                        hidden
                      />
                      <label
                        className="product-page__size-label"
                        htmlFor={`${s}-input`}
                      >
                        {s}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="product-page__colors-wrapper">
                <span className="product-page__info-label">Color:</span>
                <div className="product-page__colors">
                  <label htmlFor="">
                    red
                    <input type="checkbox" name="" id="" />
                  </label>
                  <label htmlFor="">
                    green
                    <input type="checkbox" name="" id="" />
                  </label>
                </div>
              </div>
              <div className="product-page__quantity-wrapper">
                <div className="product-page__quantity-box">
                  <span className="product-page__info-label">Quantity:</span>
                  <div className="product-page__quantity-input-wrapper">
                    <input type="text" />
                    <button>+</button>
                    <button>-</button>
                  </div>
                </div>
                <button>Add To Cart</button>
                <Link to="/checkout">Buy It Now</Link>
              </div>
              <div className="product-page__actions-wrapper">
                <button>
                  <Heart /> Add To Wishlist{" "}
                </button>
                <button>
                  <Shuffle /> Add To Compare{" "}
                </button>
              </div>
              <div className="accordion">dasjdisajd</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
