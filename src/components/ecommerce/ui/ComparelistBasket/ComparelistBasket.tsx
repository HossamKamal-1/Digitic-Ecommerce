import { useAppSelector } from "@store/hooks";
import "./ComparelistBasket.scss";
import { RefreshCw } from "lucide-react";
function ComparelistBasket() {
  const totalComparelistItemsCount = useAppSelector(
    (state) => state.comparelist.items.length
  );
  return (
    <div className="comparelist-basket">
      <div className="comparelist-basket__icon-wrapper">
        <RefreshCw className="comparelist-basket__icon" />
        {totalComparelistItemsCount > 0 && (
          <span className="comparelist-basket__count">
            {totalComparelistItemsCount}
          </span>
        )}
      </div>
      <div className="comparelist-basket__text-wrapper">
        Compare
        <br />
        Products
      </div>
    </div>
  );
}

export default ComparelistBasket;
