import React, { Component } from "react";

const Listgroup = (props) => {
  const {
    genres,
    onItemSelect,
    textProperty,
    valueProperty,
    selectedItem,
  } = props;
  return (
    <ul className="list-group">
      {genres.map((g) => (
        <li
          key={g[valueProperty]}
          className={
            g[textProperty] === selectedItem
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(g[textProperty])}
        >
          {g[textProperty]}
        </li>
      ))}
    </ul>
  );
};
Listgroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default Listgroup;
