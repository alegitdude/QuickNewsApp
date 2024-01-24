import { Sidebar, Menu } from "react-pro-sidebar";
import Logo from "../../public/Color_Logo_Edit.png";
import LogoNoIcon from "../../public/Color_Logo_No_Icon.png";
import IconHamburgerMenu from "../assets/IconHamburgerMenu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../models/user";
import { RootState } from "../state/store";
import IconUser from "../assets/IconUser";
import Banner from "./Banner";
import SearchBar from "./SearchBar";

const quickLinks = [
  "general",
  "politics",
  "business",
  "tech",
  "entertainment",
  "sports",
];

interface Props {
  outlet: React.ReactNode;
}

const NavBar = (props: Props) => {
  const { outlet } = props;
  const [menuToggle, setMenuToggle] = useState<boolean>(false);
  const user: UserState = useSelector((store: RootState) => store.user);
  const navigate = useNavigate();
  const theUrl = useLocation().pathname.substring(1);

  return (
    <>
      <nav className="flex-col items-center overflow-hidden bg-background">
        {user.username == "" && <Banner />}
        <Sidebar
          onBackdropClick={() => setMenuToggle(false)}
          toggled={menuToggle}
          backgroundColor="#FEFBF6"
          breakPoint="all"
        >
          <Menu>
            <div className="flex justify-center m-1 ">
              <SearchBar />
            </div>
            <div className="mt-4">
              {quickLinks.map((link) => (
                <li
                  key={link}
                  className={
                    link == theUrl
                      ? "font-bold underline py-2 mt-1  decoration-solid underline-offset-2 px-4  hover:bg-accent"
                      : "font-bold py-2 mt-1 hover:underline hover: decoration-solid hover:underline-offset-2 px-4  hover:bg-accent"
                  }
                >
                  <Link
                    to={`/${link}`}
                    onClick={() => setMenuToggle(false)}
                    className="font-bold"
                  >
                    {link[0].toUpperCase() + link.slice(1)}
                  </Link>
                </li>
              ))}
            </div>
          </Menu>
          {user.username == "" ? (
            <Link to={"/login"}>
              <button
                onClick={() => navigate("/login")}
                className="  flex-none rounded-md bg-primary mt-5 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Sign In
              </button>
            </Link>
          ) : (
            <button
              onClick={() => navigate("/account")}
              className="h-10 my-4  px-3.5 py-2 text-white bg-primary rounded-md hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <IconUser />
            </button>
          )}
        </Sidebar>
        <div className="flex items-center justify-between h-16 px-6 overflow-hidden max-w-[1280px] m-auto ">
          <div className="flex justify-center basis-1/4">
            <Link to={"/general"}>
              <img src={`${Logo}`} className="hidden w-56 lg:block " />
            </Link>

            <button
              onClick={() => setMenuToggle(!menuToggle)}
              className="lg:hidden flex-none rounded-md bg-primary  px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <IconHamburgerMenu />
            </button>
          </div>
          <div className="flex justify-center basis-1/2">
            <div className="hidden lg:block ">
              <SearchBar />
            </div>
            <Link to={"/"}>
              <img src={`${Logo}`} className="hidden w-56 sm:block lg:hidden" />{" "}
            </Link>
            <Link to={"/"}>
              <img src={`${LogoNoIcon}`} className="h-16 w-44 sm:hidden" />
            </Link>
          </div>
          <div className="h-10 basis-1/4">
            {user.username == "" ? (
              <Link to={"/login"}>
                <button
                  onClick={() => navigate("/login")}
                  className=" flex-none rounded-md bg-primary ml-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Sign In
                </button>
              </Link>
            ) : (
              <button
                onClick={() => navigate("/account")}
                className="h-10  px-3.5 py-2 text-white bg-primary rounded-md hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <IconUser />
              </button>
            )}
          </div>
        </div>
        <div className={` border-t-2 border-b-2  `}>
          <div
            className={`${
              theUrl == "search" ? " lg:hidden" : "lg:flex"
            } hidden px-4 justify-evenly m-auto max-w-[1280px] `}
          >
            {quickLinks.map((link) => (
              <Link
                key={link}
                to={`/${link}`}
                className={
                  link == theUrl
                    ? "font-bold underline  decoration-solid underline-offset-2 px-4"
                    : "font-bold hover:underline hover: decoration-solid hover:underline-offset-2 px-4"
                }
              >
                {link[0].toUpperCase() + link.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="flex grow max-w-[1280px] m-auto ">{outlet}</div>
    </>
  );
};
export default NavBar;
