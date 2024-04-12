import './ColorFilter.scss';
type ColorFilterProps = {
  colors: string[];
  selectedColors: string[];
  onColorSelect: (selectedColors: string[]) => void;
};
function ColorFilter({
  colors,
  onColorSelect,
  selectedColors,
}: ColorFilterProps) {
  console.log({ colors, selectedColors, onColorSelect });
  function handleColorCheckBoxChange(checkboxColor: string) {
    // TODO: this logic is redundant
    const newSelectedColors = selectedColors.includes(checkboxColor)
      ? selectedColors.filter((color) => color !== checkboxColor)
      : [...selectedColors, checkboxColor];
    onColorSelect(newSelectedColors);
  }
  return (
    <div className="color-filter">
      <h5 className="color-filter__label">Color</h5>
      <div className="color-filter__checkboxes-wrapper">
        {colors.map((color) => (
          <input
            checked={selectedColors.includes(color)}
            onChange={() => handleColorCheckBoxChange(color)}
            type="checkbox"
            className="color-filter__checkbox-input"
            style={{
              backgroundColor: color,
            }}
            key={color}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorFilter;
