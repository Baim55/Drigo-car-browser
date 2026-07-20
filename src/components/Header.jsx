import { FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="py-5 px-3 md:px-0 shadow-sm mb-8">
      <div className="container flex items-center ">
        <FaCar className="mr-2" size={25} />
        <Link to="/">
          <h2 className="text-[#041c59] text-[20px]">
            <span className="font-bold">DRIGO</span> Rentals
          </h2>
        </Link>
      </div>
    </header>
  );
}

export default Header;
