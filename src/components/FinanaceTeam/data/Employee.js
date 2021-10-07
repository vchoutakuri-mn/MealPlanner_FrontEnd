import axios  from "axios";


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

    downloadDataForFinance(start,end){
        return axios.get(DOWNLOAD_API_FOR+start+'/'+end,
        {

            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        })
    }
}
export default new Employee();