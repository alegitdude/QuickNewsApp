import Logo from "../../public/Color_Logo_Edit.png";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import BookFlip from "../assets/BookFlip";

function Error() {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex justify-center bg-background">
        <Link to={"/general"}>
          <img className="w-56" src={Logo} />
        </Link>
      </nav>
      <div className="border-t-2 border-b-2"></div>
      <div className="flex flex-col justify-center max-w-sm mx-auto mt-10 grow w-96 ">
        <div className="p-8 border-2 shadow-2xl rounded-2xl">
          <div className="text-5xl">404 Not Found</div>
          <div className="text-3xl">
            The resource you are looking for does not exist
          </div>
          <div className="relative mt-4 text-xl ">
            <Link to={"/general"}>
              <h4 className="inline leading-[50px] transition-all hover:text-blue-600">
                Return Home{" "}
              </h4>
            </Link>
            <span className="absolute mt-6 text-5xl right-10 top-[-50%]">
              {" "}
              &#8592;
            </span>
          </div>
        </div>
      </div>
      <BookFlip />
      <div>
        <Footer />
      </div>
    </div>
  );
}
export default Error;
