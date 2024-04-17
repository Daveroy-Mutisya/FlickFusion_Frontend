import  { useState } from 'react';
import movieLogo from '../assets/movie.png';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className={`text-white ${isMobile ? 'text-3xl' : 'text-4xl'} ml-2 font-jolly-lodger`}>FLICK</span>
              <img className="block lg:hidden h-8 w-auto" src={movieLogo} alt="Movie Logo" />
              <img className="hidden lg:block h-8 w-auto" src={movieLogo} alt="Movie Logo" />
              <span className={`text-white ${isMobile ? 'text-3xl' : 'text-4xl'} ml-2 font-jolly-lodger`}>FUSION</span>
            </div>
            {isMobile ? (
              <div className="md:hidden">
                {/* Hamburger menu icon */}
                <FaBars className="text-white cursor-pointer" onClick={toggleMenu} />
              </div>
            ) : (
              <div className="hidden md:flex items-center">
                <div className="ml-10 flex items-center space-x-4">
                  {/* Nav links */}
                  <a href="#" className={`text-white hover:bg-red-700 px-3 py-2 rounded-md ${isMobile ? 'text-xl' : 'text-3xl'} font-medium font-jolly-lodger`}>
                    NOW SHOWING
                  </a>
                  <a href="#" className={`text-white hover:bg-red-700 px-3 py-2 rounded-md ${isMobile ? 'text-xl' : 'text-3xl'} font-medium font-jolly-lodger`}>
                    BUY A MOVIE
                  </a>
                  {/* User placeholder */}
                  <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaUserCircle className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      {isMobile && isOpen && (
        <div className="bg-red-600 p-4 text-white fixed top-0 right-0 z-10 font-jolly-lodger">
          <a href="#" className="block my-2 text-xl">NOW SHOWING</a>
          <a href="#" className="block my-2 text-xl">BUY A MOVIE</a>
          <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
            <FaUserCircle className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
