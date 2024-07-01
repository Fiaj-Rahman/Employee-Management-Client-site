// // import PropTypes from 'prop-types'
// // import { createContext, useEffect, useState } from 'react'
// // import {
// //   GoogleAuthProvider,
// //   createUserWithEmailAndPassword,
// //   getAuth,
// //   onAuthStateChanged,
// //   sendPasswordResetEmail,
// //   signInWithEmailAndPassword,
// //   signInWithPopup,
// //   signOut,
// //   updateProfile,
// // } from 'firebase/auth'
// // import { app } from '../firebase/firebase.config'
// // import axios from 'axios'
// // export const AuthContext = createContext(null)
// // const auth = getAuth(app)
// // const googleProvider = new GoogleAuthProvider()

// // const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null)
// //   const [loading, setLoading] = useState(true)

// //   const createUser = (email, password) => {
// //     setLoading(true)
// //     return createUserWithEmailAndPassword(auth, email, password)
// //   }

// //   const signIn = (email, password) => {
// //     setLoading(true)
// //     return signInWithEmailAndPassword(auth, email, password)
// //   }

// //   const signInWithGoogle = () => {
// //     setLoading(true)
// //     return signInWithPopup(auth, googleProvider)
// //   }

// //   const resetPassword = email => {
// //     setLoading(true)
// //     return sendPasswordResetEmail(auth, email)
// //   }

// //   const logOut = async () => {
// //     setLoading(true)
// //     await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
// //       withCredentials: true,
// //     })
// //     return signOut(auth)
// //   }

// //   const updateUserProfile = (name, photo) => {
// //     return updateProfile(auth.currentUser, {
// //       displayName: name,
// //       photoURL: photo,
// //     })
// //   }


// //     // save user
// //     const saveUser = async user => {
// //       const currentUser = {
// //         name:user?.displayName,
// //         email: user?.email,
// //         role: user?.role || 'Employee',
// //         status: 'false',
// //         bankAccount: user?.bankAccount || '55408480878',
// //         salary: user?.salary || '29500',

// //       }
// //       const { data } = await axios.put(
// //         `${import.meta.env.VITE_API_URL}/user`,
// //         currentUser
// //       )
// //       return data
// //     }



// //   // Get token from server
// //   const getToken = async email => {
// //     const { data } = await axios.post(
// //       `${import.meta.env.VITE_API_URL}/jwt`,
// //       { email },
// //       { withCredentials: true }
// //     )
// //     return data
// //   }

// //   // onAuthStateChange
// //   useEffect(() => {
// //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
// //       setUser(currentUser)
// //       if (currentUser) {
// //         getToken(currentUser.email)
// //         saveUser(currentUser)
// //       }
// //        console.log('User:', currentUser) // Logging the user object
// //       setLoading(false)
// //     })
// //     return () => {
// //       return unsubscribe()
// //     }
// //   }, [])

// //   const authInfo = {
// //     user,
// //     loading,
// //     setLoading,
// //     createUser,
// //     signIn,
// //     signInWithGoogle,
// //     resetPassword,
// //     logOut,
// //     updateUserProfile,
// //   }

// //   return (
// //     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
// //   )
// // }

// // AuthProvider.propTypes = {
// //   // Array of children.
// //   children: PropTypes.array,
// // }

// // export default AuthProvider






// import PropTypes from 'prop-types'
// import { createContext, useEffect, useState } from 'react'
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from 'firebase/auth'
// import { app } from '../firebase/firebase.config'
// import axios from 'axios'
// export const AuthContext = createContext(null)
// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider()

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const createUser = (email, password) => {
//     setLoading(true)
//     return createUserWithEmailAndPassword(auth, email, password)
//   }

//   const signIn = (email, password) => {
//     setLoading(true)
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const signInWithGoogle = () => {
//     setLoading(true)
//     return signInWithPopup(auth, googleProvider)
//   }

//   const resetPassword = email => {
//     setLoading(true)
//     return sendPasswordResetEmail(auth, email)
//   }

//   const logOut = async () => {
//     setLoading(true)
//     await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
//       withCredentials: true,
//     })
//     return signOut(auth)
//   }

//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     })
//   }


//     // // save user
//     // const saveUser = async user => {
//     //   const currentUser = {
//     //     name:user?.displayName,
//     //     email: user?.email,
//     //     role: user?.role || 'Employee',
//     //     status: 'false',
//     //     bankAccount: user?.bankAccount || '55408480878',
//     //     salary: user?.salary || '29500',

//     //   }
//     //   const { data } = await axios.put(
//     //     `${import.meta.env.VITE_API_URL}/user`,
//     //     currentUser
//     //   )
//     //   return data
//     // }



//   // Get token from server
//   const getToken = async email => {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API_URL}/jwt`,
//       { email },
//       { withCredentials: true }
//     )
//     return data
//   }

//   // onAuthStateChange
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser)
//       if (currentUser) {
//         getToken(currentUser.email)
//         // saveUser(currentUser)
//       }
//        console.log('User:', currentUser) // Logging the user object
//       setLoading(false)
//     })
//     return () => {
//       return unsubscribe()
//     }
//   }, [])

//   const authInfo = {
//     user,
//     loading,
//     setLoading,
//     createUser,
//     signIn,
//     signInWithGoogle,
//     resetPassword,
//     logOut,
//     updateUserProfile,
//   }

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   )
// }

// AuthProvider.propTypes = {
//   // Array of children.
//   children: PropTypes.array,
// }

// export default AuthProvider





// import PropTypes from 'prop-types'
// import { createContext, useEffect, useState } from 'react'
// import {
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   getAuth,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from 'firebase/auth'
// import { app } from '../firebase/firebase.config'
// import axios from 'axios'
// export const AuthContext = createContext(null)
// const auth = getAuth(app)
// const googleProvider = new GoogleAuthProvider()

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)

//   const createUser = (email, password) => {
//     setLoading(true)
//     return createUserWithEmailAndPassword(auth, email, password)
//   }

//   const signIn = (email, password) => {
//     setLoading(true)
//     return signInWithEmailAndPassword(auth, email, password)
//   }

//   const signInWithGoogle = () => {
//     setLoading(true)
//     return signInWithPopup(auth, googleProvider)
//   }

//   const resetPassword = email => {
//     setLoading(true)
//     return sendPasswordResetEmail(auth, email)
//   }

//   const logOut = async () => {
//     setLoading(true)
//     await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
//       withCredentials: true,
//     })
//     return signOut(auth)
//   }

//   const updateUserProfile = (name, photo) => {
//     return updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: photo,
//     })
//   }


//     // save user
//     const saveUser = async user => {
//       const currentUser = {
//         name:user?.displayName,
//         email: user?.email,
//         role: user?.role || 'Employee',
//         status: 'false',
//         bankAccount: user?.bankAccount || '55408480878',
//         salary: user?.salary || '29500',

//       }
//       const { data } = await axios.put(
//         `${import.meta.env.VITE_API_URL}/user`,
//         currentUser
//       )
//       return data
//     }



//   // Get token from server
//   const getToken = async email => {
//     const { data } = await axios.post(
//       `${import.meta.env.VITE_API_URL}/jwt`,
//       { email },
//       { withCredentials: true }
//     )
//     return data
//   }

//   // onAuthStateChange
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, currentUser => {
//       setUser(currentUser)
//       if (currentUser) {
//         getToken(currentUser.email)
//         saveUser(currentUser)
//       }
//        console.log('User:', currentUser) // Logging the user object
//       setLoading(false)
//     })
//     return () => {
//       return unsubscribe()
//     }
//   }, [])

//   const authInfo = {
//     user,
//     loading,
//     setLoading,
//     createUser,
//     signIn,
//     signInWithGoogle,
//     resetPassword,
//     logOut,
//     updateUserProfile,
//   }

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   )
// }

// AuthProvider.propTypes = {
//   // Array of children.
//   children: PropTypes.array,
// }

// export default AuthProvider






import PropTypes from 'prop-types'
import { createContext, useEffect, useState } from 'react'
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { app } from '../firebase/firebase.config'
import axios from 'axios'
export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, googleProvider)
  }

  
    // save user
    // const saveUser = async (user) => {
    //   const currentUser = {
    //     name:user?.displayName,
    //     email: user?.email,
    //     role: 'Employee',
    //     status: 'false',
    //     bankAccount:'55408480878',
    //     salary:'29500',

    //   }
    //   const { data } = await axios.post(
    //     `${import.meta.env.VITE_API_URL}/user`,
    //     currentUser
    //   )
    //   return data
    // }



  // const signInWithGoogle = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await signInWithPopup(auth, googleProvider);
  //     const { user } = result;
  //     await saveUser(user); // Call saveUser after signing in with Google
  //     return result;
  //   } catch (error) {
  //     setLoading(false);
  //     throw error;
  //   }
  // };
  

  const resetPassword = email => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email)
  }

  const logOut = async () => {
    setLoading(true)
    await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
      withCredentials: true,
    })
    return signOut(auth)
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }



  
    // save user
    const saveUser = async (user) => {
      const currentUser = {
        name:user?.displayName,
        email: user?.email,
        photo:user?.photoURL,
        role: 'employee',
        designation: 'Front-End-Devoloper',
        status: 'false',
        apply:'Verified',
        fire:'false',
        bankAccount:'55408480878',
        salary:'29500',

      }
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/googleUser`,
        currentUser
      )
      return data
    }





  // Get token from server
  const getToken = async email => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email },
      { withCredentials: true }
    )
    return data
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      if (currentUser) {
        getToken(currentUser.email)
        saveUser(currentUser)
      }
       console.log('User:', currentUser) // Logging the user object
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    resetPassword,
    logOut,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  // Array of children.
  children: PropTypes.array,
}

export default AuthProvider