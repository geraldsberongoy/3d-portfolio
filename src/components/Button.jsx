import React from "react";

const Button = ({ className, text, id, svg, href }) => {
  return (
    <a className={`${className ?? ""} cta-wrapper`} href={href}>
      <div className="cta-button group">
        <div className="bg-circle" />
        <p className="text">{text}</p>
        <div className="arrow-wrapper">{svg ?? svg}</div>
      </div>
    </a>
  );
};

export default Button;
