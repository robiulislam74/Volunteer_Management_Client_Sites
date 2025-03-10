import { createContext, useEffect, useState } from "react"
import auth from "../FireBase/firebase.config"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"


export const AuthContext = createContext(null)
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [loading,setLoading] = useState(true)
    const [user,setUser]=useState(null)
    const [myPosts, setMyPosts] = useState([])
    const [show,setShow] = useState(true)

    const handleLayoutControl=()=>{
      setShow(!show)
    }
  

  //  dark/light mode start
  const [theme, setTheme] = useState('light');
    
  useEffect(()=>{
    document.body.className=theme
  },[theme])

  const handleToggleBtn=()=>{
    setTheme((prevTheme)=>(prevTheme === "light" ? "dark":"light"))
  }
  //  dark/light mode end

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

        // JWT Token Set
        if(user?.email){
          const email = user.email
          axios.post(`${import.meta.env.VITE_API_URL}/jwt`,email,{
            withCredentials: true
          })
          .then(res=>{
            // console.log("SignIn Add Token",res.data)
            setLoading(false)
          })
        }else{
          axios.post(`${import.meta.env.VITE_API_URL}/logOut`,{},{
            withCredentials:true
          })
          .then(res=>{
            // console.log("logOut Remove Token",res.data)
            setLoading(false)
          })
        }

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
        handleToggleBtn,
        theme,
        handleLayoutControl,
        show,
        setShow
    }

  return (
    <AuthContext.Provider value={info}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

