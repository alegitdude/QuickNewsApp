import Logo from "../../public/Color_Logo_Edit.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../Api/agent";
import DotLoader from "../assets/DotLoader";
import { ToastContainer, Zoom } from "react-toastify";
import Footer from "../Components/Footer";
import { useEffect } from "react";
import { errorAlert, successAlert } from "../utils/Alerts";
import { updateUser } from "../state/userSlice";
import { useDispatch } from "react-redux";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

function allCases(string: string) {
  const upper = /[A-Z]/.test(string),
    lower = /[a-z]/.test(string);

  return upper && lower;
}

function Signup() {
  const { useLazyRegisterQuery } = api;
  const [trigger, result] = useLazyRegisterQuery();
  const { isLoading, data, isError, isFetching, isSuccess, error } = result;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (credentials) => {
    trigger(credentials);
  };

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("jwt", data.token);
      dispatch(updateUser(data));
      successAlert("Account Created!");
      navigate("/general");
    }
    if (isError) {
      if ("status" in error) {
        const errMsg =
          "error" in error ? error.error : JSON.stringify(error.data);
        errorAlert(errMsg);
      }
    }
  }, [isSuccess, data, isError, error, dispatch, navigate]);

  return (
    <div className="h-screen">
      <ToastContainer transition={Zoom} limit={2} />
      <nav className="flex justify-center bg-background">
        <Link to={"/general"}>
          <img className="w-56" src={Logo} />
        </Link>
      </nav>
      <div className="border-t-2 border-b-2"></div>
      <div className="max-w-sm mx-auto mt-10 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 border-2 rounded-md bg-background"
        >
          <h1 className="my-4 text-xl">Register</h1>
          <div className="flex flex-col items-center mt-2">
            <div className="flex justify-between w-72">
              <label
                htmlFor="name"
                className="block font-medium leading-6 text-gray-900 text-md"
              >
                Name
              </label>
            </div>
            <div className="mt-2">
              <input
                {...register("username", {
                  required: "Please provide a username",
                  maxLength: {
                    value: 50,
                    message: "Please make name under 50 characters",
                  },
                  minLength: {
                    value: 3,
                    message: "Please make name at least 3 characters",
                  },
                })}
                className=" w-72 rounded-md border-2  px-3.5 py-2  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                placeholder="Name"
                type="text"
                id="name"
              />
            </div>
            {errors.username?.message && (
              <p className="text-red-600 ">{errors.username?.message}</p>
            )}
          </div>
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
            </div>
            <div className="mt-2">
              <input
                {...register("password", {
                  required: "Please provide a password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 8,
                    message: "Password must be 8 or less characters",
                  },
                  validate: (value) => {
                    return (
                      allCases(value) ||
                      "Password must contain an upper and lower case letter"
                    );
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
            {isLoading || isFetching ? (
              <div className="flex items-center justify-center w-full h-full mb-6">
                <DotLoader />
              </div>
            ) : (
              <button
                type="submit"
                className="flex w-72 mb-6 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            )}
          </div>
        </form>
        <p className="mt-10 mb-10 text-center">
          Already have an account?
          <Link className="ml-2 text-blue-600" to={"/login"}>
            Login here
          </Link>
        </p>
      </div>
      <Footer />
    </div>
  );
}
export default Signup;
