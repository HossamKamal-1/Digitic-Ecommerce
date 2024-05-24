import { ReactNode } from 'react';
import './DropdownMenu.scss';
import { Link } from 'react-router-dom';
type DropdownMenuProps = {
  menuItems?: { title: string; url: string }[];
  className?: string;
  open?: boolean;
  children?: ReactNode;
};
function DropdownMenu({
  children,
  open = false,
  menuItems = [],
  className = '',
}: DropdownMenuProps) {
  const isDropdownMenuOpened = open ? 'show' : '';
  return (
    <ul className={`dropdown-menu ${isDropdownMenuOpened} ${className}`}>
      {children
        ? children
        : menuItems.map((menuItem, index) => (
            <li key={`${menuItem.title}${index}`}>
              <Link to={menuItem.url}>{menuItem.title}</Link>
            </li>
          ))}
    </ul>
  );
}

export default DropdownMenu;
