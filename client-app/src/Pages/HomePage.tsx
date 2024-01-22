import { Outlet } from "react-router-dom";
import Navbar from "../Components/NavBar";
import "react-responsive-modal/styles.css";
import Footer from "../Components/Footer";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen ">
      <ToastContainer transition={Slide} limit={2} />
      <Navbar outlet={<Outlet />} />
      <Footer />
    </div>
  );
};

export default HomePage;
