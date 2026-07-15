import "./Button.css";

function Button({ children, variant = "primary", type = "button", ...buttonProps }) {
  return (
    <button className={`ui-button ui-button--${variant}`} type={type} {...buttonProps}>
      {children}
    </button>
  );
}

export default Button;
