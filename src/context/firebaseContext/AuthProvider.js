import AuthContext from "./AuthContext";
import { auth, storage, uploadBytes } from "../../../firebase";
import { useState } from "react";

export default function AuthProvider(props) {
  const { children } = props;
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const logIn = async (email, password) => {
    try {
      return await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw procesarErrorFirebase(error);
    }
  };
  const logOut = async () => {
    try {
      return await auth.signOut();
    } catch (error) {
      throw procesarErrorFirebase(error);
    }
  };

  function procesarErrorFirebase(error) {
    switch (error.code) {
      case "auth/internal-error":
        return "Ha ocurrido un error inesperado en el servidor.";
      case "auth/invalid-email":
        return "El email ingresado es inválido.";
      case "auth/wrong-password":
        return "El email o el password ingresado es incorrecto.";
      case "auth/user-not-found":
        return "El email no pertenece a un usuario registrado.";
    }
  }
  const [listaDeFotos, setListaDeFotos] = useState([]);
  const guardarFoto = async (foto) => {
    try {
      const fotoRef = storage.ref(`${user.name}-${Date.now()}`);
      uploadBytes(fotoRef, foto)
        .then((res) => console.log(res))
        .catcht((error) => console.log(error));
    } catch (error) {
      throw console.log(error);
      //   throw procesarErrorFirebase(error);
    }
  };
  return (
    <AuthContext.Provider //Se especifica lo que se va a exportar a los children, como en angular cuando configuramos los modulos
      value={{
        user,
        isLogin,
        logIn,
        logOut,
        setUser,
        setIsLogin,
        listaDeFotos,
        guardarFoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
