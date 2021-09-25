import axios  from "axios";
import { LOGIN,SIGNUP,MEAL_SUBSCRIPTION} from "../../API's/CommonService";

// const USERS_REST_API_URL="https://api.github.com/users";


class Employee {
    getUsers(){
        return axios.get();
    }

    submitStatus(id){
        return axios.put();
    }
    checkValidation(userId,password){
        return axios.post(LOGIN,null, { params: { user: userId ,password:password } })
    }
    createAccount(userType,userId,password,userName,userEmail,mealSubscribed){
        console.log("Type of user",userType);
        return axios.post(SIGNUP,
            {
                id:userId,
                name:userName,
                email:userEmail,
                role:userType,
                pass:password
            })
    }
    checkMealSubscription(){
        
        axios.get(MEAL_SUBSCRIPTION).then(response=>{
                return response.data
        }).catch(err=>{
            return false
        })
    }
}
export default new Employee();