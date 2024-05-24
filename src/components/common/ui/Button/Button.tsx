import "./Button.scss";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"button">;
// TODO: Implement button with loading and extra functionalitites
// TODO: use class variant authority library
function Button({ children }: ButtonProps) {
  return <button className="custom-button">{children}</button>;
}

export default Button;
