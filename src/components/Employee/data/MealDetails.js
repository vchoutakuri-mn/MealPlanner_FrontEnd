import axios  from "axios";
import { EMPLOYEE_SELECTED_MEAL_DATES,EMPLOYEE_UPDATED_MEAL_DATES, TOKEN } from "../../API's/CommonService";
import { GET_TOKEN } from "../../Vender/data/Storage";
import moment from 'moment';

const DATES_WITH_EMPLOYEE_DETSILS="http://localhost:8080/employee/page?"

class MealDetails {
   

    // getEmployeeMealDates(pageNo,pageSize){
    //     console.log(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+pageNo+"&pageSize="+pageSize)
    //     return axios.get(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+(pageNo-1)+"&pageSize="+pageSize);
    // }
    getEmployeeMealDates(pageNo,pageSize){
        console.log(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+pageNo+"&pageSize="+pageSize)
        return axios.get(DATES_WITH_EMPLOYEE_DETSILS+'pageNo='+(pageNo-1)+"&pageSize="+pageSize);
    }

    getSelectedMealDates(empID){
        return axios.get(EMPLOYEE_SELECTED_MEAL_DATES+"/"+empID,{
            headers: 
            { Authorization: `Bearer ${GET_TOKEN()}` }
        });
    }


    updateMealDetails(updatedDatesList,empID){
        var data=[]
        updatedDatesList.map(eachDay=>{
            data .push({
                empid:empID,
                d:eachDay[0],
                vid : 1,
                mealType:eachDay[1]=='veg'?true:false,
                subscribed:1
            })
        })
        console.log(data)
        return axios.post(EMPLOYEE_UPDATED_MEAL_DATES+'/'+empID,data,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }
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
     
     
    submitMealDetails(datespulsmealtype,empID){
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
         
            arr1[i] = datespulsmealtype[i].slice(0,11)
            arr2[i] = moment(arr1[i], "MM-DD-YYYY");
            arr3[i] = datespulsmealtype[i].slice(12,)
        }
      console.log("arr1",arr1)
      console.log("arr2",arr2)
      console.log("arr3",arr3)
        datespulsmealtype.map(eachDay=>{
            data1 .push({
                empid:parseInt(empID),
                d:this.createRegularDateFormat(eachDay.slice(0,11)),
                vid:1,
                subscribed:true,
                mealType:eachDay.slice(12,).includes('nonveg')?true:false
           
            })
        })
        //console.log("selected dates",dates2)
        console.log("data in submitmealdetails  ",data1)
        console.log("TOKEN",GET_TOKEN())
        if(datespulsmealtype.length == data1.length){
        return axios.post(EMPLOYEE_SELECTED_MEAL_DATES,data1,{
            headers: { Authorization: `Bearer ${GET_TOKEN()}` }})
    }
    else{
        alert("please select meal type")
    }
}
}
export default new MealDetails();