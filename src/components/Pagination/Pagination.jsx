import "./Pagination.css";

function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) {
  const totalPage = Math.ceil(totalCount / pageSize);

  if (totalPage <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        이전
      </button>

      {Array.from({ length: totalPage }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            type="button"
            className={currentPage === page ? "active" : ""}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage === totalPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;