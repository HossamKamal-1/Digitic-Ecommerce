import TestDrawer from "./TestDrawer/TestDrawer";
import CartDrawer from "./CartDrawer/CartDrawer";
import NavigationMenuDrawer from "./NavigationMenuDrawer/NavigationMenuDrawer";
import ProductsSortDrawer from "./ProductsSortDrawer/ProductsSortDrawer";

const DRAWERS = {
  CartDrawer,
  TestDrawer,
  NavigationMenuDrawer,
  ProductsSortDrawer,
} as const;
export default DRAWERS;
