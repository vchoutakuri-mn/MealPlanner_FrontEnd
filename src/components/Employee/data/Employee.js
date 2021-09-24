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
    checkMealSubscription(){
        
        axios.get(MEAL_SUBSCRIPTION).then(response=>{
                return response.data
        }).catch(err=>{
            return false
        })
    }
}
export default new Employee();