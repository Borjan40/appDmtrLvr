import { HTMLAttributes } from "react";

// interface ButtonsProps extends HTMLAttributes<HTMLDivElement> {
//   title?: string;
//   variants: ButtonVariant[];
//   value: string;
//   changed: (value: string) => void;
// //   className?: string;
// }

interface ButtonsProps {
  title?: string;
  variants: ButtonVariant[];
  value: string;
  onChange: (value: string) => void;
  rootAttrs: HTMLAttributes<HTMLDivElement>;
}

interface ButtonVariant {
  value: string;
  text: string;
}

function Buttons({
  title,
  variants,
  value,
  onChange,
  ...rootAttrs
}: ButtonsProps) {
  return (
    <div {...rootAttrs}>
      {title && <h3>{title}</h3>}
      {variants.map((variant) => {
        const btnStateCl =
          variant.value === value ? "btn-primary" : "btn-danger";
        return (
          <button
            type="button"
            className={`btn me-3 ${btnStateCl}`}
            key={variant.value}
            onClick={() => onChange(variant.value)}
          >
            {variant.text}
          </button>
        );
      })}
    </div>
  );
}

export default Buttons;
