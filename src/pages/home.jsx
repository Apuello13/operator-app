import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { service } from "../api";
import { alert } from "../services/alert.service";

function Home() {
  const navigate = useNavigate();

  const isClosing = useRef(false)

  const [email, setEmail] = useState("");
  const [user, setUser] = useState({});
  const associteCourse = () => {
    service
      .associateCourse(email)
      .then((response) => {
        setEmail("");
        alert.success(response.data.message);
      })
      .catch(() => alert.error());
  };

  const goLogin = () => {
    alert.confirm().then((result) => {
      if (result.isConfirmed) {
        logOut();
        navigate("/login");
      }
    });
  };

  const verifySession = () => {
    const session = sessionStorage.getItem("operator");
    if (session) setUser(JSON.parse(session));
    else {
      alert.error("No tiene una session abierta");
      navigate("/login");
    }
  };

  const logOut = () => {
    if (user) {
      const body = { id: user.id, ip: user.ip };
      service
        .logOut(body)
        .then(() => sessionStorage.removeItem("operator"))
        .catch((err) => console.error(err));
    }
  };

  const handleBeforeUnload = useCallback((event) => {
    if (!isClosing.current) {
      event.preventDefault()
      event.returnValue = '¿Estás seguro de que quieres salir?'
      isClosing.current = true
    }
  }, [])

  const handleUnload = useCallback(() => {
    if (isClosing.current) {
      try {
        logOut()
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    }
  }, [logOut])

  useEffect(() => {
    verifySession();

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('unload', handleUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('unload', handleUnload)
    }
  }, [handleBeforeUnload, handleUnload]);

  useEffect(() => {
    return () => {
      isClosing.current = false
    }
  }, [])

  return (
    <div className="h-100 flex align-items-center justify-content-center flex-column">
      <h2 className="mb-1 text-white">Registar curso para usuario</h2>
      <div className="login-form mb-1">
        <div className="box">
          <label>Correo del usuario</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Escriba el correo del usuario..."
          />
        </div>
        <button
          type="button"
          className="btn full-width"
          onClick={() => associteCourse()}
          disabled={email.length === 0}
        >
          Asociar curso
        </button>
      </div>
      <div className="text-end">
        <button type="button" className="btn" onClick={() => goLogin()}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default Home;
