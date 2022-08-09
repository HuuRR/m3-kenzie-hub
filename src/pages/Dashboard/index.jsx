import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Api from "../../data/api";
import { useForm } from "react-hook-form";
import Modal from "../../components/Modal";
import { toast } from "react-toastify";
import "./styles.css";

function Dashboard({ setAuth }) {
  const [tech, setTech] = useState([]);
  const history = useHistory();
  const [token] = useState(
    JSON.parse(localStorage.getItem("HuuRRb-token")) || ""
  );
  const [modal, setModal] = useState(false);

  if (localStorage.getItem("HuuRRb-user")) {
    var { name, course_module, id } = JSON.parse(
      localStorage.getItem("HuuRRb-user")
    );
  }

  //   const addTech = (data) =>
  //     Api.post("/users/techs", data, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((res) => setTech([...tech, res.data]));

  const deleteTech = (idtech) => {
    Api.delete(`/users/techs/${idtech}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        toast.success("Excluído com sucesso");
        renovar();
      })
      .catch((err) => console.log(err));
  };

  const renovar = () => {
    Api.get(`/users/${id}`).then((res) => setTech(res.data.techs));
  };

  useEffect(() => {
    Api.get(`/users/${id}`).then((res) => setTech(res.data.techs));
  }, []);

  const schema = yup.object().shape({
    title: yup.string().required("Informe uma Tecnologia"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const logout = () => {
    localStorage.removeItem("HuuRRb-token");
    localStorage.removeItem("HuuRRb-user");
    setAuth(false);
    return history.push("/");
  };

  return (
    <div className="container--dashboard">
      <div className="intro--greetings">
        <div className="intro--dashboard">
          <h1 className="logo--dashboard">Kenzie Hurr</h1>
          <button className="button--deslogar" onClick={logout}>
            Sair
          </button>
        </div>
        <div className="div--greetings">
          <h3>Olá {name} </h3>
          <span>{course_module}</span>
        </div>
      </div>
      <div className="div--include">
        <button className="button--include" onClick={() => setModal(!modal)}>
          Incluir Tecnologia
        </button>
        {modal && (
          <>
            <Modal
              setModal={setModal}
              handleSubmit={handleSubmit}
              setTech={setTech}
              token={token}
              tech={tech}
              errors={errors}
              register={register}
            />
          </>
        )}
      </div>
      {/* <div>
        <p>Incluir Tecnologia</p>
        <form onSubmit={handleSubmit(addTech)}>
          <div>
            <input
              type="text"
              placeholder="Tecnologia"
              {...register("title")}
            />
            {errors.title && <span>{errors.title.message}</span>}
          </div>
          <select {...register("status")}>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
          <button type="submit">Incluir</button>
        </form>
      </div> */}
      <div className="container--tecs">
        <h3>Tecnologias</h3>
        <ul>
          {tech?.map((item) => (
            <li key={item.id}>
              <p className="title--li">{item.title}</p>
              <div>
                <p className="status--li">{item.status}</p>
                <button
                  className="button--remove--li"
                  onClick={() => {
                    deleteTech(item.id);
                  }}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
