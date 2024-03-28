import React from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { item } = useParams();
  return <div>{item}</div>;
}
