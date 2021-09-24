
            // ---------------------Vendor API's------------------------//

//For listing all the emplpoyees on vender's home page
//Request:pageNo:int and pageSize:int
//Expected : List of json objects
//Method type:
export const USERS_REST_API_URL="http://localhost:8080/employee/getAllPaging?";

// For updating daily meal status of particular employee or list of employees
// Request:list of empId
//Expected:'sucess' message on sucessful updation . 'failed' message on unsucessful updation
//Method type:
export const SUBMIT_REST_API_URL="http://localhost:8080/employee//employees/"

// Return the number of employees of particular vendor id
//Expected :number
//Method type:
export const NUMBER_OF_RECORDS="http://localhost:8080/employee/numberOfRecord"

//In vendor's report page , need an API which return the list which have a details like total number of meals
//Request :startDate and endDate
//Expected:List of json objects
//Method type:
export const MEAL_DETAILS_BETWEEN_DATES='';

//For updating or changing the meal price in vendor's home page
//Request:veg:$ and nonVeg:$
//Expected:200 status on sucessful updation of meal price 
//Method type:
export const MEAL_PRICE='';




            // -------------------------Financer API's----------------------------//

//
//Request:
//Expected:
//Method type:
export const DATES_WITH_MEAL_DETAILS="http://localhost:8080/employee/getAll";

//
//Request:
//Expected:
//Method type:
export const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/blogPageable?size="


            //-------------------------------Employee API's------------------------//



//Login URL
export const LOGIN="http://localhost:8080/hello";

