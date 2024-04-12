import './PopularProductsSection.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomSlider, Product } from '..';
import laptopImg from '../../assets/images/laptop.jpg';
import catproductbannerImg from '../../assets/images/catproductbanner.jpg';
import { useRef, useState } from 'react';
import { CustomSliderRef } from '../CustomSlider/CustomSlider';
import { ProductItem } from '../Product/Product';
type ProductTab = {
  title: string;
  img: string;
};

const PRODUCTS_TABS: ProductTab[] = [
  {
    title: 'Laptops',
    img: laptopImg,
  },
  {
    title: 'Smart Watch',
    img: laptopImg,
  },
  {
    title: 'Speaker',
    img: laptopImg,
  },
];
function PopularProductsSection() {
  const [currentTab, setCurrentTab] = useState('Smart Watch');
  const sliderRef = useRef<CustomSliderRef>(null);

  return (
    <section className="popular-products-section">
      <div className="container">
        <div className="popular-products-section__content-wrapper">
          <div className="popular-products-section__title-wrapper">
            <h3 className="popular-products-section__title">
              Our Popular Products
            </h3>
            <div className="popular-products-section__controls-wrapper">
              <button
                className="popular-products-section__action-btn"
                onClick={() => sliderRef.current?.handlePrevBtnClick()}
              >
                <ChevronLeft />
              </button>
              <button
                className="popular-products-section__action-btn"
                onClick={() => sliderRef.current?.handleNextBtnClick()}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="popular-products-section__inner-wrapper">
            <ul className="popular-products-section__tabs-list">
              {/* Repeat */}
              {PRODUCTS_TABS.map((tab) => (
                <li
                  className="popular-products-section__tab-item"
                  style={{
                    color: currentTab === tab.title ? 'blueviolet' : '',
                  }}
                  key={tab.title}
                  onClick={() => setCurrentTab(tab.title)}
                >
                  <div className="popular-products-section__tab-img-wrapper">
                    <img
                      src={tab.img}
                      alt={tab.title}
                      className="popular-products-section__tab-img"
                    />
                  </div>
                  <h5 className="popular-products-section__tab-title">
                    {tab.title}
                  </h5>
                </li>
              ))}
            </ul>
            <div className="popular-products-section__products-wrapper">
              <div className="popular-products-section__banner-img-wrapper">
                <img
                  src={catproductbannerImg}
                  alt="banner"
                  className="popular-products-section__banner-img"
                />
              </div>
              <div className="popular-products-section__carousel-wrapper">
                <CustomSlider
                  hideControls
                  gap={1}
                  displayCount={3}
                  ref={sliderRef}
                >
                  {(
                    [
                      {
                        id: 1,
                        title: 'Mobile phone',
                        type: 'smart-phone',
                        seller: 'samsung',
                        price: 2500,
                        discountPercentage: null,
                        thumbnails: [
                          'https://demo-digitic.myshopify.com/cdn/shop/products/15_00_260x.jpg?v=1655096656',
                          'https://demo-digitic.myshopify.com/cdn/shop/products/15_e3ed94b3-4730-40b7-92f8-eeef933a7f4f_260x.jpg?v=1655096645',
                        ],
                        size: ['md', 'lg', 'xl', 'xxl'],
                        color: ['#fff212', '#ff00ff', 'red'],
                        rating: {
                          value: 5,
                          count: 20,
                        },
                        offerExpirationDate: new Date(
                          '2023-12-25T09:17:00.000Z'
                        ),
                      },
                      {
                        id: 2,
                        title: 'Mobile phone 2',
                        seller: 'samsung 2',
                        type: 'smart-phone',
                        price: 2503,
                        discountPercentage: '20%',
                        thumbnails: [
                          'https://demo-digitic.myshopify.com/cdn/shop/products/15_00_260x.jpg?v=1655096656',
                          'https://demo-digitic.myshopify.com/cdn/shop/products/15_e3ed94b3-4730-40b7-92f8-eeef933a7f4f_260x.jpg?v=1655096645',
                        ],
                        size: ['md', 'lg', 'xxl'],
                        color: ['#fff212', 'blue', 'red'],
                        rating: {
                          value: 2,
                          count: 20,
                        },
                        offerExpirationDate: new Date(
                          '2023-12-27T10:44:57.000Z'
                        ),
                      },
                      {
                        id: 3,
                        title: 'Mobile phone 3',
                        seller: 'samsung 3',
                        type: 'tablet',
                        price: 5021.2,
                        discountPercentage: '10%',
                        thumbnails: [
                          'https://demo-digitic.myshopify.com/cdn/shop/products/15_00_260x.jpg?v=1655096656',
                          'https://demo-digitic.myshopify.com/cdn/shop/products/15_e3ed94b3-4730-40b7-92f8-eeef933a7f4f_260x.jpg?v=1655096645',
                        ],
                        size: ['md', 'lg', 'xl', 'xxl'],
                        color: ['#fff212', '#ff00ff', 'red'],
                        rating: {
                          value: 2.5,
                          count: 50,
                        },
                        offerExpirationDate: new Date(
                          '2025-09-23T21:41:41.000Z'
                        ),
                      },
                      {
                        id: 4,
                        title: 'Mobile phone 3',
                        seller: 'samsung 3',
                        type: 'portable-speakers',
                        price: 1000,
                        discountPercentage: '50%',
                        thumbnails: [
                          'https://demo-digitic.myshopify.com/cdn/shop/products/15_00_260x.jpg?v=1655096656',
                          'https://demo-digitic.myshopify.com/cdn/shop/products/15_e3ed94b3-4730-40b7-92f8-eeef933a7f4f_260x.jpg?v=1655096645',
                        ],
                        size: ['md', 'lg', 'xl'],
                        color: ['#fff212', '#ff00ff'],
                        rating: {
                          value: 5,
                          count: 20,
                        },
                        offerExpirationDate: new Date(
                          '2025-01-29T22:20:42.000Z'
                        ),
                      },
                    ] as ProductItem[]
                  ).map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
                </CustomSlider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularProductsSection;
