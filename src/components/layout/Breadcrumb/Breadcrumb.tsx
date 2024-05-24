import "./Breadcrumb.scss";
import { NavLink, NavLinkProps, UIMatch, useMatches } from "react-router-dom";
import { ReactNode } from "react";

type RouteHandle = {
  crumb: ReactNode;
};

function Breadcrumb() {
  // REFACTOR: make it using useLocation
  const matches = useMatches();
  const crumbs: UIMatch<unknown, RouteHandle>[] = (
    matches as UIMatch<unknown, RouteHandle>[]
  ).filter((match) => Boolean((match.handle as RouteHandle)?.crumb));

  return (
    <div className="breadcrumb">
      {crumbs.map(({ handle, pathname }, index) => {
        return index === crumbs.length - 1 ? (
          <span key={pathname} className="breadcrumb__link--active">
            {handle.crumb}
          </span>
        ) : (
          <CrumbLink to={pathname} key={pathname}>
            {handle.crumb}
          </CrumbLink>
        );
      })}
    </div>
  );
}

export function CrumbLink(navLinkProps: NavLinkProps) {
  return (
    <NavLink
      {...navLinkProps}
      end
      className={({ isActive }) =>
        isActive ? "breadcrumb__link--active" : "breadcrumb__link"
      }
    />
  );
}

export default Breadcrumb;
