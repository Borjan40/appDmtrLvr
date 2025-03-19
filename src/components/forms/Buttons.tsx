interface ButtonsProps {
  title?: string;
  variants: ButtonVariant[];
  value: string;
}

interface ButtonVariant {
  value: string;
  text: string;
}

function Buttons({ title, variants, value }: ButtonsProps) {
  return (
    <div>
      {title && <h3>{title}</h3>}
      {variants.map((variant) => (
        <button type="button" className="btn">
          {variant.text}
        </button>
      ))}
    </div>
  );
}

export default Buttons;
