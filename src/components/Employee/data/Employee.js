import axios  from "axios";
import { LOGIN,SIGNUP} from "../../API's/CommonService";

// const USERS_REST_API_URL="https://api.github.com/users";
const USERS_REST_API_URL="http://localhost:8080/employee/getAll";
const SUBMIT_REST_API_URL="http://localhost:8080/employee//employees/"

class Employee {
    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }

    submitStatus(id){
        return axios.put(SUBMIT_REST_API_URL+id);
    }
    checkValidation(userId,password){
        return axios.post(LOGIN,null, { params: { user: userId ,password:password } })
    }
    createAccount(userType,userId,password,userName,userEmail,mealSubscribed){
        return axios.post(SIGNUP,
            {
                user:userType,
                userId:userId,
                password:password,
                userName:userName,
                userEmail:userEmail,
                mealSubscribed:mealSubscribed
            })
    }
}
export default new Employee();