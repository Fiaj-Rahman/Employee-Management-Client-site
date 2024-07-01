import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FcSettings } from 'react-icons/fc';
import { BsFillHouseAddFill, BsGraphUp } from 'react-icons/bs';
import { MdContactPhone, MdPayment } from 'react-icons/md';
import { AiOutlineBars } from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { GiProgression } from 'react-icons/gi';
import {  FaHome } from 'react-icons/fa';
import { FaPeopleGroup } from "react-icons/fa6";
import { RiAdminFill } from 'react-icons/ri';
import useRole from '../../hooks/useRole';

const SlideBar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const navigate = useNavigate();
  const [role] = useRole();
  console.log(role);

  // SlideBar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  // Handle logout and navigate to homepage
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 font-bold text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img src="https://i.ibb.co/4ZXzmq5/logo.png" alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* SlideBar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-900 text-white font-bold w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? '-translate-x-full' : 'translate-x-0'
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto">
            <Link to="/">
              <img src="/logo.png" alt="logo" width="80" height="80" />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                    isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <FaHome className="w-5 h-5" />
                <span className="mx-4 font-medium">Home</span>
              </NavLink>

              <NavLink
                to="/deshbroad"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                    isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <BsGraphUp className="w-5 h-5" />
                <span className="mx-4 font-medium">Statistics</span>
              </NavLink>

              {role === 'employee' && (
                <>
                  <NavLink
                    to="taskForm"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <BsFillHouseAddFill className="w-5 h-5" />
                    <span className="mx-4 font-medium">Work-Sheet</span>
                  </NavLink>

                  <NavLink
                    to="paymentHistory"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdPayment className="w-5 h-5" />
                    <span className="mx-4 font-medium">Payment History</span>
                  </NavLink>
                </>
              )}

              {role === 'hr' && (
                <>
                  <NavLink
                    to="employeeList"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <FaPeopleGroup className="w-5 h-5" />
                    <span className="mx-4 font-medium">Employee List</span>
                  </NavLink>

                  <NavLink
                    to="progress"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <GiProgression className="w-5 h-5" />
                    <span className="mx-4 font-medium">Progress</span>
                  </NavLink>
                </>
              )}

              {role === 'admin' && (
                <>
                  <NavLink
                    to="admin"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <RiAdminFill className="w-5 h-5" />
                    <span className="mx-4 font-medium">Admin</span>
                  </NavLink>

                  <NavLink
                    to="allFeedBack"
                    className={({ isActive }) =>
                      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                        isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
                      }`
                    }
                  >
                    <MdContactPhone className="w-5 h-5" />
                    <span className="mx-4 font-medium">Contact Message</span>
                  </NavLink>
                </>
              )}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${
                isActive ? 'bg-gray-300 text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className="w-5 h-5" />
            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300 hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SlideBar;
