import "./SearchAutoComplete.scss";
import { ProductAutoCompleteCard } from "@components/ecommerce/ui";
import { Loading, RenderList } from "@components/common/utils";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ElementRef, memo, useEffect, useRef } from "react";
import { TProduct } from "@custom-types/product";
import { RequestError } from "@custom-types/shared";

type SearchAutocompleteProps = {
  currentHighlightedResultIdx: number;
  onItemClick: (title: string, idx: number) => void;
  hideAutoComplete: () => void;
  open: boolean;
  searchTerm: string;
  isFetching: boolean;
  products: TProduct[] | undefined;
  error: RequestError;
};

const SearchAutocomplete = memo(
  ({
    searchTerm,
    open,
    currentHighlightedResultIdx,
    products,
    error,
    isFetching,
    onItemClick,
    hideAutoComplete,
  }: SearchAutocompleteProps) => {
    const listRef = useRef<ElementRef<"ul">>(null);
    useEffect(() => {
      if (!listRef.current) return;
      if (currentHighlightedResultIdx >= 0) {
        const selectedItem = listRef.current.children[
          currentHighlightedResultIdx
        ] as HTMLLIElement;
        listRef.current.scrollTo({
          behavior: currentHighlightedResultIdx === 0 ? "instant" : "smooth",
          top:
            selectedItem.offsetTop -
            listRef.current.clientHeight +
            selectedItem.clientHeight,
        });
      }
    }, [currentHighlightedResultIdx]);
    return (
      <div
        className="search-autocomplete"
        style={{
          display: open ? "block" : "none",
        }}
      >
        <Loading
          isFetching={isFetching}
          error={error}
          renderLoader="Loading searched products"
        >
          <ul
            className="search-autocomplete__result-list"
            ref={listRef}
            // TODO: search for the usage of  inputMode, itemRef,..
          >
            <RenderList
              items={products}
              renderItem={(product, index) => (
                <li
                  key={product.id}
                  className={`search-autocomplete__result-item ${
                    currentHighlightedResultIdx === index ? "active" : ""
                  }`}
                  onMouseDown={() => {
                    onItemClick(product.title, index);
                  }}
                >
                  <ProductAutoCompleteCard product={product} />
                </li>
              )}
            />
          </ul>
          <Link
            to={`/search?q=${searchTerm}`}
            onClick={() => hideAutoComplete()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              justifyContent: "center",
            }}
          >
            Search for {searchTerm} <ArrowRight />
          </Link>
        </Loading>
      </div>
    );
  }
);

export default SearchAutocomplete;
