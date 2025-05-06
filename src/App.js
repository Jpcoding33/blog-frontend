import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";
import About from "./components/sidebar/About";
import Footer from "./components/sidebar/Footer";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout = ({ user }) => {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/register"];
  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Topbar />
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/write"
            element={user ? <Write /> : <Navigate to="/register" />}
          />
          <Route
            path="/settings"
            element={user ? <Settings /> : <Navigate to="/register" />}
          />
          <Route path="/post/:postId" element={<Single />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
      {!shouldHideFooter && <Footer />}
    </>
  );
};

const App = () => {
  const { user } = useContext(Context);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ToastContainer position="top-center" autoClose={5000} />
      <Router>
        <AppLayout user={user} />
      </Router>
    </Box>
  );
};

export default App;
