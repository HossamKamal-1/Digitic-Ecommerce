import { AtLeastOneRequired } from '../../utils/types';
import { Size } from '../Product/Product';
import './SizeFilter.scss';
export type SizesWithCount = AtLeastOneRequired<Record<Size, number>>;
type SizeFilterProps = {
  sizes: SizesWithCount;
  selectedSizes: Size[];
  onSizeChange: (selectedSizes: Size[]) => void;
};
function SizeFilter({ sizes, selectedSizes, onSizeChange }: SizeFilterProps) {
  console.log(Object.entries(sizes));
  // TODO: this logic is redundant
  function handleSizeCheckboxChange(checkboxSize: Size) {
    const newSelectedColors = selectedSizes.includes(checkboxSize)
      ? selectedSizes.filter((selectedSize) => selectedSize !== checkboxSize)
      : [...selectedSizes, checkboxSize];
    onSizeChange(newSelectedColors);
  }
  return (
    <div className="size-filter">
      <h5 className="size-filter__label">Size</h5>
      <div className="size-filter__sizes-wrapper">
        {(Object.entries(sizes) as [Size, number][]).map(
          ([size, sizeCount]) => (
            <div className="size-filter__checkbox-row" key={size}>
              <input
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeCheckboxChange(size)}
                type="checkbox"
                id={`size-input ${size}`}
                className="size-filter__checkbox-input"
                disabled={sizeCount === 0}
              />
              <label
                className="size-filter__checkbox-label"
                htmlFor={`size-input ${size}`}
              >
                {size} ({sizeCount})
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SizeFilter;
