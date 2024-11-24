import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./pages/user/User";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/notFound/NotFound";
import { useContext } from "react";
import { AppContext } from "./pages/context/Context";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import Doctor from "./pages/doctor/Doctor";
import UserUlcers from "./pages/userUlcers/UserUlcers";

const App = () => {
  const { profileData, isLoading } = useContext(AppContext);

  return isLoading ? (
    <div className="loader-container">
      <span className="loader"></span>
    </div>
  ) : (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              profileData ? (
                profileData.role === "doctor" ? (
                  <Doctor />
                ) : (
                  <User />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/list"
            element={
              profileData?.role === "user" ? <UserUlcers /> : <NotFound />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
