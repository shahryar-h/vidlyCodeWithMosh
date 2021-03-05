import React, { Component } from "react";

class SearchBox extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <input
        type="text"
        name="query"
        className="form-control my-3"
        placeholder="search..."
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />
    );
  }
}

export default SearchBox;
