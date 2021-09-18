import axios  from "axios";


// const USERS_REST_API_URL="https://api.github.com/users";
const USERS_REST_API_URL="http://localhost:8080/employee/getAllPaging?pageNo=";
const SUBMIT_REST_API_URL="http://localhost:8080/employee//employees/"
const NUMBER_OF_RECORDS="http://localhost:8080/employee/numberOfRecord"

class Employee {
    getUsers(pageNo,pageSize){
        return axios.get(USERS_REST_API_URL+(pageNo-1)+"&pageSize="+pageSize);
    }
    getNoOfRecords(pageNo,pageSize){
        return axios.get(NUMBER_OF_RECORDS);
    }

    submitStatus(id){
        return axios.put(SUBMIT_REST_API_URL+id);
    }
}
export default new Employee();