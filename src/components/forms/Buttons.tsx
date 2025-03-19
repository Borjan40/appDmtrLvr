interface ButtonsProps {
  title?: string;
  variants: ButtonVariant[];
  value: string;
  onChange: (value: string) => void; 
}

interface ButtonVariant {
  value: string;
  text: string;
}

function Buttons({ title, variants, value, onChange }: ButtonsProps) {
  return (
    <div>
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
