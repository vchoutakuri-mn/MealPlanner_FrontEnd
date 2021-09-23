import axios  from "axios";
import { USERS_REST_API_URL ,SUBMIT_REST_API_URL} from "../../API's/CommonService";


class Employee {
    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }

    submitStatus(id){
        return axios.put(SUBMIT_REST_API_URL+id);
    }
}
export default new Employee();