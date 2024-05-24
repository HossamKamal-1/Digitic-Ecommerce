import "./NavigationMenuDrawer.scss";
import { MENU_LINKS } from "@components/layout/Navbar/Navbar";
import Drawer, { DrawerPropsWithoutChildren } from "../../Drawer/Drawer";
import CollapsableTree from "../../CollapsableTree/CollapsableTree";

type NavigationMenuDrawerProps = DrawerPropsWithoutChildren;
function NavigationMenuDrawer({
  isOpen,
  onClose,
  direction = "left",
}: NavigationMenuDrawerProps) {
  return (
    <Drawer
      className="mobile-menu-drawer"
      isOpen={isOpen}
      onClose={onClose}
      direction={direction}
    >
      <CollapsableTree collapseList={MENU_LINKS} />
    </Drawer>
  );
}

export default NavigationMenuDrawer;
