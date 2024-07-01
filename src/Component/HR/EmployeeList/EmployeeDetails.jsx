import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading/Loading';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: googleUser = {}, isLoading: isGoogleUserLoading, error: googleUserError } = useQuery({
        queryKey: ["googleUsers", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`googleUser/${id}`);
            return data;
        },
        enabled: !!id,
    });

    const { data: signUpUser = {}, isLoading: isSignUpUserLoading, error: signUpUserError } = useQuery({
        queryKey: ["signUpUsers", id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`signUpUser/${id}`);
            return data;
        },
        enabled: !!id,
    });

    const isLoading = isGoogleUserLoading || isSignUpUserLoading;
    const error = googleUserError || signUpUserError;

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;

    const user = googleUser?.name ? googleUser : signUpUser;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${user?.photo || user?.image})` }}>
                    <div className="flex justify-end">
                        {/* Add any overlay buttons or badges here if needed */}
                    </div>
                </div>
                <div className="p-4">
                    <div className="flex items-center">
                        <img className="h-24 w-24 rounded-full mx-4" src={user?.photo || user?.image} alt="User profile" />
                        <div>
                            <h1 className="text-2xl font-bold">{user?.name}</h1>
                            <p className="text-gray-700">{user?.designation}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                            <div>
                                <p className="text-gray-600"><strong>Email:</strong> {user?.email}</p>
                                <p className="text-gray-600"><strong>Bank Account:</strong> {user?.bankAccount}</p>
                            </div>
                            <div>
                                <p className="text-gray-600"><strong>Role:</strong> {user?.role}</p>
                                <p className="text-gray-600"><strong>Salary:</strong> {user?.salary}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4">
                    
                    <p className="text-gray-700">{user?.additionalInfo}</p>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
