import React from "react";

export default function Title(props) {
  /*
    this.props = {
        user:"Alex"
    }
    */
  const { captain } = props;
  return (
    <div>
      <h1>Benvenuto sul portale {captain}</h1>
    </div>
  );
}
