import React, { useState, useCallback, useReducer } from 'react';
import Calendar from 'react-calendar';
import ReactDOM from 'react-dom';
import 'react-calendar/dist/Calendar.css';
import Start from './home';
import Hist from './Emp_history';
import './css/empHomecss.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Employee from './data/Employee';
import { SET_TOKEN } from '../Vender/data/Storage';
import MealDetails from './data/MealDetails';

toast.configure();

var prevoiusdatesforcancel =[]
// =
//     [
//       ["2021-10-01" ,'veg'],
//       ["2021-10-04",'nonveg'],
//       ["2021-10-06",'nonveg'],
//       ["2021-10-07",'veg'],
      
//     ]

var selectedDatesList = []
// [
  
//   ["2021-9-30", 'nonveg'],
//   ["2021-10-3", 'veg'],
//   ["2021-10-5", 'nonveg'],
//   ["2021-10-6", 'veg'],

// ]

var TABLE_HIDE = 'none';
var btn_hide = 'none';
var datesArray=[];
var dates = []
var typeOfMeal;
var subnv = false;
var subveg = false;
var enable = false;
var deleteddates = [];
var datespulsmealtype = []
var datesmealtype2d = []
var duplicate = []
var empHistData 



export default function MyApp(props) {
  var meal_subscribed
  const { empId, token } = props;
  //const { empId, meal_subscribed, token } = props;
  const [value, onChange] = useState(false);
  var [dates2, setDates] = useState([])
  const [reload, doReload] = useReducer((x) => x + 1, 0)
  //var [selectedDatesList,setSelectDatesList]=useState([])
  const [SELECTED_MEAL_DATES_HIDE, setSelectedMealDatesHide] = useState('none')



  function goToEmphist() {

    ReactDOM.render(<Hist />, document.getElementById("root"))
  }


  function goToStart() {
    localStorage.clear()
    localStorage.setItem('validUser', 'false')
    ReactDOM.render(<Start />, document.getElementById("root"))
  }

//   function comparedisp(datesmealtype2d){
    
//     for(var i = 0; i< selectedDatesList.length; i++){
//       for(var j=0 ; j< datesmealtype2d.length; j++){
//       if(datesmealtype2d[j][0] == selectedDatesList[i][0]){
//         datesmealtype2d[j][1] = selectedDatesList[i][1] 
//         if(datesmealtype2d[j][1] == 'veg')
//         console.log(datesmealtype2d[j][0]+"veg")
//         document.getElementById(datesmealtype2d[j][0]+"veg").checked = true
//       }
//       else if(datesmealtype2d[j][1] == 'non-veg'){
//         console.log(datesmealtype2d[j][0]+"nonveg")
//         document.getElementById(datesmealtype2d[j][0]+"nonveg").checked = true
//       }
//       else{
//         datesmealtype2d[j][1] = null
//       }
//    }
   
// }

//   }
  
  

// function insertdatemealtype(duplicate,comparedisp){
//   console.log("duplicate insertdatemealtype",typeof duplicate)
//     for(var i=0;i<duplicate.length;i++){
//       console.log("duplicate[i]", duplicate[i].slice(0,10))
//        datesmealtype2d.push([duplicate[i].slice(0,10),duplicate[i].slice(10,)])
//        //console.log("datesmealtype2d[i][0]",datesmealtype2d)
//        //datesmealtype2d[i][0] = duplicate[i].slice(0,10)
//       // datesmealtype2d[i][1] = duplicate[i].slice(11,14)
       
//     }
//     console.log("datesmealtype2d",datesmealtype2d)
//     console.log("datesmealtype2d,selectedDatesList start",datesmealtype2d,selectedDatesList)
//     comparedisp(datesmealtype2d)
//   }


  function goToNotify() {
    document.getElementById("myFormNotif").style.display = "block";
  }


  function closeFormNotif() {
    document.getElementById("myFormNotif").style.display = "none";
  }


function getDetails(e){
  var n = e.target.id
  console.log("e.target",e.target)
  datespulsmealtype.push(n)
  var date=e.target.id
  date=e.target.id.slice(0,10)
  console.log("datespulsmealtype",date)
  var mealtype = e.target.id.slice(10,)
  console.log(mealtype)
  //console.log(date+'nonveg'==e.target.id)
 
  if(e.target.id.includes('nonveg') ){
  if(e.target.checked){
    console.log("in getdetails in nonveg")
    document.getElementById(date+'nonveg').disabled=false
    document.getElementById(date+'veg').disabled=true
    }else{
      document.getElementById(date+'veg').disabled=false
      document.getElementById(date+'nonveg').disabled=false
    }

  }else{
    console.log(date,e.target.id)
    if(e.target.checked){
      console.log("veg checked")
      //console.log(date,"printing dates..",date+'nonveg')
      document.getElementById(date+'veg').disabled=false
      document.getElementById(date+'nonveg').disabled=true
    }else{
      document.getElementById(date+'nonveg').disabled=false
      document.getElementById(date+'veg').disabled=false

      }
    }
  // console.log("duplicate,118",duplicate,datespulsmealtype)
  // copydata(datespulsmealtype,insertdatemealtype)
  // console.log("duplicate 120",duplicate)
  //insertdatemealtype(duplicate);
  //comparedisp(datesmealtype2d)
  }

// function copydata(datespulsmealtype,insertdatemealtype){
//   //API call.then(
//     console.log(datespulsmealtype)
//     duplicate = datespulsmealtype
   
//  // )
//   insertdatemealtype(duplicate,comparedisp)

    
//   //  for(var i =0; i<datespulsmealtype.length ;i++){
//   //    console.log("in for loop")
//   //    console.log(datespulsmealtype[i])
//   //  //duplicate[i] = datespulsmealtype[i]
// // }
//  console.log(duplicate)
// }


function subscribed(e){
  //var type = document.getElementById("veg").value
  //console.log("clicked veg/nonveg")
  
  enable = true
  ////console.log("enable set to true",enable)
  goToSubs();
  typeOfMeal = e.target.id
  //console.log("typeOfMeal....",typeOfMeal)
  ////console.log(e.target.id)
  if(e.target.id.includes('nonveg') ){
    if(e.target.checked){
      document.getElementById('nonveg').disabled=false
        document.getElementById('veg').disabled=true
      }else{
        document.getElementById('veg').disabled=false
        document.getElementById('nonveg').disabled=false
      }

    } else {
      if (e.target.checked) {
        document.getElementById('nonveg').disabled = true
        document.getElementById('veg').disabled = false
      } else {
        document.getElementById('veg').disabled = false
        document.getElementById('nonveg').disabled = false

      }
      goToSubs();
    }

  }


  function finalSubsciption() {
    closeForm1();
    //alert("subscribed for "+typeOfMeal+" successfully")
    if (typeOfMeal == 'nonveg') {
      subnv = true
      console.log("making subnv true")
    }
    if (typeOfMeal == 'veg') {
      subveg = true
      console.log("making subveg true")
    }

    document.getElementById("subinheader").disabled = true;
    toast.success(
      "subscribed for " + typeOfMeal + " successfully",
      {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      }
    )

  }


var getDaysArray = function (start, end) {
  for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    //console.log("checking for days",dt.getDay())
    if (0 == dt.getDay() || 6 == dt.getDay())
      continue
    arr.push(new Date(dt));
  }
  return arr;
};



  function goToDel(e) {
    console.log("onclickkkkk", e.target.parentNode.id)
    document.getElementById(e.target.id)
    //console.log(e.target.parentNode.parentNode)
    var a = e.target.parentNode.id
    var getdate = a.slice(0, 12)
    console.log(getdate)
    var index = dates2.indexOf(getdate)
    //console.log("checking index",getdate,dates2[index])


    //console.log("deleted delete and index ",getdate,index,dates2)

    dates2.splice(index, 1)
    
    //console.log("dates after deleting ",dates2)
    var i = e.target.parentNode.parentNode.parentNode.rowIndex;
    //document.getElementById("mealsTable").deleteRow(i);
    //e.target.parentNode.parentNode.parentNode.style.display="none"
    //console.log("datesarray ",dates2)
    doReload();
  }

  function createRegularDateFormat(arr1) {
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

  function goToSubs() {
    
      Employee.checkMealSubscription().then((Response)=>{
        console.log(Response.data);
        meal_subscribed=Response.data
        console.log("meal_subscribed",meal_subscribed[0][0])
        if (meal_subscribed[0][0] == true) {
            alert("subscribed")
            //fade button
            return
          }
          else{
            if (enable) {
              document.getElementById("proceedtosub").disabled = false;
            }
            else {
              //console.log("not subscribed and proceedtosub is not disabled")
              document.getElementById("proceedtosub").disabled = true;
            }
           
            document.getElementById("sub").style.display = "block";
          }
     })
    

   

    // this.handleModal();
    // reactDom.render(<Demo/>,document.getElementById("root"))
  }

  function closeFormprofile() {
    document.getElementById("myprofile").style.display = "none";
  }

  function closeForm1() {
    document.getElementById("sub").style.display = "none";
  }

function goToprofile(){
  //console.log("empid   ....",empId)
  console.log("deleted dates array ",deleteddates)
  document.getElementById("myprofile").style.display = "block";
}


const [date , setDate] = useState(new Date()) 
const onChangeDate = date => {
  setDate(date);
  console.log("ALL DATESSSS ", getDaysArray(date[0], date[1]))
  datesArray = getDaysArray(date[0], date[1])
  var newdate = date.toString()
  var tempDatesArray=[]
  var arr1 = newdate.split(' ');
  for (let i = 0; i < datesArray.length; i++) {
    console.log("STRING CONVERSION",createRegularDateFormat(datesArray[i]))
   // console.log("STRING CONVERSION",createRegularDateFormat(datesArray[i],'-'))
    tempDatesArray.push([ createRegularDateFormat(datesArray[i])])
  }
  datesArray=tempDatesArray
}


// function createRegularDateFormat(t, s) {
//   let a = [{ year: 'numeric' }, { month: 'numeric' }, { day: 'numeric' }];
//   function format(m) {
//     let f = new Intl.DateTimeFormat('en', m);
//     return f.format(t);
//   }
//   return a.map(format).join(s);
// }


  const today1 = new Date()
  const tomorrow = new Date(today1)
  tomorrow.setDate(tomorrow.getDate() + 1)




  function init() {
    document.getElementById("subinheader").disabled = meal_subscribed
  }


  function goToTable() {

    MealDetails.getSelectedDates(empId).then(Response=>{
      console.log("Fetching the selected mealdates",Response.status);
      if(Response.status==200){
        console.log(Response.data,'from api');
        prevoiusdatesforcancel =Response.data;
        
        setSelectedMealDatesHide('block')
      
        for(var eachDay=0;eachDay<prevoiusdatesforcancel.length;eachDay++){
          if(!prevoiusdatesforcancel[eachDay][1]){
            prevoiusdatesforcancel[eachDay][1]='veg'
          }else{
            prevoiusdatesforcancel[eachDay][1]='nonveg'
          }
        }

        
    console.log(prevoiusdatesforcancel,'///../',datesArray)
    selectedDatesList=prevoiusdatesforcancel
    var currentSelectedDatesList=datesArray
    for(var previouslySelectedDate=0;previouslySelectedDate<selectedDatesList.length;previouslySelectedDate++){
      for(var currentSelectedDate=0;currentSelectedDate<currentSelectedDatesList.length;currentSelectedDate++){
       console.log(selectedDatesList[previouslySelectedDate][0]+"][][]["+currentSelectedDatesList[currentSelectedDate][0])
          if(selectedDatesList[previouslySelectedDate][0].includes(currentSelectedDatesList[currentSelectedDate][0])){
              if(currentSelectedDatesList[currentSelectedDate][1]!=undefined){
                currentSelectedDatesList[currentSelectedDate][1]=selectedDatesList[previouslySelectedDate][1]
              }else{
                currentSelectedDatesList[currentSelectedDate].push(selectedDatesList[previouslySelectedDate][1])
              }
          }
      }
  }
    
   
console.log(currentSelectedDatesList)

    
    document.getElementById('mealsTable').style.display = 'block'
    document.getElementById('selectedMealDates').style.display = 'none'
    document.getElementById('btn2').style.display = 'none'
    if (subnv == true) {
      console.log("entering into gototable and non veg ")
      document.getElementById('mealsTable').style.display = 'block';
      document.getElementById('btn1').style.display = 'block';
      setDates(currentSelectedDatesList)
      //console.log("type of dates ...",typeof datesArray)
    }

    else if (subveg == true) {
      console.log("entering into gototable and veg section ")
      document.getElementById('mealsTableveg').style.display = 'block';
      document.getElementById('mealsTable').style.display = 'none';
      document.getElementById('btn1').style.display = 'block';
      setDates(currentSelectedDatesList)
    }
    else {
      alert("Please subscribe! ")
    }
    document.getElementById('btn1').style.display = 'block';

      setDates(currentSelectedDatesList)
      console.log(selectedDatesList,'...',datesArray)
      }
    });

  }


function cancelMeal(e){
  console.log("this is in cancel meal")
  MealDetails.getSelectedDates().then(Response=>{
    console.log("Fetching the selected mealdates",Response.data);
    if(Response.status==200){
      console.log(Response.data,'from api');
      prevoiusdatesforcancel =Response.data;
      console.log(prevoiusdatesforcancel)
      document.getElementById('btn2').style.display='block';
      document.getElementById('btn1').style.display='none';
      document.getElementById('mealsTable').style.display='none'
      document.getElementById('selectedMealDates').style.display='block'
      document.getElementById('mealsTable').style.display='none'
      setSelectedMealDatesHide('block')
    
      for(var eachDay=0;eachDay<prevoiusdatesforcancel.length;eachDay++){
        if(!prevoiusdatesforcancel[eachDay][1]){
          prevoiusdatesforcancel[eachDay][1]='veg'
        }else{
          prevoiusdatesforcancel[eachDay][1]='nonveg'
        }
      }

      doReload();
    }
  }).catch(err=>console.log("Caught error ",err)).finally()
  //meal_date,meal_type

  
}


function submitDetails(e){
    if(datesArray.length == datespulsmealtype.length){
    MealDetails.submitMealDetails(datespulsmealtype,empId).then(Response=>{
      console.log("Response code for updating the mealdates ",Response.status)
    }).catch(err=>console.log("Caught err ",err))
    toast.success(
       'submission successful',
       {autoClose:2000}
       )
  }
  else{
    alert("please select meal type")
  }
  
  }
  

function updateDetails(){
  //  for(var i =0; i< deleteddates.length;i++){
  //    selectedDatesList[i] = deleteddates[i]
  //  }
   console.log("delete dates",deleteddates)
   console.log("selectedDatesList",prevoiusdatesforcancel)
  
    
  MealDetails.updateMealDetails(deleteddates,empId).then(Response=>{
    console.log("Response code for updating the mealdates ",Response.status)
    toast.success(
      "Meal  updated  successfully",
      {
        autoClose: 2000,
        position: toast.POSITION.TOP_CENTER
      }
    )
  }).catch(err=>console.log("Caught err ",err))
}


function cancelSingleMeal(e){
  console.log("onclickkkkk",e.target.parentNode.id)
  document.getElementById(e.target.id)
  console.log(e.target.parentNode.id)
  var a =e.target.parentNode.id
  var getdate = a.slice(0,10)
  console.log(getdate)
  var canceledmealtype = a.slice(11,)
  console.log(deleteddates)
  if(!deleteddates.includes([getdate,canceledmealtype])){
    deleteddates.push([getdate,canceledmealtype])
  }
  console.log(deleteddates)

  var index =-1

  for (var i=0;i<prevoiusdatesforcancel.length;i=i+1){
    
    if(prevoiusdatesforcancel[i][0].includes(getdate)){
      index=i;
      console.log(prevoiusdatesforcancel[i][0],getdate)
      break
    }
    index=-1
  }
   // var index = dates2.indexOf(prevoiusdatesforcancel)

    prevoiusdatesforcancel.splice(index,1)

 // var i = e.target.parentNode.parentNode.parentNode.rowIndex;
  
  doReload();
  }

  function closeTable() {
    document.getElementById('mealsTable').style.display = 'none'
    document.getElementById('selectedMealDates').style.display = 'none'
    document.getElementById('btn2').style.display = 'none';
    document.getElementById('btn1').style.display = 'none';
  }


  function empHistory(start, end) {
    MealDetails.getMealDates(start, end).then(Response => {
      console.log("status code ", Response.data)
      empHistData = Response.data;
      console.log(empHistData)
    }).catch(err => {
      console.log("Something went wrong in empHist")
    })

  }


  return (
    <>
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="StyleSheet.css" rel="stylesheet" type="text/css" media="only screen" />
        <link href="MobileStyleSheet.css" rel="stylesheet" type="text/css" media="only screen and (max-device-width: 480px) , only screen and (-webkit-min-device-pixel-ratio: 2) , screen and (-webkit-device-pixel-ratio:1.5)" />
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
        <script src="//code.jquery.com/jquery-1.11.1.min.js" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <div class="panel panel-default work-progress-table">
          {/* Default panel contents */}
          <div class="panel-heading" style={{ textAlign: "center", fontSize: "30px", height: '10%' }}>MEAL PLANNER

            <div>
            <button onClick={goToprofile} class="btn btn-primary pull-right " style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-user"> Profile</i></button>
            <button onClick={cancelMeal} id="caninheader" class="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-envelope">  Cancel Meal</i></button>
            <button onClick={goToNotify} class="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-bell">  Notifications</i></button>
            <button onClick={goToEmphist} class="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-history">  History</i></button>
            <button onClick={goToSubs} id="subinheader" class="btn btn-primary pull-right" style={{marginLeft:'3px',marginRight:"3px"}} ><i class="fa fa-envelope">  Subscribe..</i></button>

      

             
            </div>
          </div>


<div class="form-popup pull-right" id="myprofile" style={{ position: "fixed", top: "18%", left: "90%", marginLeft: "-30px" }}>
                <form class="form-container" style={{ textAlign: "left" }}>
                  <p>Welcome {empId} </p>
                  <a onClick={goToStart} class="btn btn-primary pull-right " style={{ marginTop: "-8px", marginRight: "0.8%" }} ><i class="fa fa-sign-out"> Signout</i></a>
                  <button type="button" class="btn btn-primary" onClick={closeFormprofile}><i class="fa fa-close"> Close </i></button>
                </form>
              </div>
          <div class="form-popup" id="sub" style={{ position: "fixed", top: "18%", left: "90%", marginLeft: "-300px" }}>
            <form class="form-container" style={{ width: "400px", textAlign: "left", backgroundColor: "#f0f5fc" }} >
              <p>The minimum meal price for vegetarian is Rs.800/-</p>
              <p>The minimum meal price for non-vegetarian is Rs.1400/-</p>
              <p>Please select the meal type : </p>
              <input type="checkbox" id="veg" value="veg" onChange={subscribed} />
              <label>veg</label>
              <br></br>
              <input type="checkbox" id="nonveg" value="nonveg" onChange={subscribed} />
              <label>nonveg</label>
              <br />
              <p><strong>NOTE:</strong></p>
              <p>The meal price will be deducted from your account according to the subscription chosen whether you take the meals or not.
                After the subscription amount is exhausted you need to pay for the meal .
              </p>
              <p>
                *This subscription is valid for 1 year
              </p>

              <button type="button" id="proceedtosub" class="btn btn-primary" onClick={finalSubsciption}>Proceed to subscribe</button>
              <button type="button" class="btn btn-primary" onClick={closeForm1}>Close</button>
            </form>
          </div>

          <div class="form-popup" id="myFormNotif" style={{ position: "fixed", top: "18%", left: "90%", marginLeft: "-300px" }}>
            <form class="form-container" style={{ textAlign: "left" }}>
              <h4>Employee Notifications</h4>
              <p>Meal subscribed, but not taken on aug 18 2021</p>
              <p>Meal subscribed, but not taken on aug 18 2021</p>
              <p>Meal subscribed, but not taken on aug 18 2021</p>
              <button type="button" class="btn btn-primary" onClick={closeFormNotif}>Close</button>
            </form>
          </div>
          <div style={{ marginLeft: "450px", marginRight: "auto" }}>
          </div>
          <div>
            <div>

            
            <p style={{ textAlign: "center", marginTop: "20px" }}>Please select date range from the calendar : </p><br/>
            </div>
            <div style={{
              alignItems: "center", justifyContent: "center", display: "flex",
              flexDirection: "column", marginTop: "-15px"
            }}>
            
            <div style={{ marginLeft: "100px", marginRight: "100px" }} >
              <Calendar selectRange onChange={onChangeDate} value={date} minDate={tomorrow} id="demo1" />
              {console.log(date)}
              {/* {date.toString()}   */}
            </div>
            <div>
            <button onClick={closeTable} class="btn btn-primary pull-right " style={{ marginLeft: "10px", marginTop: "5px" }} >Close</button>
            <button onClick={goToTable} class="btn btn-primary pull-right " style={{ marginLeft: "1px", marginTop: "5px" }} >Select Dates</button>
 
            </div>

         
          <div>
        
          
          <table class="table" id="mealsTable" style={{  marginLeft: "1%", display: TABLE_HIDE }} >
            <thead>
              <tr >
                <th style={{ marginLeft: "100px" }}>Date</th>
                {/* <th>Day</th> */}
                <th>Veg</th>
                <th>Non-Veg</th>
                <th>Cancel</th>
              </tr>
            </thead>
            {}
            <tbody>
              {
                dates2.map(eachDay =>
                  <tr >
                    <th style={{ padding: "10px 20px" }} scope="row" value={eachDay[0]}><p id="datesFromCheckBox">{eachDay[0]}</p></th>
                    <th style={{ padding: "10px 50px" }}>
                      {/* id={eachday} */}
                      <input type="checkbox" id={eachDay + 'veg'} onChange={getDetails} checked={eachDay[1]==undefined?false:(eachDay[1].includes('nonveg')?false:true)} />

                    </th>
                    <th style={{ padding: "10px 50px" }}>

                      <input type="checkbox" id={eachDay + 'nonveg'} onChange={getDetails} checked={eachDay[1]==undefined?false:(eachDay[1].includes('nonveg')?true:false)} />

                    </th>
                    <th>
                      <span onClick={goToDel} id={eachDay + "delete"}><i class="fa fa-trash" style={{ fontSize: "14px", color: "black" }} ></i></span>
                    </th>
                  </tr>)
              }
            </tbody>
          </table>


          <table class="table" id="selectedMealDates" style={{  marginLeft: "1%", display: SELECTED_MEAL_DATES_HIDE }} >
            <thead>
              <tr >
                <th style={{ marginLeft: "100px" }}>Date</th>
                {/* <th>Day</th> */}
                <th>Veg</th>
                <th>Non-Veg</th>
                <th>Cancel Meal</th>
              </tr>
            </thead>
            {console.log(prevoiusdatesforcancel.length, "in html")}
            <tbody>
              {

prevoiusdatesforcancel.map(eachDay =>
                  <tr >
                    <th style={{ padding: "10px 20px" }} scope="row" value={eachDay[0]}><p id="datesFromCheckBox">{eachDay[0].slice(0,10)}</p></th>
                    <th style={{ padding: "10px 50px" }}>
                      {/* id={eachday} */}
                      <input type="checkbox" id={eachDay + 'veg'} onChange={getDetails} checked={(eachDay[1]) == 'veg'} />

                    </th>
                    <th style={{ padding: "10px 50px" }}>

                      <input type="checkbox" id={eachDay + 'nonveg'} onChange={getDetails} checked={(eachDay[1]) == 'nonveg'} />

                    </th>
                    <th>
                      <span onClick={cancelSingleMeal} id={eachDay}><i class="fa fa-trash" style={{ fontSize: "14px", color: "black" }} ></i></span>
                    </th>
                  </tr>)
              }
            </tbody>
          </table>


          <br></br>
          <table class="table" id="mealsTableveg" style={{ marginLeft: "1%", display: TABLE_HIDE }} >
            <thead>
              <tr >
                <th style={{ marginLeft: "100px" }}>Date</th>
                {/* <th>Day</th> */}
                {/* <th>Veg</th>
        <th>Non-Veg</th> */}
                <th>Cancel</th>
              </tr>
            </thead>

            <tbody>
              {
                dates2.map(eachDay =>
                  <tr >
                    <th style={{ padding: "10px 20px" }} scope="row" value={eachDay}><p id="datesFromCheckBox">{eachDay}</p></th>
                    {/* <th style={{ padding: "10px 50px"}}>
             
              <input type="checkbox" id={eachDay+'veg'} onChange={getDetails} />
              
            </th>
            <th style={{ padding: "10px 50px"}}>
            
              <input type="checkbox" id={eachDay+'nonveg'} onChange={getDetails} />
              
            </th> */}
                    <th>
                      <span onClick={goToDel} id={eachDay + "delete"}><i class="fa fa-trash" style={{ fontSize: "14px", color: "black" }} ></i></span>
                    </th>
                  </tr>)
              }
            </tbody>
          </table>
          <button id="btn1" class="btn btn-primary" onClick={submitDetails} style={{ marginLeft: "48%", marginTop: "-40px", display: btn_hide }} >Submit</button>
          <button id="btn2" class="btn btn-primary" onClick={updateDetails} style={{ marginLeft: "48%", marginTop: "-40px", display: btn_hide }} >Update</button>
          </div>
          </div>
        </div>
      </div>
      </div>
    </>

  );
}
