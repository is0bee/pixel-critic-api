import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Cards({ title, description, image }) {
  return (
    <div className="card" style={{ width: 150, height: 250 }}>
      <img
        src={image}
        className="card-img-top"
        alt={title}
        style={{ width: 150, height: 150, padding: 3 }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default Cards;
