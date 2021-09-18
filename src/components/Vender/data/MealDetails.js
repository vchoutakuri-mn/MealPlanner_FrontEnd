import axios  from "axios";


const DATES_WITH_MEAL_DETAILS="http://localhost:8080/employee/getAll";
const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/blogPageable?size="

class Details {
    getMealDates(){
        return axios.get(UDATES_WITH_MEAL_DETAILS);
    }

    getEmployeeMealDates(id){
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+id);
    }
}
export default new Details();