import { Link, useNavigate } from "react-router-dom";
import Logo from "../../public/Color_Logo_Edit.png";
import SingleSource from "../Components/SingleSource";
import { api } from "../Api/agent";
import { useEffect, useState } from "react";
import DotLoader from "../assets/DotLoader";
import Footer from "../Components/Footer";
import { ToastContainer, Zoom } from "react-toastify";
import { errorAlert } from "../utils/Alerts";

function logout() {
  localStorage.removeItem("jwt");
}

const Account = () => {
  const navigate = useNavigate();
  const { useGetAllSourcesQuery } = api;
  const { isLoading, isError, data, error } = useGetAllSourcesQuery();
  const [allSources, setAllSources] = useState<string[]>(["Example"]);

  if (isError) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);
      errorAlert(errMsg);
    }
  }
  useEffect(() => {
    if (data) {
      setAllSources(data);
    }
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer transition={Zoom} limit={2} />
      <nav className="flex justify-center bg-background">
        <Link to={"/general"}>
          <img className="w-56" src={Logo} />
        </Link>
      </nav>
      <div className="border-t-2 border-b-2"></div>
      <div className="flex flex-col items-center justify-center grow">
        <h1 className="my-8 text-3xl">Account</h1>
        <div className="flex flex-col w-5/6 max-w-3xl gap-4 overflow-hidden sm:w-5/6">
          <h1 className="flex px-3 my-4 text-2xl underline ">Source Curator</h1>
          <div className="grid grid-cols-2 gap-2 p-2 overflow-scroll border-4 h-96 ">
            {isLoading ? (
              <DotLoader />
            ) : (
              allSources.map((source) => {
                return (
                  <SingleSource source={source} starting={true} key={source} />
                );
              })
            )}
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            navigate(0);
          }}
          className=" transition-all  flex-none rounded-md bg-primary my-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
};
export default Account;
