import "./Input.css";

function Input({ helpText, id, label, ...inputProps }) {
  const helpId = helpText ? `${id}-help` : undefined;

  return (
    <div className="ui-input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-describedby={helpId} {...inputProps} />
      {helpText ? (
        <small id={helpId} className="ui-input-group__help">
          {helpText}
        </small>
      ) : null}
    </div>
  );
}

export default Input;
