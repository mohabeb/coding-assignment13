import "./Card.css";

function Card({ children, eyebrow, footer, title }) {
  return (
    <article className="ui-card">
      {eyebrow ? <p className="ui-card__eyebrow">{eyebrow}</p> : null}
      <h3>{title}</h3>
      <div className="ui-card__content">{children}</div>
      {footer ? <div className="ui-card__footer">{footer}</div> : null}
    </article>
  );
}

export default Card;
