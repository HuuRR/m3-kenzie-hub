import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

function Rotas() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("HuuRRb-token"));
    if (token) {
      return setAuth(true);
    }
  }, [auth]);
  return (
    <Switch>
      <Route exact path={"/"}>
        <Home />
      </Route>
      <Route exact path={"/login"}>
        <Login setAuth={setAuth} auth={auth} />
      </Route>
      <Route exact path={"/register"}>
        <Register auth={auth} />
      </Route>
      <Route exact path={"/dashboard"}>
        <Dashboard setAuth={setAuth} />
      </Route>
    </Switch>
  );
}

export default Rotas;
