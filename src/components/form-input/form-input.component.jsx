// Modules
import React from "react";

// Style
import "./form-input.styles.scss";

export const FormInput = ({ label, id, ...inputProps }) => {
  return (
    <div className="group">
      <input className="form-input" id={id} {...inputProps} />
      {label && (
        <label
          htmlFor={id}
          className={`form-input-label ${
            inputProps.value.length ? "shrink" : ""
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
