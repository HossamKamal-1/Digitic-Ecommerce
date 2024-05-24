import "./CollapsableTree.scss";
import { ReactNode, useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

export type CollapseList = CollapsableItem[];
type CollapsableTreeProps = {
  collapseList: CollapseList;
  fontSize?: `${number}px`;
  _depth?: number;
  expanded?: boolean;
  linkArrowColor?: string;
  direction?: "column" | "row";
};
type CollapsableItem = {
  title: string;
  url?: string;
  children?: CollapseList | ReactNode;
};

function CollapsableTree({
  collapseList,
  expanded,
  direction = "column",
  fontSize = "18px",
  linkArrowColor,
  _depth = 0,
}: CollapsableTreeProps) {
  if (!_depth) {
    return (
      <div
        className="collapse-tree-wrapper"
        style={{
          fontSize,
        }}
      >
        <ul
          className={`collapsable-list collapsable-list-${_depth} ${
            expanded ? "show" : ""
          }`}
          style={{
            display: "flex",
            flexDirection: direction,
          }}
        >
          {collapseList.map((collapseItem) => (
            <CollapseItem
              fontSize={fontSize}
              linkArrowColor={linkArrowColor}
              key={collapseItem.title}
              item={collapseItem}
              depth={_depth}
            />
          ))}
        </ul>
      </div>
    );
  }
  return (
    <ul
      className={`collapsable-list collapsable-list-${_depth} ${
        expanded ? "show" : ""
      }`}
      style={{
        display: "flex",
        flexDirection: direction,
      }}
    >
      {collapseList.map((collapseItem, index) => (
        <CollapseItem
          fontSize={fontSize}
          linkArrowColor={linkArrowColor}
          key={`${collapseItem.title}-${index}`}
          item={collapseItem}
          depth={_depth}
        />
      ))}
    </ul>
  );
}

type CollapseItemProps = {
  item: CollapsableItem;
  linkArrowColor?: string;
  fontSize?: `${number}px`;
  depth: number;
};
function CollapseItem({
  item,
  linkArrowColor = "white",
  fontSize = "18px",
  depth = 0,
}: CollapseItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li className="collapse-item">
      {item.children ? (
        <>
          <div className="btn-wrapper">
            <button onClick={() => setIsExpanded((p) => !p)}>
              {isExpanded ? <Minus size={15} /> : <Plus size={15} />}
              {item.title}
            </button>
            {item.url && (
              <NavLink to={item.url || "/"}>
                <ArrowRight color={linkArrowColor} size={18} />
              </NavLink>
            )}
          </div>
          {Array.isArray(item.children) ? (
            <CollapsableTree
              linkArrowColor={linkArrowColor}
              fontSize={fontSize}
              expanded={isExpanded}
              collapseList={item.children}
              _depth={++depth}
            />
          ) : (
            <div className={`collapsable-content ${isExpanded ? "show" : ""}`}>
              {item.children}
            </div>
          )}
        </>
      ) : (
        <NavLink to={item.url || "/"}>{item.title}</NavLink>
      )}
    </li>
  );
}

export default CollapsableTree;
