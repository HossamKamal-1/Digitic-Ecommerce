import { useGetCategoriesQuery } from "@store/features/categories/categoriesSlice";
import "./ProductTagFilter.scss";
import { CardLayout } from "@components/common/ui";
import { Loading, RenderList } from "@components/common/utils";
import { Link } from "react-router-dom";

function ProductTagFilter() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  return (
    <CardLayout className="category-filter" title="Product Tag">
      <div className="category-filter__tag-btns-wrapper">
        <Loading
          renderLoader="Loading Categories"
          isFetching={isLoading}
          error={error}
        >
          <RenderList
            items={categories}
            renderItem={({ slug, title }) => (
              <Link
                key={title}
                to={`/store/${slug}`}
                className="category-filter__tag-btn"
              >
                {title}
              </Link>
            )}
          />
        </Loading>
      </div>
    </CardLayout>
  );
}
export default ProductTagFilter;
