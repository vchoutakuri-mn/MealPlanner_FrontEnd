import axios  from "axios";
import { GET_TOKEN } from "../../Vender/data/Storage";
import { MEAL_DETAILS_BETWEEN_DATES } from "../../API's/CommonService";



const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/page?"

class MealDetails {
   

    getEmployeeMealDates(pageNo,pageSize){
        console.log(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+pageNo+"&pageSize="+pageSize)
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+(pageNo-1)+"&pageSize="+pageSize);
    }

    updateMealDetails(selectedMealDates){
        return axios.post("")
    }
    getMealDates(START_DATE,END_DATE){
        return axios.get(MEAL_DETAILS_BETWEEN_DATES+"/"+START_DATE+"/"+END_DATE,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        });
    }
}
export default new MealDetails();