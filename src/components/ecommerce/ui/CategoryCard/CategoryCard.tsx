import { TCategory } from "@custom-types/category";
import "./CategoryCard.scss";
import { Link } from "react-router-dom";

type CategoryCardProps = {
  category: TCategory;
};
function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div className="category-card">
      <div className="text">
        <Link to={`/store/${category.slug}`} className="category-link">
          {category.title}
        </Link>
        <span className="count">{category.itemsCount} items</span>
      </div>
      <img src={category.img} alt={category.title} />
    </div>
  );
}

export default CategoryCard;
