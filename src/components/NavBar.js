import { useState } from "react";
import { signOut } from "next-auth/client";
import { FaMoon } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import Link from "next/link";

export const NavBar = ({ session }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const toggleMenuIsOpen = () => setMenuIsOpen((current) => !current);
  return (
    <div className="fixed min-h-screen md:flex z-10">
      <div className="bg-gray-700 text-gray-100 flex justify-between md:hidden">
        <a href="#" className="block p-4 text-white font-bold">
          Better Dev
        </a>

        <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="sidebar bg-gray-700 text-blue-100 w-24 space-y-6 x-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <nav className="flex flex-col justify-between h-screen align-center py-4">
          <div className=" divide-y border-gray-400">
            <div className="relative flex flex-col items-center">
              <div className="w-full flex justify-center">
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => toggleMenuIsOpen()}
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={session.user.image} alt="" />
                </button>
              </div>
              <div
                className={`${
                  menuIsOpen ? "" : "hidden"
                } origin-bottom-right absolute top-8 left-8 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col`}
                role="menu"
              >
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                  Your Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
                  Settings
                </a>
                <button onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700">
                  Sign out
                </button>
              </div>
            </div>
            <div className="w-full mt-6 pt-6 border-gray-600">
              <Link href="/" passHref={true}>
                <AiOutlineHome className="block m-auto" size={24} color="rgba(156, 163, 175, var(--tw-border-opacity))" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-center">
              <button className="m-auto rounded-full text-gray-400 hover:text-white focus:outline-none">
                <span className="sr-only">View notifications</span>
                <FaMoon size={24} />
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <button className="rounded-full text-gray-400 hover:text-white focus:outline-none ">
                <span className="sr-only">View notifications</span>
                <IoNotificationsSharp size={24} />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
