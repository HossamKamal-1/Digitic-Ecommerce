import "./Collection.scss";
import headphone from "@assets/images/headphone.jpg";
import speakers from "@assets/images/speaker.jpg";
import laptop from "@assets/images/laptop.jpg";
import camera from "@assets/images/camera.jpg";
import tv from "@assets/images/tv.jpg";
import gaming from "@assets/images/controller.webp";
import { Link } from "react-router-dom";
import EcommerceClient from "@services/ecommerce";
import { useAxios } from "@hooks/useAxios";
import { useGetCategoriesQuery } from "@store/features/categories/categoriesSlice";
import { CategoryCard } from "@components/ecommerce/ui";
import { Loading, RenderList } from "@components/common/utils";
const CATEGORIES = [
  {
    id: 218,
    title: "Computers & Laptops",
    itemsCount: 8,
    img: laptop,
  },
  {
    id: 224,
    title: "Cameras & Videos",
    itemsCount: 10,
    img: camera,
  },
  {
    id: 242,
    title: "Smart Television",
    itemsCount: 12,
    img: tv,
  },
  {
    id: 227,
    title: "SmartWatches",
    itemsCount: 13,
    img: speakers,
  },
  {
    id: 288,
    title: "Music & Gaming",
    itemsCount: 4,
    img: gaming,
  },
  {
    id: 300,
    title: "Mobiles & Tablets",
    itemsCount: 5,
    img: laptop,
  },
  {
    id: 292,
    title: "Headphones",
    itemsCount: 6,
    img: headphone,
  },
  {
    id: 225,
    title: "Accessories",
    itemsCount: 10,
    img: laptop,
  },
  {
    id: 253,
    title: "Portable Speakers",
    itemsCount: 8,
    img: laptop,
  },
  {
    id: 234,
    title: "Home Appliances",
    itemsCount: 6,
    img: laptop,
  },
];
function Collection() {
  // const {
  //   responseData: collections,
  //   isFetching,
  //   error,
  // } = useAxios<Collection[]>(
  //   {
  //     url: "/collections",
  //   },
  //   EcommerceClient
  // );

  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  return (
    <section className="categories-section">
      <div className="container">
        <div className="content">
          <div className="categories-wrapper">
            <Loading
              isFetching={isLoading}
              error={error}
              renderLoader={"Loading"}
            >
              <RenderList
                items={categories}
                renderItem={(category) => (
                  <CategoryCard key={category.title} category={category} />
                )}
              />
            </Loading>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Collection;
