import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InstagramPost from "./InstagramPost";

function App() {
  const postComments = [
    {
      user: "@arturoRe",
      text: "Sei davvero fotonico!",
      timestamp: 2,
    },

    {
      user: "@giovanni_Rana_46",
      text: "Dovremmo vederci più spesso.",
      timestamp: 4,
    },

    {
      user: "@teresa98",
      text: "Bravissimo.",
      timestamp: 6,
    },
  ];
  return (
    <div className="App">
      <InstagramPost
        title="@mimmo"
        image="https://lh3.googleusercontent.com/proxy/K9UYOGpT89tLdJu7QujYfm5Id_62hkcDd3M_HMVm3eYys4e6eSxkTDqywdFlKioOHRHL6FZUYpJJdtx4-Yd9DvOpVd8UfRIaUYBMdBYds9NDrP77g8zrnYxNyGA"
        description="Il mio primo post Instgram."
        comments={postComments}
      />
    </div>
  );
}

export default App;
