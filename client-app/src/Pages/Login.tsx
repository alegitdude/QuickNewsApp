import Logo from "../../public/Color_Logo_Edit.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../Api/agent";
import { useDispatch } from "react-redux";
import { updateUser } from "../state/userSlice";
import { errorAlert, successAlert } from "../utils/Alerts";
import { ToastContainer, Zoom } from "react-toastify";
import DotLoader from "../assets/DotLoader";
import Footer from "../Components/Footer";
import { useEffect } from "react";
type Inputs = {
  email: string;
  password: string;
};

const { useLazyLoginQuery } = api;

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [trigger, result] = useLazyLoginQuery();
  const { isLoading, data, isError, isFetching, isSuccess, error } = result;

  const onSubmit: SubmitHandler<Inputs> = (creds) => {
    trigger(creds);
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("jwt", data.token);
      dispatch(updateUser(data));
      navigate("/general");
      successAlert("Successfully logged in!");
    }
    if (isError) {
      errorAlert("Credentials not found!");
    }
  }, [isSuccess, data, isError, error, dispatch, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer transition={Zoom} limit={2} />
      <nav className="flex justify-center bg-background">
        <Link to={"/general"}>
          <img className="w-56" src={Logo} />
        </Link>
      </nav>
      <div className="border-t-2 border-b-2"></div>
      <div className="max-w-sm mx-auto mt-10 grow w-96 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 border-2 rounded-md bg-background"
        >
          <h1 className="my-4 text-xl">Sign In</h1>
          <div className="flex flex-col items-center mt-2">
            <div className="flex justify-between w-72">
              <label
                htmlFor="email"
                className="block font-medium leading-6 text-gray-900 text-md"
              >
                Email
              </label>
            </div>
            <div className="mt-2">
              <input
                {...register("email", {
                  required: "Please provide a valid email",
                  maxLength: 50,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please provide a valid email",
                  },
                })}
                className=" w-72 rounded-md border-2  px-3.5 py-2  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Email"
                type="text"
                id="email"
              />
            </div>
            {errors.email?.message && (
              <p className="text-red-600 ">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-between w-72">
              <label
                htmlFor="password"
                className="block font-medium leading-6 text-gray-900 text-md"
              >
                Password
              </label>
              <Link className="text-blue-600" to={"/"}>
                Forgot password?
              </Link>
            </div>
            <div className="mt-2">
              <input
                {...register("password", {
                  required: "Password is required",
                  maxLength: 18,
                  minLength: {
                    value: 8,
                    message: "Password must have 8 characters",
                  },
                })}
                type="password"
                id="password"
                placeholder="Password"
                className=" w-72 rounded-md border-2  px-3.5 py-2  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password?.message && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <div className="flex justify-center">
            {isLoading ? (
              <div className="flex items-center justify-center w-full h-8 mb-6">
                <DotLoader />
              </div>
            ) : (
              <button
                type="submit"
                disabled={isLoading || isFetching}
                className="flex w-72 mb-6 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            )}
          </div>
        </form>

        <p className="mt-10 text-center">
          Don't have an account?
          <Link className="ml-2 text-blue-600" to={"/signup"}>
            Create one for free!
          </Link>
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Login;
