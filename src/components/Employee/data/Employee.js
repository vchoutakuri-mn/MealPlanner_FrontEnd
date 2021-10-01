import axios  from "axios";
import { LOGIN,SIGNUP,MEAL_SUBSCRIPTION} from "../../API's/CommonService";
import { GET_TOKEN } from "../../Vender/data/Storage";

// const USERS_REST_API_URL="https://api.github.com/users";


class Employee {
    getUsers(){
        return axios.get();
    }

    submitStatus(id){
        return axios.put();
    }
    checkValidation(userId,password){
        return axios.post(LOGIN,null, { params: { username: userId ,password:password } })
    }
    createAccount(userType,userId,password,userName,userEmail,mealSubscribed){
        console.log("Type of user",userType);
        return axios.post(SIGNUP,
            {
                id:userId,
                name:userName,
                email:userEmail,
                role:userType,
                pass:password,
                meal_subscribed:0,
                meal_plan_type:0
            })
    }
    checkMealSubscription(empId){
        const config = {
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        };
        console.log(MEAL_SUBSCRIPTION+'/'+empId)
        return axios.get(MEAL_SUBSCRIPTION+'/'+empId,config);
}
}
export default new Employee();