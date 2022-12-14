import React, { useEffect } from "react";
//firebase
import { auth, onAuthStateChanged } from "./firebase";
// react-router-dom
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
// redux
import { login, logout } from "./store/features/userSlice";
import { useDispatch } from "react-redux";
// components
import Chat from "./pages/chat/Chat";
import Homepage from "./pages/Home/Homepage";
import Login from "./pages/Home/Login";
import Register from "./pages/Home/Register";
import PageNotFound from "./pages/PageNotFound";
// utility npm
import { AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  // check if user is logged in
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-cover bg-hero-pattern">
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Homepage />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/chat/public-room" element={<Chat />} />
            <Route path="/chat" element={<Chat />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer
          position="top-center"
          theme="dark"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </AnimatePresence>
    </div>
  );
}

export default App;
