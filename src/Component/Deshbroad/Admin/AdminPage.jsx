// import { useMutation, useQuery } from '@tanstack/react-query'
// import useAuth from '../../hooks/useAuth'
// import useAxiosSecure from '../../hooks/useAxiosSecure'
// import { MdCancel, MdEditSquare } from 'react-icons/md'
// import { BsFillHandThumbsUpFill } from 'react-icons/bs'
// import { FaFire } from 'react-icons/fa'
// import { useState } from 'react'
// import UpdateUserModal from '../../Modal/UpdateUserModel'
// import { toast } from 'react-toastify'

// const UserCard = ({ user, onUpdateRole, onEdit, onFire }) => {
//   return (
//     <div className="bg-white shadow-md rounded-lg p-6">
//       <h2 className="text-xl font-bold mb-2">{user.name}</h2>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Role:</strong> {user.role}</p>
//       <p><strong>Designation:</strong> {user.designation}</p>
//       <p><strong>Salary:</strong> {user.salary}</p>
//       <div className="mt-4">
//         <button
//           onClick={onUpdateRole}
//           className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
//         >
//           Update Role
//         </button>
//         <button
//           onClick={onFire}
//           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
//         >
//           {user.fire === 'false' ? <FaFire /> : <span>Fire</span>}
//         </button>
//         <button
//           onClick={onEdit}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           <MdEditSquare />
//         </button>
//       </div>
//     </div>
//   )
// }

// const AdminPage = () => {
//   const { user: loggedInUser } = useAuth()
//   const axiosSecure = useAxiosSecure()
//   const [isOpen, setIsOpen] = useState(false)
//   const [selectedUser, setSelectedUser] = useState(null)
//   const [viewMode, setViewMode] = useState('table');

//   const { data: googleUsers = [], isLoading: isGoogleUsersLoading, refetch: refetchGoogleUsers } = useQuery({
//     queryKey: ['googleUsers'],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get('/googleUsers')
//       return data
//     },
//   })

//   const { data: signUpUsers = [], isLoading: isSignUpUsersLoading, refetch: refetchSignUpUsers } = useQuery({
//     queryKey: ['signUpUsers'],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get('/signUpUsers')
//       return data
//     },
//   })

//   // Filter and combine users
//   const combinedUsers = [...googleUsers, ...signUpUsers]
//     .filter(
//       (user) =>
//         (user.name !== null &&
//           user.role === 'employee' &&
//           user.status === 'true') ||
//         (user.name !== null && user.role === 'hr') ||
//         (user.name !== null && user.role === 'admin')
//     )
//     .sort((a, b) => {
//       if (a.role === 'hr' && b.role !== 'hr') return -1
//       if (a.role !== 'hr' && b.role === 'hr') return 1
//       return 0
//     })

//   const updateUserRoleMutation = useMutation({
//     mutationFn: async ({ userId, role, type }) => {
//       const endpoint = type === 'google' ? `/googleUsers/update/${userId}` : `/signUpUsers/update/${userId}`
//       const { data } = await axiosSecure.patch(endpoint, { role, apply: 'true' })
//       return data
//     },
//     onSuccess: (data) => {
//       console.log('Mutation Success:', data)
//       refetchGoogleUsers()
//       refetchSignUpUsers()
//       toast.success('User role updated successfully!')
//       setIsOpen(false)
//     },
//     onError: (error) => {
//       console.log('Mutation Error:', error)
//       toast.error(error.message)
//     }
//   })

//   const fireUserMutation = useMutation({
//     mutationFn: async ({ userId, type }) => {
//       const endpoint = type === 'google' ? `/googleUsers/fire/${userId}` : `/signUpUsers/fire/${userId}`
//       const { data } = await axiosSecure.patch(endpoint, { fire: 'true' })
//       return data
//     },
//     onSuccess: (data) => {
//       console.log('Mutation Success:', data)
//       refetchGoogleUsers()
//       refetchSignUpUsers()
//       toast.success('User has been fired!')
//     },
//     onError: (error) => {
//       console.log('Mutation Error:', error)
//       toast.error(error.message)
//     }
//   })

//   const modalHandler = async (userId, role, type) => {
//     if (loggedInUser.email === userId) {
//       toast.error('Action Not Allowed')
//       return setIsOpen(false)
//     }
//     try {
//       await updateUserRoleMutation.mutateAsync({ userId, role, type })
//     } catch (err) {
//       console.log(err)
//       toast.error(err.message)
//     }
//   }

//   const fireHandler = async (userId, type) => {
//     if (loggedInUser.email === userId) {
//       toast.error('Action Not Allowed')
//       return
//     }
//     try {
//       await fireUserMutation.mutateAsync({ userId, type })
//     } catch (err) {
//       console.log(err)
//       toast.error(err.message)
//     }
//   }

//   // Function to toggle between view modes
//   const toggleViewMode = () => {
//     setViewMode((prevMode) => (prevMode === 'table' ? 'card' : 'table'));
//   };

//   if (isGoogleUsersLoading || isSignUpUsersLoading) {
//     return <div>Loading...</div> // Handle loading state
//   }

//   return (
//     <div>
//       <div className="text-4xl text-center font-bold mt-10 mb-10">
//         All Employees
//       </div>

//       <div className="text-center my-4">
//         <button onClick={toggleViewMode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           {viewMode === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
//         </button>
//       </div>

//       {/* Render Table or Card Grid based on view mode */}
//       {viewMode === 'table' ? (
//         <div className="bg-gray-400 rounded-md">
//           <div className="overflow-x-auto">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Role</th>
//                   <th>Designation</th>
//                   <th>Update Role</th>
//                   <th>Salary</th>
//                   <th>Fire</th>
//                   <th>Edit</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {combinedUsers.map((user) => (
//                   <tr key={user._id}>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>{user.role}</td>
//                     <td>{user.designation}</td>
//                     <td className="px-5 py-5 border-b text-sm">
//                       <button
//                         onClick={() => {
//                           const isGoogleUser = googleUsers.some(u => u.email === user.email)
//                           setSelectedUser({ ...user, source: isGoogleUser ? 'google' : 'signUp' })
//                           setIsOpen(true)
//                         }}
//                         className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
//                       >
//                         <span
//                           aria-hidden="true"
//                           className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
//                         ></span>
//                         <span className="relative">Update Role</span>
//                       </button>
//                     </td>
//                     <td>{user.salary}</td>
//                     <td>
//                       {user.fire === 'false' ? (
//                         <button
//                           type="button"
//                           onClick={() => fireHandler(user._id, googleUsers.some(u => u.email === user.email) ? 'google' : 'signUp')}
//                         >
//                           <FaFire />
//                         </button>
//                       ) : (
//                         <h1>Fire</h1>
//                       )}
//                     </td>
//                     <td>
//                       <button className="btn btn-ghost btn-xs">
//                         <MdEditSquare />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {combinedUsers.map((user) => (
//             <UserCard
//               key={user._id}
//               user={user}
//               onUpdateRole={() => {
//                 const isGoogleUser = googleUsers.some(u => u.email === user.email)
//                 setSelectedUser({ ...user, source: isGoogleUser ? 'google' : 'signUp' })
//                 setIsOpen(true)
//               }}
//               onEdit={() => {
//                 // Handle edit action here
//               }}
//               onFire={() => fireHandler(user._id, googleUsers.some(u => u.email === user.email) ? 'google' : 'signUp')}
//             />
//           ))}
//         </div>
//       )}

//       {selectedUser && (
//         <UpdateUserModal
//           isOpen={isOpen}
//           setIsOpen={setIsOpen}
//           modalHandler={(role) => modalHandler(selectedUser.email, role, selectedUser.source)}
//           user={selectedUser}
//         />
//       )}
//     </div>
//   )
// }

// export default AdminPage






import { useMutation, useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { MdCancel, MdEditSquare } from 'react-icons/md'
import { BsFillHandThumbsUpFill } from 'react-icons/bs'
import { FaFire } from 'react-icons/fa'
import { useState } from 'react'
import UpdateUserModal from '../../Modal/UpdateUserModel'
import { toast } from 'react-toastify'

const UserCard = ({ user, onUpdateRole, onEdit, onFire }) => {
  
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Designation:</strong> {user.designation}</p>
      <p><strong>Salary:</strong> {user.salary}</p>
      <div className="mt-4">
        <button
          onClick={onUpdateRole}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Update Role
        </button>
        <button
          onClick={onFire}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          {user.fire === 'false' ? <FaFire /> : <span>Fire</span>}
        </button>
        <button
          onClick={onEdit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <MdEditSquare />
        </button>
      </div>
    </div>
  )
}

const AdminPage = () => {
  const { user: loggedInUser } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [viewMode, setViewMode] = useState('table');
  const [firedUser, setFiredUser] = useState(null);

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

  // Filter and combine users
  const combinedUsers = [...googleUsers, ...signUpUsers]
    .filter(
      (user) =>
        (user.name !== null &&
          user.role === 'employee' &&
          user.status === 'true') ||
        (user.name !== null && user.role === 'hr') ||
        (user.name !== null && user.role === 'admin')
    )
    .sort((a, b) => {
      if (a.role === 'hr' && b.role !== 'hr') return -1
      if (a.role !== 'hr' && b.role === 'hr') return 1
      return 0
    })

  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ userId, role, type }) => {
      const endpoint = type === 'google' ? `/googleUsers/update/${userId}` : `/signUpUsers/update/${userId}`
      const { data } = await axiosSecure.patch(endpoint, { role, apply: 'true' })
      return data
    },
    onSuccess: (data) => {
      console.log('Mutation Success:', data)
      refetchGoogleUsers()
      refetchSignUpUsers()
      toast.success('User role updated successfully!')
      setIsOpen(false)
    },
    onError: (error) => {
      console.log('Mutation Error:', error)
      toast.error(error.message)
    }
  })

  const fireUserMutation = useMutation({
    mutationFn: async ({ userId, type }) => {
      const endpoint = type === 'google' ? `/googleUsers/fire/${userId}` : `/signUpUsers/fire/${userId}`;
      const { data } = await axiosSecure.patch(endpoint);
      return data;
    },
    onSuccess: (data) => {
      console.log('Mutation Success:', data);
      refetchGoogleUsers();
      refetchSignUpUsers();
      toast.success('User has been fired!');
    },
    onError: (error) => {
      console.log('Mutation Error:', error);
      toast.error(error.message);
    }
  });

  const modalHandler = async (userId, role, type) => {
    if (loggedInUser.email === userId) {
      toast.error('Action Not Allowed')
      return setIsOpen(false)
    }
    try {
      await updateUserRoleMutation.mutateAsync({ userId, role, type })
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  const fireHandler = async (userId, type) => {
    if (loggedInUser.email === userId) {
      toast.error('Action Not Allowed')
      return
    }
    try {
      await fireUserMutation.mutateAsync({ userId, type })
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  // Function to toggle between view modes
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'table' ? 'card' : 'table'));
  };

  if (isGoogleUsersLoading || isSignUpUsersLoading) {
    return <div>Loading...</div> // Handle loading state
  }

  return (
    <div>
      <div className="text-4xl text-center font-bold mt-10 mb-10">
        All Employees
      </div>

      <div className="text-center my-4">
        <button onClick={toggleViewMode} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {viewMode === 'table' ? 'Switch to Card View' : 'Switch to Table View'}
        </button>
      </div>

      {/* Render Table or Card Grid based on view mode */}
      {viewMode === 'table' ? (
        <div className="bg-gray-400 rounded-md">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Designation</th>
                  <th>Update Role</th>
                  <th>Salary</th>
                  <th>Fire</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {combinedUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.designation}</td>
                    <td className="px-5 py-5 border-b text-sm">
                      <button
                        onClick={() => {
                          const isGoogleUser = googleUsers.some(u => u.email === user.email)
                          setSelectedUser({ ...user, source: isGoogleUser ? 'google' : 'signUp' })
                          setIsOpen(true)
                        }}
                        className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                        ></span>
                        <span className="relative">Update Role</span>
                      </button>
                    </td>
                    <td>{user.salary}</td>
                    <td>
                      {user.fire === 'false' ? (
                        <button
                          type="button"
                          onClick={() => fireHandler(user._id, googleUsers.some(u => u.email === user.email) ? 'google' : 'signUp')}
                        >
                          <FaFire />
                        </button>
                      ) : (
                        <h1>Fire</h1>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-xs">
                        <MdEditSquare />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {combinedUsers.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              onUpdateRole={() => {
                const isGoogleUser = googleUsers.some(u => u.email === user.email)
                setSelectedUser({ ...user, source: isGoogleUser ? 'google' : 'signUp' })
                setIsOpen(true)
              }}
              onEdit={() => {
                // Handle edit action here
              }}
              onFire={() => fireHandler(user._id, googleUsers.some(u => u.email === user.email) ? 'google' : 'signUp')}
            />
          ))}
        </div>
      )}

      {selectedUser && (
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={(role) => modalHandler(selectedUser.email, role, selectedUser.source)}
          user={selectedUser}
        />
      )}
    </div>
  )
}

export default AdminPage



