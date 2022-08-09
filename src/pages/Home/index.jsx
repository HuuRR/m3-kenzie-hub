import { useHistory } from "react-router-dom";
import "./styles.css";

function Home() {
  const history = useHistory();

  const navigation = (path) => {
    return history.push(path);
  };
  return (
    <div className="container--home">
      <h2 className="logo--home">Kenzie Hurr</h2>
      <div className="container--opcoes">
        <h3 className="title--opcoes">Já possuí cadastro?</h3>
        <button className="button--home" onClick={() => navigation("/login")}>
          Efetuar Login
        </button>
        <h3 className="title--opcoes">Ainda não é nosso cliente?</h3>
        <button
          className="button--home"
          onClick={() => navigation("/register")}
        >
          Cadastre-se
        </button>
      </div>
    </div>
  );
}

export default Home;
