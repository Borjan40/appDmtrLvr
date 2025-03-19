import { HTMLAttributes } from "react";

interface ButtonsProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  variants: ButtonVariant[];
  value: string;
  changed: (value: string) => void;
  className?: string;
}

interface ButtonVariant {
  value: string;
  text: string;
}

function Buttons({
  title,
  variants,
  value,
  changed,
  ...otherProps
}: ButtonsProps) {
  return (
    <div {...otherProps}>
      {title && <h3>{title}</h3>}
      {variants.map((variant) => {
        const btnStateCl =
          variant.value === value ? "btn-primary" : "btn-danger";
        return (
          <button
            type="button"
            className={`btn me-3 ${btnStateCl}`}
            key={variant.value}
            onClick={() => changed(variant.value)}
          >
            {variant.text}
          </button>
        );
      })} 
    </div>
  );
}

export default Buttons;
