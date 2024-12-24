import { createContext, useEffect, useState } from "react"
import auth from "../FireBase/firebase.config"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"


export const AuthContext = createContext(null)
import { GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser]=useState(null)
    const [myPosts, setMyPosts] = useState([])


    const createSingUp = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email,password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }

    const handleGoogleLogin = ()=>{
      setLoading(true)
      return signInWithPopup(auth, provider)
    }

    const signOutFunc = ()=>{
      setLoading(true)
      return signOut(auth)
    }

    useEffect(()=>{
      const currentUser = onAuthStateChanged(auth, (user) => {
        setUser(user)
        setLoading(false)
      });
     return ()=> currentUser()
    },[])

    const info ={
        user,
        loading,
        setLoading,
        createSingUp,
        signInUser,
        handleGoogleLogin,
        signOutFunc,
        setMyPosts,
        myPosts,
    }

  return (
    <AuthContext.Provider value={info}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

