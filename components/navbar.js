/* eslint-disable react-hooks/exhaustive-deps */

import Link from "next/link";
import React, { useState, useEffect,useRef  } from "react";
import { useRouter } from "next/router";
import {
  FaMapMarkerAlt,
  FaMobileAlt,
  FaRegClock,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import Image from "next/legacy/image";
// import Logo from "../public/logo.png";
import Logoo from "../public/logofi.png";



const Navbar = () => {

  const [activeLink, setActiveLink] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirected, setRedirected] = useState(false);
  const router = useRouter();

  const lastActivityTime = useRef(new Date().getTime());

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true"); // Convert the stored string value to a boolean

    if (!loggedIn && router.pathname === "/profile" && !redirected) {
      router.push("/Auth");
      setRedirected(true);
    }
  }, [isLoggedIn, router, redirected]);
  
  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  
    // Update lastActivityTime on user activity
    const updateActivityTime = () => {
      lastActivityTime.current = new Date().getTime();
    };
  
    window.addEventListener("mousemove", updateActivityTime);
    window.addEventListener("keydown", updateActivityTime);
  
    return () => {
      window.removeEventListener("mousemove", updateActivityTime);
      window.removeEventListener("keydown", updateActivityTime);
    };
  }, []);

  useEffect(() => {
    const checkInactivity = setInterval(() => {
      const currentTime = new Date().getTime();
      const inactiveDuration = currentTime - lastActivityTime.current;
      const inactivityThreshold = 1 * 60 * 60 * 1000; // 1 heure en milliseconds
  
      if (inactiveDuration >= inactivityThreshold && isLoggedIn) {
        logout();
      }
    }, 1000); // Check every 1 second
  
    return () => {
      clearInterval(checkInactivity);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true"); // Convert the stored string value to a boolean

    if (!loggedIn && router.pathname === "/histo" && !redirected) {
      router.push("/Auth");
      setRedirected(true);
    }
  }, [isLoggedIn, router, redirected]);


  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  // useEffect(() => {
  //   const loggedIn = window.localStorage.getItem("isLoggedIn");
  //   setIsLoggedIn(loggedIn);
  // }, []);

  const logout = () => {
    window.localStorage.clear();
    setIsLoggedIn(false);
    router.push("/Auth");
  };

 

  const handleButtonClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      router.push("/Auth");
    }
  };
  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
  }, [handleButtonClick]);


  
  
  return (
    
    <div>
      
      <div className="bg-gray-100 ">
        <div className="container mx-auto lg:flex lg:flex-row  lg:justify-between justify-center items-center space-y-2  text-gray-500 py-3 w-full">
          <div className="lg:flex lg:flex-row flex flex-col justify-center items-center space-x-12 lg:space-y-0 space-y-2">
            <div className="flex flex-row space-x-2">
              <FaMapMarkerAlt className="w-5 h-5 text-gray-500" />
              <p>39,rue 8301 Immeuble Safsaf bloc A N°2-5 Montplaisir 1073 Tunis.</p>
            </div>
            <div className="flex flex-row space-x-2">
              <FaMobileAlt className="w-5 h-5 text-gray-500" />
              <p> (0481) 123 987 2411</p>
            </div>
            <div className="flex flex-row space-x-2">
              <FaRegClock className="w-5 h-5 text-gray-500" />
              <p>Lun-Sam: 07:00 - 17:00</p>
            </div>
          </div>
          <div className="flex flex-row space-x-4  justify-center items-center ">
            <FaFacebook className="w-6 h-6 text-gray-500" />
            <FaInstagram className="w-6 h-6 text-gray-500" />
            <FaWhatsapp className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </div>
      <nav className=" px-2 sm:px-4 py-5 ">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" legacyBehavior>
            <a href="#" className="flex">
              <Image src={Logoo} alt="Logo"style={{
    width: '200px', // Set the desired width of the circle
    height: '200px', // Set the desired height of the circle
    borderRadius: '50%', // Make the image circular
    objectFit: 'cover', // Crop the image while maintaining aspect ratio
    objectPosition: 'center top', // Adjust the vertical position of the image within the circle
  }}/>
            </a>
          </Link>
          <div className="flex md:order-2">
          <Link href="Auth">
      <button
        type="button"
        className="text-gray-700 hover:text-white hover:bg-yellow-600 border-2 border-yellow-500 rounded-3xl px-5 py-2.5 text-center mr-3 md:mr-0"
        onClick={handleButtonClick}
      >
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </Link>
            <button
              data-collapse-toggle="mobile-menu-4"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-4"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
            id="mobile-menu-4"
          >
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0  ">
            <li>
        <Link href="/" legacyBehavior>
          <a
            href="#"
            className={`block py-2 pr-4 pl-3 ${
              activeLink === "home" ? "text-yellow-600" : "text-gray-500"
            } md:hover:text-yellow-500 md:p-0`}
            onClick={() => handleLinkClick("home")}
            aria-current={activeLink === "home" ? "page" : undefined}
          >
            HOME
          </a>
        </Link>
      </li>
              {/* <li>
                <Link href="/aboutus">
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-500   md:hover:text-yellow-500 md:p-0 "
                  >
                    ABOUT
                  </a>
                </Link>
              </li> */}
              {/* <li>
                <Link href="/services">
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-500   md:hover:text-yellow-500 md:p-0 "
                  >
                    SERVICES
                  </a>
                </Link>
              </li> */}
               <li>
        <Link href="/contact" legacyBehavior>
          <a
            href="#"
            className={`block py-2 pr-4 pl-3 ${
              activeLink === "aide" ? "text-yellow-600" : "text-gray-500"
            } md:hover:text-yellow-500 md:p-0`}
            onClick={() => handleLinkClick("aide")}
          >
            AIDE
          </a>
        </Link>
      </li>

      {!isLoggedIn && (
  <li>
    <Link href="/Conducteur" legacyBehavior>
      <a
        href="#"
        className={`block py-2 pr-4 pl-3 ${
          activeLink === "Devenir Conducteur" ? "text-yellow-600" : "text-gray-500"
        } md:hover:text-yellow-500 md:p-0`}
        onClick={() => handleLinkClick("Devenir Conducteur")}
      >
        Devenir Conducteur
      </a>
    </Link>
  </li>
)}
      {isLoggedIn && (
          <li>
            <Link href="/profile" legacyBehavior>
              <a
                href="#"
                className={`block py-2 pr-4 pl-3 ${
                  activeLink === "Profile" ? "text-yellow-600" : "text-gray-500"
                } md:hover:text-yellow-500 md:p-0`}
                onClick={() => handleLinkClick("Profile")}
              >
                PROFILE
              </a>
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link href="/histo" legacyBehavior>
              <a
                href="#"
                className={`block py-2 pr-4 pl-3 ${
                  activeLink === "History" ? "text-yellow-600" : "text-gray-500"
                } md:hover:text-yellow-500 md:p-0`}
                onClick={() => handleLinkClick("History")}
              >
                HISTORIQUE
              </a>
            </Link>
          </li>
        )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
