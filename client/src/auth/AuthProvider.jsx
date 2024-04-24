import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "./firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };
  const userInfo = { user, createUser, logOut, logIn };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        console.log("Something went wrong!!");
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
