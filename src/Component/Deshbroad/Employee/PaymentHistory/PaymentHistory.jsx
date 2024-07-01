import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Loading/Loading";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: salaries = [], isLoading } = useQuery({
    queryKey: ["salary", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/salary/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  // Sort salaries by date in descending order
  const sortedSalaries = [...salaries].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-4xl mt-5 mb-10 text-center underline font-bold">Payment History</h1>
      </div>
     
      {/* Table data */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="bg-gray-300">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Salary Month</th>
              <th className="p-3">Month</th>
              <th className="p-3">Year</th>
              <th className="p-3">Transaction Id</th>
              <th className="p-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedSalaries.map((salary) => (
              <tr
                key={salary._id}
                className="border-b border-opacity-20 bg-gray-50"
              >
                <td className="p-3">
                  <p>{salary?.name}</p>
                </td>
                <td className="p-3">
                  <p>{salary?.email}</p>
                </td>
                <td className="p-3">
                  <p>{salary?.month}</p> {/* Month is zero-indexed, so adding 1 */}
                </td>
                <td className="p-3">
                  <p>{salary?.month + 1}</p> {/* Month is zero-indexed, so adding 1 */}
                </td>
                <td className="p-3">
                  <p>{salary?.year}</p>
                </td>
                <td className="p-3">
                  <p>{salary?.transactionId}</p>
                </td>
                <td className="p-3 text-right">
                  <p>{salary?.salary}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default PaymentHistory;
