// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
// import Loading from '../../Loading/Loading';
// import useAuth from '../../hooks/useAuth';

// const Progress = () => {
//     const axiosSecure = useAxiosSecure();
//     const {user} = useAuth();

//     const { data: worksheets = [], isLoading } = useQuery({
//         queryKey: ['worksheet'],
//         queryFn: async () => {
//             const { data } = await axiosSecure.get('/worksheet');
//             console.log(data);
//             return data;
//         }
//     });

//     if (isLoading) {
//         return <Loading></Loading>;
//     }

//     return (
//         <div className="container p-2 mx-auto sm:p-4">
//             <h2 className="mb-10 text-4xl text-center mt-10 font-semibold leading-tight">EMPLOYEE PROGRESS</h2>
//             <div className="overflow-x-auto">
//                 <table className="min-w-full text-xs">
//                     <colgroup>
//                         <col />
//                         <col />
//                         <col />
//                         <col />
//                         <col />
//                         <col className="w-24" />
//                     </colgroup>
//                     <thead className="dark:bg-gray-300">
//                         <tr className="text-left">
//                             <th className="p-3">Name</th>
//                             <th className="p-3">Email</th>
//                             <th className="p-3">Task</th>
//                             <th className="p-3">Hours Work</th>
//                             <th className="p-3">Date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {worksheets.map((worksheet) => (
//                             <tr key={worksheet._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
//                                 <td className="p-3">
//                                     <p>{worksheet.name}</p>
//                                 </td>
//                                 <td className="p-3">
//                                     <p>{worksheet.email}</p>
//                                 </td>
//                                 <td className="p-3">
//                                     <p>{worksheet.task}</p>
//                                 </td>
//                                 <td className="p-3">
//                                     <p>{worksheet.hoursWorked}</p>
//                                 </td>
//                                 <td className="p-3">
//                                     <p>{new Date(worksheet.date).toLocaleDateString()}</p>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default Progress;






import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../Loading/Loading';
import useAuth from '../../hooks/useAuth';

const Progress = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const { data: worksheets = [], isLoading } = useQuery({
        queryKey: ['worksheet'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/worksheet');
            return data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    // Get a list of unique employee names for the dropdown
    const employeeNames = [...new Set(worksheets.map(w => w.name))];

    // Filter the worksheets based on selected employee and month
    const filteredWorksheets = worksheets.filter((worksheet) => {
        const worksheetDate = new Date(worksheet.date);
        const worksheetMonth = worksheetDate.toLocaleString('default', { month: 'long' });

        const isEmployeeMatch = selectedEmployee ? worksheet.name === selectedEmployee : true;
        const isMonthMatch = selectedMonth ? worksheetMonth === selectedMonth : true;

        return isEmployeeMatch && isMonthMatch;
    });

    return (
        <div className="container bg-gray-200 p-2 mx-auto sm:p-4">
            <h2 className="mb-10 text-4xl text-center mt-10 font-semibold leading-tight">EMPLOYEE PROGRESS</h2>

            <div className="flex justify-between mb-4">
                <select
                    className="select select-primary text-gray-900 w-full max-w-xs"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                    <option value="">All Employees</option>
                    {employeeNames.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                <select
                    className="select select-primary text-gray-900 w-full max-w-xs"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">All Months</option>
                    {Array.from({ length: 12 }, (v, k) => new Date(0, k)).map((date) => (
                        <option key={date.getMonth()} value={date.toLocaleString('default', { month: 'long' })}>
                            {date.toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

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
                            <th className="p-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorksheets.map((worksheet) => (
                            <tr key={worksheet._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
                                <td className="p-3">
                                    <p>{worksheet.name}</p>
                                </td>
                                <td className="p-3">
                                    <p>{worksheet.email}</p>
                                </td>
                                <td className="p-3">
                                    <p>{worksheet.task}</p>
                                </td>
                                <td className="p-3">
                                    <p>{worksheet.hoursWorked}</p>
                                </td>
                                <td className="p-3">
                                    <p>{new Date(worksheet.date).toLocaleDateString()}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Progress;
