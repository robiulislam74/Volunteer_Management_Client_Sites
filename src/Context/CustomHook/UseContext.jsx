import { useContext } from "react"
import { AuthContext } from "../AuthProvider"

const UseContext =()=>{
    return useContext(AuthContext)
}
export default UseContext