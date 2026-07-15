import "./Alert.css";

function Alert({ children, title, tone = "info" }) {
  return (
    <div className={`ui-alert ui-alert--${tone}`} role="status">
      <strong>{title}</strong>
      <span>{children}</span>
    </div>
  );
}

export default Alert;
