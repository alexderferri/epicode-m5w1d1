import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Card from "./components/Card";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="card-wrapper">
      <Card
        artist="Paolo Nutini"
        avatarSrc="https://hips.hearstapps.com/elleit.h-cdn.co/assets/15/37/480x529/480x529-biz-paolo-nutini-sanremo-concerti-italia-luglio-2014-paolo-nutini-15835156-1-ita-it-paolo-nutini-jpg.jpg?resize=640:*"
        bestSong="Iron Sky"
        description="è un bel figo..."
      />

      <Card
        artist="Tash Sultana"
        avatarSrc="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Tash_Sultana_Piknik_i_Parken_2017_%28185223%29.jpg/220px-Tash_Sultana_Piknik_i_Parken_2017_%28185223%29.jpg"
        bestSong="Pretty Lady"
        description="è una bella figa..."
      />
    </div>
  </React.StrictMode>
);
