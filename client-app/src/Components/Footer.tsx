import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex items-center justify-center h-20 mt-4 border-t-4 justify-self-end bg-background">
      <h1 className="text-lg">
        {"Copyright © "}
        <Link className="transition-all hover:text-accent" to="/general">
          QuickNews.com
        </Link>
        &nbsp;
        {new Date().getFullYear()}
      </h1>
    </div>
  );
};
export default Footer;
