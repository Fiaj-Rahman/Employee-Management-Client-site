// import { Link, useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { TbFidgetSpinner } from "react-icons/tb";
// import { useMutation } from "@tanstack/react-query";
// import { axiosSecure } from "../../hooks/useAxiosSecure";
// import { useState } from "react";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const {
//     createUser,
//     signInWithGoogle,
//     updateUserProfile,
//     loading,
//     setLoading,
//   } = useAuth();
//   const [passwordError, setPasswordError] = useState("");

//   const { mutateAsync } = useMutation({
//     mutationFn: async (usersheetData) => {
//       const { data } = await axiosSecure.put("/signUpUser", usersheetData);
//       return data;
//     },
//     onSuccess: () => {
//       toast.success("Added your worksheet");
//     },
//     onError: () => {
//       toast.error("Failed to add worksheet");
//     },
//   });

//   const validatePassword = (password) => {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
//     return passwordRegex.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const name = form.names.value;
//     const email = form.email.value;
//     const role = form.role.value;
//     const bankAccount = form.bankAccount.value;
//     const salary = form.salary.value;
//     const designation = form.designation.value;
//     const password = form.password.value;
//     const image = form.image.files[0];
//     const formData = new FormData();
//     formData.append("image", image);

//     if (!validatePassword(password)) {
//       setPasswordError("Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, and one number.");
//       return;
//     }

//     setPasswordError("");

//     try {
//       setLoading(true);
//       // 1. Upload image and get image url
//       const { data } = await axios.post(
//         `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
//         formData
//       );
//       console.log(data.data.display_url);
//       const imageUrl = data.data.display_url;
//       const usersheetValue = {
//         name,
//         email,
//         role,
//         bankAccount,
//         salary,
//         designation,
//         status: 'false',
//         apply: 'Verified',
//         fire: 'false',
//         image: imageUrl,
//       };
//       await mutateAsync(usersheetValue);

//       // 2. User Registration
//       const result = await createUser(email, password);
//       console.log(result);

//       // 3. Save username and photo in firebase
//       await updateUserProfile(name, data.data.display_url);
//       navigate("/");
//       toast.success("Signup Successful");
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//     }
//   };

//   // handle google signin
//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithGoogle();
//       navigate("/");
//       toast.success("Signup Successful");
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
//         <div className="mb-8 text-center">
//           <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
//           <p className="text-sm text-gray-400">Welcome to ProQuestor</p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block mb-2 text-sm">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="names"
//                 id="names"
//                 placeholder="Enter Your Name Here"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
//                 data-temp-mail-org="0"
//               />
//             </div>
//             <div>
//               <label htmlFor="image" className="block mb-2 text-sm">
//                 Select Image:
//               </label>
//               <input
//                 required
//                 type="file"
//                 id="image"
//                 name="image"
//                 accept="image/*"
//               />
//             </div>
//             <div>
//               <label htmlFor="email" className="block mb-2 text-sm">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 required
//                 placeholder="Enter Your Email Here"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
//                 data-temp-mail-org="0"
//               />
//             </div>

//             <div>
//               <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//                 Select an option
//               </label>
//               <select
//                 id="role"
//                 name="role"
//                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//               >
//                 <option disabled selected>
//                   Choose a role
//                 </option>
//                 <option value="employee">Employee</option>
//                 <option value="hr">HR</option>
//               </select>
//             </div>

//             <div>
//               <div className="flex justify-between">
//                 <label htmlFor="bankAccount" className="text-sm mb-2">
//                   Bank Account No
//                 </label>
//               </div>
//               <input
//                 type="text"
//                 name="bankAccount"
//                 id="bankAccount"
//                 required
//                 placeholder="Enter your bank account number..."
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
//               />
//             </div>

//             <div>
//               <div className="flex justify-between">
//                 <label htmlFor="salary" className="text-sm mb-2">
//                   Salary
//                 </label>
//               </div>
//               <input
//                 type="number"
//                 name="salary"
//                 id="salary"
//                 required
//                 placeholder="Enter your salary..."
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
//               />
//             </div>

//             <div>
//               <div className="flex justify-between">
//                 <label htmlFor="designation" className="text-sm mb-2">
//                   Designation
//                 </label>
//               </div>
//               <input
//                 type="text"
//                 name="designation"
//                 id="designation"
//                 required
//                 placeholder="Enter your designation..."
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
//               />
//             </div>

//             <div>
//               <div className="flex justify-between">
//                 <label htmlFor="password" className="text-sm mb-2">
//                   Password
//                 </label>
//               </div>
//               <input
//                 type="password"
//                 name="password"
//                 autoComplete="new-password"
//                 id="password"
//                 required
//                 placeholder="*******"
//                 className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
//               />
//               {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
//             </div>
//           </div>

//           <div>
//             <button
//               disabled={loading}
//               type="submit"
//               className="bg-red-500 w-full rounded-md py-3 text-black font-bold"
//             >
//               {loading ? (
//                 <TbFidgetSpinner className="animate-spin m-auto" />
//               ) : (
//                 "Continue"
//               )}
//             </button>
//           </div>
//         </form>
//         <div className="flex items-center pt-4 space-x-1">
//           <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
//           <p className="px-3 text-sm dark:text-gray-400">
//             Signup with social accounts
//           </p>
//           <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
//         </div>
//         <div
//           onClick={handleGoogleSignIn}
//           className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
//         >
//           <FcGoogle size={32} />

//           <p>Continue with Google</p>
//         </div>
//         <p className="px-6 text-sm text-center text-gray-400">
//           Already have an account yet?{" "}
//           <Link
//             to="/login"
//             className="hover:underline hover:text-rose-500 text-gray-600"
//           >
//             Login
//           </Link>
//           .
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUp;







import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useMutation } from "@tanstack/react-query";
import { axiosSecure } from "../../hooks/useAxiosSecure";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle, updateUserProfile, loading, setLoading } = useAuth();
  const [passwordError, setPasswordError] = useState("");

  const { mutateAsync } = useMutation({
    mutationFn: async (usersheetData) => {
      const { data } = await axiosSecure.put("/signUpUser", usersheetData);
      return data;
    },
    onSuccess: () => {
      toast.success("Added your worksheet");
    },
    onError: () => {
      toast.error("Failed to add worksheet");
    },
  });

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.names.value;
    const email = form.email.value;
    const role = form.role.value;
    const bankAccount = form.bankAccount.value;
    const salary = form.salary.value;
    const designation = form.designation.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, and one number.");
      return;
    }

    setPasswordError("");

    try {
      setLoading(true);
      // 1. Upload image and get image url
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      const imageUrl = data.data.display_url;
      const usersheetValue = {
        name,
        email,
        role,
        bankAccount,
        salary,
        designation,
        status: "false",
        apply: "Verified",
        fire: "false",
        image: imageUrl,
      };
      await mutateAsync(usersheetValue);

      // 2. User Registration
      const result = await createUser(email, password);

      // 3. Save username and photo in firebase
      await updateUserProfile(name, data.data.display_url);
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
      toast.success("Signup Successful");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to ProQuestor</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="names" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="names"
                id="names"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input required type="file" id="image" name="image" accept="image/*" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select an option
              </label>
              <select
                id="role"
                name="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled selected>
                  Choose a role
                </option>
                <option value="employee">Employee</option>
                <option value="hr">HR</option>
              </select>
            </div>
            <div>
              <label htmlFor="bankAccount" className="text-sm mb-2">
                Bank Account No
              </label>
              <input
                type="text"
                name="bankAccount"
                id="bankAccount"
                required
                placeholder="Enter your bank account number..."
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="salary" className="text-sm mb-2">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                id="salary"
                required
                placeholder="Enter your salary..."
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="designation" className="text-sm mb-2">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                id="designation"
                required
                placeholder="Enter your designation..."
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
              {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            </div>
          </div>
          <div>
            <button disabled={loading} type="submit" className="bg-red-500 w-full rounded-md py-3 text-black font-bold">
              {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Continue"}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">Signup with social accounts</p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account yet?{" "}
          <Link to="/login" className="hover:underline hover:text-rose-500 text-gray-600">
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
