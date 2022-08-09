import "./App.css";
import Rotas from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container--content">
      <Rotas />
      <ToastContainer />
    </div>
  );
}

export default App;
