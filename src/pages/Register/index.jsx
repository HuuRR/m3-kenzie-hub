import { useHistory, Redirect } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Api from "../../data/api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./styles.css";

function Register({ auth }) {
  const history = useHistory();

  const [erroCadastro, setErroCadastro] = useState(false);

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Campo Obrigatório")
      .min(3, "Mínimo 03 caracteres")
      .max(20, "Máximo 20 caracteres"),
    email: yup
      .string()
      .required("Campo Obrigatório")
      .email("Seu e-mail deve ser válido"),
    password: yup
      .string()
      .required("Campo Obrigatório")
      .max(20, "deve conter no máximo 20 digitos")
      .min(8, "deve conter no minimo 08 digitos")
      .matches(
        /^(?=.*?[a-z])/,
        "deve conter pelo menos 01 letra minúscula (a-z)"
      )
      .matches(
        /^(?=.*?[A-Z])/,
        "deve conter pelo menos 01 letra maúscula (A-Z)"
      )
      .matches(/^(?=.*?[0-9])/, "deve conter pelo menos 01 numero (0-9)")
      .matches(
        /^(?=.*?[#?!@$ %^&*-])/,
        "deve conter pelo menos 01 caracter especial (#?!@$ %^&*-)"
      ),
    confirmPassword: yup
      .string()
      .required("Campo Obrigatório")
      .oneOf([yup.ref("password")], "As senhas precisam ser iguais."),
    bio: yup
      .string()
      .required("Campo Obrigatório")
      .min(10, "você pode mais que isso")
      .max(50, "opa, também não precisa tanto!"),
    contact: yup.string().required("Campo Obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const cadastrar = ({
    name,
    email,
    password,
    contact,
    bio,
    course_module,
  }) => {
    const user = {
      name,
      email,
      password,
      contact,
      bio,
      course_module,
    };
    Api.post("/users", user)
      .then((res) => {
        console.log(res);
        toast.sucess("cadastrado com sucesso!");
        return history.push("/login");
      })
      .catch((err) => {
        console.log(err);
        setErroCadastro(true);
      });
  };

  const redrect = () => {
    return history.push("/login");
  };

  if (auth) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="container--register">
      <div className="container--intro">
        <h2 className="logo--home">Kenzie Hurr</h2>
        <h3 className="sublogo--register">Cadastre-se no Kenzie Hurr!</h3>
        {erroCadastro && (
          <span className="erro-register">
            Erro no cadastro, verifique os dados e tente novamente.
          </span>
        )}
      </div>
      <div className="container--form--register">
        <form className="form--register" onSubmit={handleSubmit(cadastrar)}>
          <div className="div--input--register">
            <input
              className="input--register"
              type="text"
              placeholder="Nome"
              {...register("name")}
            />
            {errors.name && (
              <span className="erro--register">{errors.name.message}</span>
            )}
          </div>
          <div className="div--input--register">
            <input
              className="input--register"
              type="text"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span className="erro--register">{errors.email.message}</span>
            )}
          </div>
          <div className="div--input--register">
            <input
              className="input--register"
              type="password"
              placeholder="Senha"
              {...register("password")}
            />
            {errors.password && (
              <span className="erro--register">{errors.password.message}</span>
            )}
          </div>
          <div className="div--input--register">
            <input
              className="input--register"
              type="password"
              placeholder="Confirmar Senha"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="erro--register">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <div className="div--input--register">
            <input
              className="input--register"
              type="text"
              placeholder="Um pouco sobre você"
              {...register("bio")}
            />
            {errors.bio && (
              <span className="erro--register">{errors.bio.message}</span>
            )}
          </div>
          <div className="div--input--register">
            <input
              className="input--register"
              type="text"
              placeholder="Contato"
              {...register("contact")}
            />
            {errors.contact && (
              <span className="erro--register">{errors.contact.message}</span>
            )}
          </div>
          <div className="div--input--register">
            <select className="input--register" {...register("course_module")}>
              <option value="Primeiro Módulo">Primeiro Módulo</option>
              <option value="Segundo Módulo">Segundo Módulo</option>
              <option value="Terceiro Módulo">Terceiro Módulo</option>
              <option value="Quarto Módulo">Quarto Módulo</option>
              <option value="Quinto Módulo">Quinto Módulo</option>
              <option value="Sexto Módulo">Sexto Módulo</option>
            </select>
            {errors.course_module && (
              <span>{errors.course_module.message}</span>
            )}
          </div>
          <button className="button--register" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
      <div>
        {/* <button onClick={redrect}>Voltar</button> */}
        <span className="ja--cadastrado">
          já é cadastrado? <a href="/login">Clique aqui </a> e faça o login!
        </span>
      </div>
    </div>
  );
}

export default Register;
