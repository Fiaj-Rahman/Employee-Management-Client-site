import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

const ContactSee = () => {

    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: googleUsers = [], isLoading: isGoogleUsersLoading } = useQuery({
    queryKey: ["googleUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/messages");
      return data;
    },
  });


  if (isGoogleUsersLoading) {
    return <Loading />;
  }



    return (
        <div>
        <div className="text-4xl text-center font-bold mt-10 mb-10">
          FeedBack
        </div>
  
        <div className="bg-gray-400 rounded-md">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  
                  <th>Email</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {googleUsers.map((googleUser) => {
                  {
                    return (
                      <tr key={googleUser._id}>
                       
                        <td>{googleUser.email}</td>
                        <td>{googleUser.message}</td>
                        
                      </tr>
                    );
                  } 
                })}
               
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};

export default ContactSee;