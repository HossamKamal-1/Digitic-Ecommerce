import "./CardLayout.scss";
import { ReactNode } from "react";

type CardLayoutProps = {
  children: ReactNode;
  title: string;
  className?: string;
};
function CardLayout({ children, title, className = "" }: CardLayoutProps) {
  return (
    <div className={`card ${className}`}>
      <h4 className="card__heading">{title}</h4>
      <div className="card__content">{children}</div>
    </div>
  );
}
export default CardLayout;
