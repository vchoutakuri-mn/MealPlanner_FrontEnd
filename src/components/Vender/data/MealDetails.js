import axios  from "axios";
import { DATES_WITH_MEAL_DETAILS,DATES_WITH_EMPLOYEE_DETSILS } from "../../API's/CommonService";

c
class Details {
    getMealDates(){
        return axios.get(DATES_WITH_MEAL_DETAILS);
    }

    getEmployeeMealDates(id){
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+id);
    }
}
export default new Details();