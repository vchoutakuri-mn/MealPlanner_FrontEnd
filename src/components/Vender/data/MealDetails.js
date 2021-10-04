import axios  from "axios";
import { MEAL_DETAILS_BETWEEN_DATES,SUBMIT_REST_API_URL } from "../../API's/CommonService";
import { GET_TOKEN } from "./Storage";
const UDATES_WITH_MEAL_DETAILS="http://localhost:8080/employee/getAll";
const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/blogPageable?size="

class MealDetails {
    getMealDates(START_DATE,END_DATE,pageNo,pageSize){
        return axios.get(MEAL_DETAILS_BETWEEN_DATES+""+START_DATE+"/"+END_DATE+"/"+pageNo+"/"+pageSize,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        });
    }

    getEmployeeMealDates(id){
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+id);
    }

    submitId(employeeIds){
        console.log(SUBMIT_REST_API_URL+employeeIds)
        console.log( axios.get(SUBMIT_REST_API_URL+[employeeIds],{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        }))
        return axios.get(SUBMIT_REST_API_URL+[employeeIds],
            {},
        {
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        })
    }
}
export default new MealDetails();