import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { service } from "../api";
import { alert } from "../services/alert.service";

function Login() {
  const navigate = useNavigate();

  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const body = { username, password, ip };
    service
      .login(body)
      .then((response) => {
        const operator = response.data;
        sessionStorage.setItem("operator", JSON.stringify(operator));
        navigate("/home-operator");
      })
      .catch((error) => {
        const message = error.response?.data?.error;
        alert.error(message);
      });
  };

  const getIp = () => {
    service
      .getIp()
      .then((response) => {
        setIp(response.data.ip);
      })
      .catch(() => alert.error());
  };

  useEffect(() => getIp(), []);

  return (
    <div className="h-100 flex align-items-center justify-content-center flex-column">
      <img
        src="https://s3.ambly.co/api/sftp/files/file-52095052.png"
        alt="Logo Ambly Fondo Blanco"
        width="auto"
        height="45px"
        className="mb-1"
      />
      <div className="login-form">
        <h2 className="mb-1">Bienvenid@ de vuelta</h2>
        <div className="box">
          <label>Nombre de usuario</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="box">
          <label>Contraseña</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn full-width mb-1"
          onClick={() => handleLogin()}
        >
          Ingresar
        </button>
        <div className="text-end">Ip: {ip}</div>
      </div>
    </div>
  );
}

export default Login;
