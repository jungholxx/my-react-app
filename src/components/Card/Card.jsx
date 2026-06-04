import { Link } from "react-router-dom";
import "./Card.css";

function Card({
  to,
  title,
  content,
  type,
}) {
  return (
    <Link
      to={to}
      className="card-link"
    >
      <div className="card">
        <div className="card-top">
          <span
            className={`card-badge ${type}`}
          >
            {type === "board"
              ? "BOARD"
              : "GALLERY"}
          </span>
        </div>

        <h3>{title}</h3>

        <p>{content}</p>
      </div>
    </Link>
  );
}

export default Card;