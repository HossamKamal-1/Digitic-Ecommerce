import './AvailibilityFilter.scss'
function AvailibilityFilter() {
  return (
    <div className="avail-filter">
      <h5 className="avail-filter__label">Avalibility</h5>
      <div className="avail-filter__content-wrapper">
        <div className="avail-filter__row">
          <input
            type="checkbox"
            name=""
            id=""
            className="avail-filter__checkbox-input"
          />
          <label className="avail-filter__checkbox-label">
            In Stock
          </label>
        </div>
        <div className="avail-filter__row">
          <input
            type="checkbox"
            name=""
            id=""
            className="avail-filter__checkbox-input"
          />
          <label className="avail-filter__checkbox-label">
            Out Stock
          </label>
        </div>
      </div>
    </div>
  );
}

export default AvailibilityFilter;
