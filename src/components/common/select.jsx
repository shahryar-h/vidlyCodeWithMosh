import React, { Component } from "react";

class Select extends Component {
  //    const  { name, lable, error, options, ...rest } = this.props;

  render() {
    const { name, lable, error, options, ...rest } = this.props;
    return (
      <div className="form-group">
        <lable htmFor={name}>{lable}</lable>
        <select name={name} id={name} {...rest}>
          <option value="" />
          {options.map((option) => {
            return (
              <option
                key={option._id}
                value={option._id}
                className="form-control"
              >
                {option.name}
              </option>
            );
          })}
        </select>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;
