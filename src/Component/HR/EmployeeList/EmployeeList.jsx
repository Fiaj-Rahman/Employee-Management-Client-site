import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import { MdCancel } from "react-icons/md";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: googleUsers = [], isLoading: isGoogleUsersLoading } = useQuery({
    queryKey: ["googleUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/googleUsers");
      return data;
    },
  });

  const { data: signUpUsers = [], isLoading: isSignUpUsersLoading } = useQuery({
    queryKey: ["signUpUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/signUpUsers");
      return data;
    },
  });

  const updateGoogleUserStatus = useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosSecure.put("/googleUserStatus", { email });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("googleUsers");
      toast.success("Status updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const updateSignUpUserStatus = useMutation({
    mutationFn: async (email) => {
      const { data } = await axiosSecure.put("/signUpUserStatus", { email });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries("signUpUsers");
      toast.success("Status updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isGoogleUsersLoading || isSignUpUsersLoading) {
    return <Loading />;
  }

  const handleUpdateStatus = (userType, email) => {
    if (userType === "google") {
      updateGoogleUserStatus.mutate(email);
    } else if (userType === "signUp") {
      updateSignUpUserStatus.mutate(email);
    }
  };

  const getPreviousMonth = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  return (
    <div>
      <div className="text-4xl text-center font-bold mt-10 mb-10">
        All Employees
      </div>

      <div className="bg-gray-400 rounded-md">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Bank Account</th>
                <th>Salary</th>
                <th>Pay</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {googleUsers.map((googleUser) => {
                if (googleUser.name && googleUser.role === "employee") {
                  return (
                    <tr key={googleUser._id}>
                      <td>{googleUser.name}</td>
                      <td>{googleUser.email}</td>
                      <td>{googleUser.role}</td>
                      <td>
                        {googleUser.status === "false" ? (
                          <button type="button" onClick={() => handleUpdateStatus("google", googleUser.email)}>
                            <MdCancel />
                          </button>
                        ) : (
                          <button>
                            <BsFillHandThumbsUpFill />
                          </button>
                        )}
                      </td>
                      <td>{googleUser.bankAccount || "N/A"}</td>
                      <td>{googleUser.salary || "N/A"}</td>
                      <td>
                        {googleUser.status === "false" ? (
                          <button className="btn btn-ghost btn-xs" disabled>
                            Pay
                          </button>
                        ) : (
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => setSelectedUser(googleUser)}
                          >
                            Pay
                          </button>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/googleUser/${googleUser._id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
              {signUpUsers.map((signUpUser) => {
                if (signUpUser.name && signUpUser.role === "employee") {
                  return (
                    <tr key={signUpUser._id}>
                      <td>{signUpUser.name}</td>
                      <td>{signUpUser.email}</td>
                      <td>{signUpUser.role}</td>
                      <td>
                        {signUpUser.status === "false" ? (
                          <button type="button" onClick={() => handleUpdateStatus("signUp", signUpUser.email)}>
                            <MdCancel />
                          </button>
                        ) : (
                          <button>
                            <BsFillHandThumbsUpFill />
                          </button>
                        )}
                      </td>
                      <td>{signUpUser.bankAccount || "N/A"}</td>
                      <td>{signUpUser.salary || "N/A"}</td>
                      <td>
                        {signUpUser.status === "false" ? (
                          <button className="btn btn-ghost btn-xs" disabled>
                            Pay
                          </button>
                        ) : (
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => setSelectedUser(signUpUser)}
                          >
                            Pay
                          </button>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/signUpUser/${signUpUser._id}`}
                          className="btn btn-ghost btn-xs"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="modal modal-open" role="dialog" id="pay_modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Payment for {selectedUser.name}</h3>
            <p className="py-4">Please confirm the payment details:</p>
            <div className="py-2">
              <strong>Email:</strong> {selectedUser.email}
            </div>
            <div className="py-2">
              <strong>Salary:</strong> {selectedUser.salary || "N/A"}
            </div>
            <div>
              <strong>Month and Year:</strong> {getPreviousMonth()}
            </div>

            <div>
              <Elements stripe={stripePromise}>
                <CheckoutForm selectedUser={selectedUser}></CheckoutForm>
              </Elements>
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedUser(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
