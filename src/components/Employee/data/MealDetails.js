import axios  from "axios";
import { EMPLOYEE_SELECTED_MEAL_DATES,EMPLOYEE_UPDATED_MEAL_DATES } from "../../API's/CommonService";
import { GET_TOKEN } from "../../Vender/data/Storage";


const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/page?"

class MealDetails {

    getEmployeeMealDates(pageNo,pageSize){
        console.log(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+pageNo+"&pageSize="+pageSize)
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+(pageNo-1)+"&pageSize="+pageSize);
    }

    getSelectedMealDates(empID){
        return axios.get(EMPLOYEE_SELECTED_MEAL_DATES+"/"+empID,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        });
    }
    updateMealDetails(updatedDatesList,empID){
        var data=[]
        updatedDatesList.map(eachDay=>{
            data .push({
                emp_id:empID,
                meal_date:eachDay[0],
                meal_type:eachDay[1]=='veg'?0:1,
                subscribed:1
            })
        })
        console.log(data)
        return axios.post(EMPLOYEE_UPDATED_MEAL_DATES+'/'+empID,data,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        })
    }

    submitMealDetails(selectedDatesList,empID){
        // var data=[]
        // selectedDatesList.map(eachDay=>{
        //     data .push({
        //         emp_id:empID,
        //         meal_date:eachDay[0],
        //         meal_type:eachDay[1]=='veg'?0:1,
        //         subscribed:1
        //     })
        // })
        console.log(selectedDatesList)
        return axios.post(EMPLOYEE_SELECTED_MEAL_DATES+"/"+empID,selectedDatesList,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }})
    }
}
export default new MealDetails();