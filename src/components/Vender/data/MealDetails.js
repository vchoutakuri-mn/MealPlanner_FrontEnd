import axios  from "axios";
import { MEAL_DETAILS_BETWEEN_DATES } from "../../API's/CommonService";
import { GET_TOKEN } from "./Storage";
const UDATES_WITH_MEAL_DETAILS="http://localhost:8080/employee/getAll";
const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/blogPageable?size="

class MealDetails {
    getMealDates(START_DATE,END_DATE){
        return axios.get(MEAL_DETAILS_BETWEEN_DATES+"/"+START_DATE+"/"+END_DATE,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        });
    }

    getEmployeeMealDates(id){
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+id);
    }
}
export default new MealDetails();