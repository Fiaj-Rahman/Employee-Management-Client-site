// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import Loading from "../../Loading/Loading";
// import { useParams } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import {
//   Card,
//   Input,
//   Checkbox,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import { ToastContainer, toast } from 'react-toastify';

// import "react-datepicker/dist/react-datepicker.css";


// const TaskFormAndTable = () => {
//   const [task, setTask] = useState("");
//   const [hoursWorked, setHoursWorked] = useState("");
//   const [date, setDate] = useState(new Date());
//   const [email, setEmail] = useState("");
//   const [startDate, setStartDate] = useState(new Date());

//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: worksheets = [],
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ["worksheet", email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get(`/taskForm/${user?.email}`);
//       console.log(data);
//       return data;
//     },
//   });


//   const {mutateAsync} = useMutation(
//     {
//       mutationFn: async(worksheetData) =>{
//         const {data} = await axiosSecure.post('/worksheets',worksheetData)
//         return data;
//       },
//       onSuccess:()=>{
//         toast("Added your work sheet");
//         refetch();
//       },
//       onError: () => {
//         toast.error("Failed to add work sheet");
//       }
//     }
//   )


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const task = form.task.value;
//     const hoursWorked = parseInt(form.hoursWorked.value);
//     const date = form.date.value;
//     const name = user?.displayName;
//     const email = user?.email;


//     try{
//       const worksheetValue = {
//         task,hoursWorked,date,name,email
//       }
//       // console.log(worksheetValue);
//       await mutateAsync(worksheetValue)

//     }
//     catch(err){
//       console.log(err);
//     }

//   };
  

//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div>
//       <div>
//         <h1 className="text-4xl mt-5 mb-10 text-center underline font-bold ">
//           WORK SHEET{" "}
//         </h1>
//       </div>
//       {/* form data  */}

//       <div className="mt-5 mb-10 bg-gray-900 text-white rounded py-5">
//         <form
//           onSubmit={handleSubmit}
//           className="mt-8 m-auto mb-2 w-full max-w-screen-lg sm:w-96"
//         >
//           <div className="mb-1 flex flex-col gap-6">
//             <Typography variant="h6" color="whtie" className="-mb-3">
//               Task
//             </Typography>
//             <select
//               className="select select-primary text-gray-900 w-full max-w-xs"
//               name="task"
//               required
//             >
//               <option disabled selected>
//                 Choice your Task
//               </option>
//               <option>Sales</option>
//               <option>Support</option>
//               <option>Content</option>
//               <option>Paper Work</option>
//             </select>

//             <Typography variant="h6" color="whtie" className="-mb-3">
//               Hours Worked
//             </Typography>
//             <Input
//               type="number"
//               size="lg"
//               name="hoursWorked"
//               required
//               placeholder="Enter your hours worked"
//               className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//             />

//             <Typography variant="h6" color="whtie" className="-mb-3">
//               Date
//             </Typography>
//             <DatePicker
//               name="date"
//               className="text-gray-900"
//               required
//               selected={startDate}
//               onChange={(date) => setStartDate(date)}
//             />
//           </div>

//           <Button type="submit" className="mt-6 text-white bg-blue-900" fullWidth>
//             Add
//           </Button>
//         </form>
//       </div>






//       {/* table data  */}
//       <div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-xs">
//             <colgroup>
//               <col />
//               <col />
//               <col />
//               <col />
//               <col />
//               <col className="w-24" />
//             </colgroup>
//             <thead className="dark:bg-gray-300">
//               <tr className="text-left">
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Task</th>
//                 <th className="p-3">Hours Worked</th>
//                 <th className="p-3 text-right">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {worksheets.map((task) => (
//                 <tr
//                   key={task.id}
//                   className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
//                 >
//                   <td className="p-3">
//                     <p>{task?.name}</p>
//                   </td>
//                   <td className="p-3">
//                     <p>{task?.email}</p>
//                   </td>
//                   <td className="p-3">
//                     <p>{task?.task}</p>
//                   </td>
//                   <td className="p-3">
//                     <p>{task?.hoursWorked}</p>
//                   </td>
//                   <td className="p-3 text-right">
//                     <p>{task?.date}</p>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskFormAndTable;












import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";
import useAuth from "../../hooks/useAuth";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';

import "react-datepicker/dist/react-datepicker.css";


const TaskFormAndTable = () => {
  const [task, setTask] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [date, setDate] = useState(new Date());
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: worksheets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["worksheet", email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/taskForm/${user?.email}`);
      console.log(data);
      return data;
    },
  });


  const {mutateAsync} = useMutation(
    {
      mutationFn: async(worksheetData) =>{
        const {data} = await axiosSecure.post('/worksheets',worksheetData)
        return data;
      },
      onSuccess:()=>{
        toast("Added your work sheet");
        refetch();
      },
      onError: () => {
        toast.error("Failed to add work sheet");
      }
    }
  )


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const task = form.task.value;
    const hoursWorked = parseInt(form.hoursWorked.value);
    const date = form.date.value;
    const name = user?.displayName;
    const email = user?.email;


    try{
      const worksheetValue = {
        task,hoursWorked,date,name,email
      }
      // console.log(worksheetValue);
      await mutateAsync(worksheetValue)

    }
    catch(err){
      console.log(err);
    }

  };
  

  if (isLoading) {
    return <Loading />;
  }

  // Sort worksheets by date in descending order
  const sortedWorksheets = [...worksheets].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div>
        <h1 className="text-4xl mt-5 mb-10 text-center underline font-bold ">
          WORK SHEET{" "}
        </h1>
      </div>
      {/* form data  */}

      <div className="mt-5 mb-10 bg-gray-900 text-white rounded py-5">
        <form
          onSubmit={handleSubmit}
          className="mt-8 m-auto mb-2 w-full max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="whtie" className="-mb-3">
              Task
            </Typography>
            <select
              className="select select-primary text-gray-900 w-full max-w-xs"
              name="task"
              required
            >
              <option disabled selected>
                Choice your Task
              </option>
              <option>Sales</option>
              <option>Support</option>
              <option>Content</option>
              <option>Paper Work</option>
            </select>

            <Typography variant="h6" color="whtie" className="-mb-3">
              Hours Worked
            </Typography>
            <Input
              type="number"
              size="lg"
              name="hoursWorked"
              required
              placeholder="Enter your hours worked"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Typography variant="h6" color="whtie" className="-mb-3">
              Date
            </Typography>
            <DatePicker
              name="date"
              className="text-gray-900"
              required
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>

          <Button type="submit" className="mt-6 text-white bg-blue-900" fullWidth>
            Add
          </Button>
        </form>
      </div>

      {/* table data  */}
      <div>
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
            <thead className="dark:bg-gray-300">
              <tr className="text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Task</th>
                <th className="p-3">Hours Worked</th>
                <th className="p-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedWorksheets.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                >
                  <td className="p-3">
                    <p>{task?.name}</p>
                  </td>
                  <td className="p-3">
                    <p>{task?.email}</p>
                  </td>
                  <td className="p-3">
                    <p>{task?.task}</p>
                  </td>
                  <td className="p-3">
                    <p>{task?.hoursWorked}</p>
                  </td>
                  <td className="p-3 text-right">
                    <p>{task?.date}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskFormAndTable;
