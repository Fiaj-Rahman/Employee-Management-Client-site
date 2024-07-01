
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import HostModal from "./HostModal";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import useRole from "../hooks/useRole";

const Nav = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {googleRole,signUpRole} = useRole()

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalHandler = async () => {
    console.log('I want to be a host')
    try {
      const currentUser = {
        email: user?.email,
        apply: 'Requested',
      }
      const { data } = await axiosSecure.put(`/googleUser`, currentUser)
      console.log(data)
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation')
      } else {
        toast.success('Please!, Wait for admin approval👊')
      }
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    } finally {
      closeModal()
    }
  }






  const { mutateAsync: mutateSignUpUser } = useMutation({
    mutationFn: async (usersheetData) => {
      const { data } = await axiosSecure.put("/signUpUser", usersheetData);
      return data;
    },
   onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation');
      } else {
        toast.success('Please!, Wait for admin approval👊');
      }
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const modalHandlerSignUp = async () => {
    

    const usersheetValue = {
      email: user?.email,
      apply: 'Requested',
    };

    try {
      await mutateSignUpUser(usersheetValue);
      console.log('I want to be a host');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      closeModal();
    }
  };

  return (
    <div className=" max-w-screen-2xl m-auto bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
          <Link to="/">
            <img
              src="/logo.png"
              alt="logo"
              width="40"
              height="40"
            />
          </Link>
          <div className="relative">
            <div className="flex flex-row items-center gap-3">
              {
                user && <div className=" md:block">
                <button
                  onClick={() => { setIsModalOpen(true) }}
                  className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
                >
                  Apply for HR
                </button>
              </div>
              }

              <HostModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                modalHandler={modalHandler}
                modalHandlerSignUp={modalHandlerSignUp}
              />

              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu />
                <div className="hidden md:block">
                  {user && (
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={
                        user.photoURL || "/logo.png"
                      }
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  )}
                </div>
              </div>
            </div>
            {isOpen && (
              <div className="absolute z-10 rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                  <Link
                    to="/"
                    className="block md: px-4 py-3 hover:bg-neutral-300 transition font-semibold"
                  >
                    Home
                  </Link>
                  <Link
                        to="/contactUs"
                        className="block md: px-4 py-3 hover:bg-neutral-300 transition font-semibold"
                      >
                        Contact Us
                      </Link>

                  {user ? (
                    <>
                      <Link
                        to="/deshbroad"
                        className="block md: px-4 py-3 hover:bg-neutral-300 transition font-semibold"
                      >
                        Dashboard
                      </Link>

                      
                      <div
                        onClick={logOut}
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="px-4 py-3 hover:bg-neutral-300 transition font-semibold"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="px-4 py-3 hover:bg-neutral-300 transition font-semibold"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

