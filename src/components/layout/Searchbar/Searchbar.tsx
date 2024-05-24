import "./Searchbar.scss";
import useDebounce from "@hooks/useDebounce";
import { SearchIcon } from "lucide-react";
import {
  CSSProperties,
  ChangeEvent,
  ElementRef,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import SearchAutocomplete from "./SearchAutoComplete";
import { useGetProductsQuery } from "@store/features/products/productsSlice";
type SearchbarProps = {
  buttonStyles?: CSSProperties;
};
const SearchParam = withDefault(StringParam, "");
function Searchbar({ buttonStyles }: SearchbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParam, setSearchParam] = useQueryParam("q", SearchParam);
  const [currentActiveResultIndex, setCurrentActiveResultIndex] = useState(-1);
  const [selectedResultTitle, setSelectedResultTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [openAutocomplete, setOpenAutoComplete] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const searchbarContainerRef = useRef<ElementRef<"form">>(null);
  const {
    data: products,
    isFetching,
    error,
  } = useGetProductsQuery(`title_like=${debouncedSearchTerm}`, {
    skip: !debouncedSearchTerm,
  });
  useEffect(() => {
    if (location.pathname === "/search") {
      setSearchTerm(searchParam ? searchParam : "");
    }
  }, [searchParam, location.pathname]);
  useEffect(() => {
    const handleOutsideSearchbarClick = (e: MouseEvent) => {
      if (!searchbarContainerRef.current) return;
      if (!searchbarContainerRef.current.contains(e.target as Node)) {
        hideAutocomplete();
      }
    };
    document.addEventListener("click", handleOutsideSearchbarClick);
    return () => {
      document.removeEventListener("click", handleOutsideSearchbarClick);
    };
  }, []);
  function onItemClick(title: string, itemIdx: number) {
    setSelectedResultTitle(title);
    setCurrentActiveResultIndex(itemIdx);
    setTimeout(() => {
      onSearchSubmit();
    }, 0);
  }
  function showAutocomplete() {
    setOpenAutoComplete(true);
  }
  function hideAutocomplete() {
    setOpenAutoComplete(false);
  }
  function onSearchSubmit() {
    if (!inputRef.current) return;
    hideAutocomplete();
    setCurrentActiveResultIndex(-1);
    setSelectedResultTitle("");
    inputRef.current.blur();
    if (location.pathname !== "/search") {
      return navigate(`/search?q=${inputRef.current.value}`);
    }
    setSearchParam(inputRef.current.value || undefined, "replace");
  }
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentActiveResultIndex(-1);
    setSearchTerm(e.target.value);
  }
  function onkeyUp(e: KeyboardEvent<HTMLInputElement>) {
    if (!products) return;
    if (e.key === "ArrowDown") {
      if (currentActiveResultIndex < products.length - 1) {
        setCurrentActiveResultIndex((prevIndex) => prevIndex + 1);
        setSelectedResultTitle(products[currentActiveResultIndex + 1].title);
      } else {
        setCurrentActiveResultIndex(-1);
      }
    }
    if (e.key === "ArrowUp") {
      if (currentActiveResultIndex > 0) {
        setCurrentActiveResultIndex((prevIndex) => prevIndex - 1);
        setSelectedResultTitle(products[currentActiveResultIndex - 1].title);
      } else {
        setCurrentActiveResultIndex(-1);
      }
    }
  }
  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") e.preventDefault();
    if (e.key === "Tab") hideAutocomplete();
  }

  return (
    <form
      className="searchbar-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearchSubmit();
      }}
      ref={searchbarContainerRef}
    >
      <div className="searchbar-form__content">
        <input
          ref={inputRef}
          value={
            currentActiveResultIndex > -1 ? selectedResultTitle : searchTerm
          }
          onKeyUp={onkeyUp}
          onKeyDown={onKeyDown}
          onChange={onChange}
          onFocus={() => showAutocomplete()}
          className="searchbar-form__search-input"
          type="search"
          placeholder="search product here"
        />
        <button style={buttonStyles}>
          <SearchIcon />
        </button>
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            right: "0",
            height: "10px",
          }}
        />
        {searchTerm && (
          <SearchAutocomplete
            hideAutoComplete={hideAutocomplete}
            onItemClick={onItemClick}
            currentHighlightedResultIdx={currentActiveResultIndex}
            searchTerm={debouncedSearchTerm}
            open={openAutocomplete}
            products={products}
            isFetching={isFetching}
            error={error}
          />
        )}
      </div>
    </form>
  );
}

export default Searchbar;
