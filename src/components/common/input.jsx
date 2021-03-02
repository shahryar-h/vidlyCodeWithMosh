import React from "react";

const Input = ({ name, lable, value, error, onChange }) => {
  return (
    <div className="form-group">
      <lable htmFor={name}>{lable}</lable>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type="text"
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
