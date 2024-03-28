import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home({ onInit }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/shop");
  };

  return (
    <div>
      <Link to="/shop">Vai allo Shop tramite Link</Link>

      <button onClick={handleNavigate}>
        Vai allo shop tramite useNavigate
      </button>
    </div>
  );
}
