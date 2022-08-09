import { useRef, useEffect } from "react";
import Api from "../../data/api";
import "./styles.css";

function Modal({
  setModal,
  handleSubmit,
  setTech,
  token,
  tech,
  errors,
  register,
}) {
  const modalRef = useRef();

  const addTech = (data) =>
    Api.post("/users/techs", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => setTech([...tech, res.data]));

  useEffect(() => {
    function handleOutClick(event) {
      const target = event.target;

      if (!modalRef.current?.contains(target)) {
        setModal(false);
      }
    }

    document.addEventListener("mousedown", handleOutClick);

    return () => {
      document.removeEventListener("mousedown", handleOutClick);
    };
  }, []);
  return (
    <div className="container--modal" ref={modalRef}>
      <form className="form--modal" onSubmit={handleSubmit(addTech)}>
        <div className="div--inputs">
          <div className="div--modal">
            <input
              className="input--"
              type="text"
              placeholder="Tecnologia"
              {...register("title")}
            />
          </div>
          <div className="div--modal">
            <select className="input-" {...register("status")}>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
          </div>
        </div>
        {errors.title && (
          <span className="erro--modal">{errors.title.message}</span>
        )}
        <div className="buttons--modal">
          <button className="add" type="submit">
            Incluir
          </button>
          <button className="cancel" onClick={() => setModal(false)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Modal;
