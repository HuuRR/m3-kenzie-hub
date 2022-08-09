import { useForm } from "react-hook-form";
import { useHistory, Redirect } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Api from "../../data/api";
import { useState } from "react";
import "./styles.css";

function Login({ auth, setAuth }) {
  const history = useHistory();

  const [failLogin, setFailLogin] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("campo obrigatório").email("e-mail invalido"),
    password: yup
      .string()
      .required("campo obrigatório")
      .max(20, "máximo 20 digitos")
      .min(8, "minimo 08 digitos")
      .matches(
        /^(?=.*?[a-z])/,
        "deve conter pelo menos 01 letra minúscula (a-z)"
      )
      .matches(
        /^(?=.*?[A-Z])/,
        "deve conter pelo menos 01 letra maúscula (A-Z)"
      )
      .matches(/^(?=.*?[A-Z])/, "deve conter pelo menos 01 numero (0-9)")
      .matches(
        /^(?=.*?[#?!@$ %^&*-])/,
        "deve conter pelo menos 01 caracter especial (#?!@$ %^&*-)"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const logar = (data) => {
    Api.post("/sessions", data)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("HuuRRb-token", JSON.stringify(token));
        localStorage.setItem("HuuRRb-user", JSON.stringify(user));
        setAuth(true);
        return history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setFailLogin(true);
      });
  };

  const redrect = () => {
    return history.push("/register");
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container--login">
      <h2 className="logo--home">Kenzie Hurr</h2>
      <div className="container--intro">
        <p className="intro--login">
          Efetue o login para acessar sua Dashboard!
        </p>
        {failLogin && (
          <span className="erro--login">Email ou senha invalidos.</span>
        )}
      </div>
      <form className="form--login" onSubmit={handleSubmit(logar)}>
        <div className="div--input--login">
          <input
            className="input--login"
            type="text"
            placeholder="E-mail"
            {...register("email")}
          />
          {errors.email && (
            <span className="erro--login">{errors.email.message}</span>
          )}
        </div>
        <div className="div--input--login">
          <input
            className="input--login"
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          {errors.password && (
            <span className="erro--login">{errors.password.message}</span>
          )}
        </div>
        <button className="button--login" type="submit">
          Entrar
        </button>
      </form>
      <div className="div--cadastrar">
        <span>Ainda não é cadastrado?</span>
        <button className="button--login" onClick={redrect}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
}

export default Login;
