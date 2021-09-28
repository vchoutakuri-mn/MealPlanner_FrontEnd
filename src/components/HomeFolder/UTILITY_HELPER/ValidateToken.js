import { VALIDATE_TOKEN } from "../../API's/CommonService"
import axios from 'axios'


export default function ValidateToken(token){
    return axios.get(VALIDATE_TOKEN,{
        headers: { Authorization: `Bearer ${token}` }
    }).then(
        res=>{
            console.log("Token valid")
            return true
        }
    ).catch(
        err=>{
            console.log("Invalid token")
            return false
        }
    )
}