import react, { useEffect, useState } from "react";
import Axios from "axios";
import { ProductContextState } from "../Context/Context";

const ChatBox = ({ chat }) => {
  return (
    <div className="chatbox-container">
      <h2>@{chat.User}:</h2>
      <p>{chat.Mensaje}</p>
      <small>Fecha: {chat.Fecha}</small>
      <div className="chatbox-detail"></div>
    </div>
  );
};

function getUser() {
  return JSON.parse(localStorage.getItem("loginData"));
}

const user = getUser();

const name = user.name.replace(/ /g, "");

const ChatRoom = ({ newMensaje }) => {
  const [enviandoMensaje, setEnviandoMensaje] = useState(false);
  const { chats, setChats, setMoreMensaje, mensaje, setMensaje } =
    ProductContextState();

  const handleReset = () => {
    setMensaje({
      ...mensaje,
      User: "",
      Mensaje: "",
    });
  };

  let fecha = new Date();

  let hours = fecha.getHours();
  let minutes = fecha.getMinutes();
  let date = fecha.toDateString();

  let actualDate = date + " " + hours + ":" + minutes;
  const handleInputChange = (e) => {
    setMensaje({
      ...mensaje,
      [e.target.name]: e.target.value,
      Fecha: actualDate,
      User: name,
    });
  };

  async function handleSubmit(e) {
    if (enviandoMensaje) {
      return;
    }
    e.preventDefault();

    try {
      setEnviandoMensaje(true);
      await newMensaje(mensaje.Mensaje, mensaje.Fecha, mensaje.User);
      setEnviandoMensaje(false);
      setMoreMensaje(true);
      handleReset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chatroom">
      <div className="chat-container">
        <div className="chatscreen">
          {chats.map((chat) => {
            return <ChatBox chat={chat} key={chat._id} />;
          })}
        </div>
        <div className="input-container">
          <form onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="User"
              id="user"
              placeholder="User"
              value={mensaje.User}
              onChange={handleInputChange}
            />
            <input
              type="textarea"
              name="Mensaje"
              id="mensaje"
              placeholder="Mensaje"
              value={mensaje.Mensaje}
              onChange={handleInputChange}
              required
            />
            <input
              type="hidden"
              name="Fecha"
              id="fecha"
              placeholder="Fecha"
              value={mensaje.Fecha}
              onChange={handleInputChange}
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
