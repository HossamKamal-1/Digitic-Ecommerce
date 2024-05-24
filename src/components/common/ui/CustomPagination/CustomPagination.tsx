import { ChevronLeft, ChevronRight } from "lucide-react";
import "./CustomPagination.scss";
type CustomPaginationProps = {
  currentPage: number;
  totalPages: number;
  setPageHandler: (page: number) => void;
};
function CustomPagination({
  currentPage,
  totalPages,
  setPageHandler,
}: CustomPaginationProps) {
  function movePage(direction: "backward" | "forward") {
    if (direction === "backward") {
      setPageHandler(currentPage > 1 ? currentPage - 1 : 1);
      // setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    } else {
      setPageHandler(currentPage < totalPages ? currentPage + 1 : totalPages);
      // setPage((prevPage) =>
      //   prevPage < totalPages ? prevPage + 1 : totalPages
      // );
    }
  }
  return (
    <div className="pagination">
      <div className="pagination__content">
        <span className="pagination__current-pagination-info">
          showing {currentPage} of {totalPages}
        </span>
        <div className="pagination__pagination-bullet-wrapper">
          <button
            className="pagination__prev-pagination pagination__pagination-bullet"
            onClick={() => movePage("backward")}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              className={`pagination__pagination-bullet ${
                currentPage === index + 1
                  ? "pagination__pagination-bullet--active"
                  : ""
              }  `}
              onClick={() => setPageHandler(index + 1)}
              key={index}
            >
              {index + 1}
            </button>
          ))}
          {/* <span className="pagination__pagination-bullet pagination__pagination-bullet--active">
            1
          </span>
          <span className="pagination__pagination-bullet">2</span> */}
          <button
            className="pagination__next-pagination pagination__pagination-bullet"
            onClick={() => movePage("forward")}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomPagination;
