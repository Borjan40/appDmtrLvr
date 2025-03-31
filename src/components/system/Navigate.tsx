import { NavigateProps, Navigate as RouterNavigate } from "react-router-dom";
import useStore from "../../hooks/useStore";

let Navigate: typeof RouterNavigate;

if (import.meta.env.SSR) {
  Navigate = function Navigate({ to }: NavigateProps) {
    const { page } = useStore();
    page.redirect(typeof to === "object" ? to.pathname ?? "/" : to);
    return null;
  };
} else {
  Navigate = RouterNavigate;
}

export default Navigate;