import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Statistic = () => {
  const{user} = useAuth()
  const axiosSecure = useAxiosSecure()


  const { data: googleUsers = [], isLoading: isGoogleUsersLoading, refetch: refetchGoogleUsers } = useQuery({
    queryKey: ['googleUsers'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/googleUsers')
      return data
    },
  })

  const { data: signUpUsers = [], isLoading: isSignUpUsersLoading, refetch: refetchSignUpUsers } = useQuery({
    queryKey: ['signUpUsers'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/signUpUsers')
      return data
    },
  })


  const { data: message = [] } = useQuery({
    queryKey: ["message"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/messages");
      return data;
    },
  });



  if (isGoogleUsersLoading || isSignUpUsersLoading) {
    return <div>Loading...</div> // Handle loading state
  }

  const GoogleUser = googleUsers.length
  const signUpUser = signUpUsers.length;
  const totalUser = GoogleUser + signUpUser



    return (
      <>
      <div className="stats mt-20 justify-center text-center items-center w-full   stats-vertical lg:stats-horizontal shadow">
  
      
      <div className="stat bg-red-400 rounded-md">
        <div className="stat-title">Total Users</div>
        <div className="stat-value">{totalUser}</div>
      </div>
      
      <div className="stat bg-red-400 rounded-md">
        <div className="stat-title">User FeedBack</div>
        <div className="stat-value">{message.length}</div>
        
      </div>

      
      
    </div>

   <div className=''>
    <img className='w-1/6 bg-red-400 m-auto rounded-full' src={user?.photoURL || user?.image} alt="" />
   </div>

   <div className=''>
    <p className='uppercase font-bold m-auto text-center mt-10 mb-5'>{user?.displayName || user?.name}</p>
    {/* <img className='w-1/6 bg-red-400 m-auto rounded-full' src={user?.photoURL || user?.image} alt="" /> */}
   </div>

    </>
    );
};

export default Statistic;