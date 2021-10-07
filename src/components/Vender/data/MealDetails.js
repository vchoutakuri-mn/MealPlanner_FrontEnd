import axios  from "axios";
import { MEAL_DETAILS_BETWEEN_DATES,SUBMIT_REST_API_URL ,SEARCH_BY_IN_VENDOR,DOWNLOAD_API, DOWNLOAD_API_FOR_FINANCER} from "../../API's/CommonService";
import { GET_TOKEN } from "./Storage";
const UDATES_WITH_MEAL_DETAILS="http://localhost:8080/employee/getAll";
const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/blogPageable?size="

class MealDetails {
    getMealDates(START_DATE,END_DATE,pageNo,pageSize){
        console.log(MEAL_DETAILS_BETWEEN_DATES+"/"+START_DATE+"/"+END_DATE+"/"+pageNo+"/"+pageSize)
        return axios.get(MEAL_DETAILS_BETWEEN_DATES+"/"+START_DATE+"/"+END_DATE+"/"+pageNo+"/"+pageSize,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        });
    }

    
    getEmployeeMealDates(id){
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+id);
    }

    submitId(employeeIds){

        return axios.put(SUBMIT_REST_API_URL+[employeeIds],
        
        {
           
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        })
    }


    searchBy(searchBy,searchData){
        let data={
            searchby:searchBy,
            value:searchData
        }
        console.log("data ",data)
        console.log(SEARCH_BY_IN_VENDOR,searchBy)
        return axios.get(SEARCH_BY_IN_VENDOR,
        {
           params:data,
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        })
    }
    downloadData(start,end){
        return axios.get(DOWNLOAD_API+start+'/'+end,
        {

            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        })
    }

    downloadDataForFinance(start,end){
        return axios.get(DOWNLOAD_API_FOR_FINANCER+start+'/'+end,
        {

            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
        })
    }
}
export default new MealDetails();