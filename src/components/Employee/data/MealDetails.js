import axios  from "axios";
import { 
    EMPLOYEE_SELECTED_MEAL_DATES,
    EMPLOYEE_UPDATED_MEAL_DATES, 
    TOKEN, 
    MEAL_SUBSCRIPTION ,
    EXISTDATES,
    EMPLOYEE_CANCEL_MEAL_DATES} from "../../API's/CommonService";
import { GET_TOKEN } from "../../Vender/data/Storage";
import moment from 'moment';
import { each } from "jquery";


const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/page?"

class MealDetails {
    getSelectedDates(pageNo,pageSize){
  
        return axios.get(EXISTDATES+'1',{
            headers: 
            { Authorization: `Bearer ${GET_TOKEN()}` }
        });
    }

    getSelectedMealDates(empID){
        return axios.get(EMPLOYEE_SELECTED_MEAL_DATES+"/"+empID,{
            headers: 
            { Authorization: `Bearer ${GET_TOKEN()}` }
        });
    }
    
    // checkMealSubscription(){
    //     return axios.get(MEAL_SUBSCRIPTION, {
    //         headers: 
    //         { Authorization: `Bearer ${GET_TOKEN()}` }
    //     });
        
    // }


    updateMealDetails(updatedDatesList){
        var data=[]
        updatedDatesList.map(eachDay=>{
            if(!data.includes(eachDay))
            data .push({
                d:eachDay[0],
                vid : 1,
                mealType:eachDay[1]=='veg'?true:false,
                subscribed:1
            })
        })
        data=[
            {
                d:"2021-10-08",
                vid:1,
                subscribed:true,
                mealType:true
            }
        ]
        console.log(data,EMPLOYEE_CANCEL_MEAL_DATES)
        return axios.get(EMPLOYEE_CANCEL_MEAL_DATES,{
            headers: 
            { Authorization: `Bearer ${GET_TOKEN()}` }
        })
    }
    

    createRegularDateFormat(arr1) {
        var d
      
            d = new Date(arr1)
            var day = d.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            var month = d.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var year = d.getFullYear();
           return year + "-" + month + "-" + day
            //console.log("string date in date format ",year + "-" + month + "-" + day)
            //console.log("datespulsmealtype[i]",datespulsmealtype.replace(datespulsmealtype[i].slice(0,11),year + "-" + month + "-" + day))
        }
     
     
    submitMealDetails(datespulsmealtype){
        //console.log(this.createRegularDateFormat(new Date(),'-'))
        console.log("datespulsmealtype",datespulsmealtype)
        var data1=[]
        var empdate = datespulsmealtype.slice(0,10)
        var empmealtype = datespulsmealtype.slice(12,14)
        console.log("empmealtype",empmealtype)
        
        var arr1 = []
        var arr2 = []
        var arr3 = []
        console.log(datespulsmealtype.length)
        for(var i = 0 ; i < datespulsmealtype.length; i++){
         
            arr1[i] = datespulsmealtype[i].slice(0,10)
            arr2[i] = moment(arr1[i], "MM-DD-YYYY");
            arr3[i] = datespulsmealtype[i].slice(10,)
        }
      console.log("arr1",arr1)
      console.log("arr2",arr2)
      console.log("arr3",arr3)
        datespulsmealtype.map(eachDay=>{
            data1 .push({
                //empid:parseInt(empID),
                d:this.createRegularDateFormat(eachDay.slice(0,10)),
                vid:1,
                subscribed:true,
                mealType:eachDay.slice(10,).includes('nonveg')?true:false
           
            })
        })
        //console.log("selected dates",dates2)
        console.log("data in submitmealdetails  ",data1)
        console.log("TOKEN",GET_TOKEN())
        
        return axios.post(EMPLOYEE_SELECTED_MEAL_DATES,data1,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }})
}
}
export default new MealDetails();