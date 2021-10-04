import React, {useReducer, useState} from 'react'
import {DateRangeInput} from '@datepicker-react/styled'
import './css/empHomecss.css'
import Start from './home';
import MyApp from './Emp_home_new';
import ReactDOM from 'react-dom';
import MealDetails from './data/MealDetails';
//import EmployeeMealDetails from './EmployeeMealDetails';



var DateArray=[]
var TotalDates=[]
var TABLEHIDE='none'
//Convert from array to object
let DAYLIST=[]
let resetStartDate=false;
let resetEndDate=false
var weekdays = new Array(7);
weekdays[0] = "Saturday";
weekdays[1] = "Sunday";
weekdays[2] = "Monday";
weekdays[3] = "Tuesday";
weekdays[4] = "Wednesday";
weekdays[5] = "Thursday";
weekdays[6] = "Friday";


const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'focusChange':
      return {...state, focusedInput: action.payload}
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}

export default function Hist (props) {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [doReset,startDoingReset]=useState([])
  const [_, doResetDates] = useReducer((x) => x + 1, 0);


    function createRegularDateFormat(t, s) {
      let a = [{month: 'numeric'},{day: 'numeric'},  {year: 'numeric'}];
      function format(m) {
         let f = new Intl.DateTimeFormat('en', m);
         return f.format(t);
      }
      return a.map(format).join(s);
   }

   function createIrregularDateFormat(t, s) {
    let a = [  {year: 'numeric'},{month: 'numeric'},{day: 'numeric'}];
    function format(m) {
       let f = new Intl.DateTimeFormat('en', m);
       return f.format(t);
    }
    return a.map(format).join(s);
 }
let START='';
  function start(startDate){
    let date = createRegularDateFormat(startDate, '-');
    //console.log('date is start ',date,typeof startDate)
      let dateObj=startDate
       START=createIrregularDateFormat(startDate, '-');
      if(date!=null){
        MealDetails.getHistory(START,START+1).then(
          Response=>{
     
            DAYLIST=Response.data
          }
        ).catch(err=>{
          console.error("something went wrong ",err)
        })
      // let startDateArray=dateObj.getUTCFullYear()+'-'+ (dateObj.getUTCMonth())  +'-'+ (dateObj.getUTCDate()) 

      // if(DateArray[0]==undefined ){
      //   DateArray.push(date)
      // } else{
      //   DateArray[0]=date
      // }
      // //console.log('start date',date,DateArray)
      // showTableData(DateArray)
      }
      
    return startDate
  }



  function end(endDate){
    console.log("end date selected")
    let date = createRegularDateFormat(endDate, '-');
    let END=createIrregularDateFormat(endDate, '-');
      if(date!=null){
      // let startDateArray=dateObj.getUTCFullYear()+'-'+ (dateObj.getUTCMonth())  +'-'+ (dateObj.getUTCDate()) 
      MealDetails.getHistory(START,END+1).then(
        Response=>{
          DAYLIST=Response.data
         
        }
      ).catch(err=>{
        console.error("something went wrong ",err)
      })
      // if(DateArray[1]==undefined ){
      //         DateArray.push(date)
      //       } else{
      //         DateArray[1]=date
      //       }
      // //console.log('s date',date)
      // showTableData(DateArray)
      }
     

    //resetAllDates=false
    // if(resetStartDate=='reset'){
    //   resetStartDate='load'
    //   return;
    // }else{
      
    //   let dateObj=endDate
    //   if(dateObj!=null ){
    //     let endDateArray=dateObj.getUTCFullYear()+'-'+ (dateObj.getUTCMonth()+1)  +'-'+ (dateObj.getUTCDate()+1)
    //     if(DateArray[1]==undefined ){
    //       DateArray.push(endDateArray)
    //     } else{
    //       DateArray[1]=endDateArray
    //     } 
    //     showTableData(DateArray)
    //   }
      return endDate
    
  
     
  }

  var getDaysArray = function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};


  function showTableData(DateArray){
    let start=-1
    let end=start
    if(DateArray.length!=undefined )
    {
      if(DateArray.length==1){
        start=0
        end=start
      }else if(DateArray.length==2){
        start=0
        end=start+1
      }
      DAYLIST =getDaysArray(new Date(DateArray[start]),new Date(DateArray[end]))
      //console.log(DAYLIST)
      var DAYS=DAYLIST.map(day=>day.toString().split(' ')[0])
      DAYLIST=DAYLIST.map((v)=>v.toISOString().slice(0,10)).join(",")
      DAYLIST=DAYLIST.split(',')
      //console.log("/..",DAYLIST)
    
      var data=[]
      let veg=0
      let nonVeg=veg
      for (let meals = 0; meals< DAYS.length-1;meals++){
          veg=Math.floor(Math.random() * 100)
          nonVeg=Math.floor(Math.random() * 100)
          if('Sat'==DAYS[meals] ||'Sun'==DAYS[meals]){
            continue
          }
        data.push([DAYLIST[meals+1],DAYS[meals],veg,nonVeg,(nonVeg+veg)])
      }
      DAYLIST=data
      TABLEHIDE='block'
     // console.log("List of dates..",DAYLIST)
      
    }
  }

  function reset(){
    DAYLIST=[]
    state.startDate=''
    state.endDate=''
    doResetDates();
    
  }

  // () => {
  //   const [startDate, setStartDate] = useState(new Date());
  //   return (
  //     <DatePicker
  //       selected={startDate}
  //       onChange={(date) => setStartDate(date)}
  //       excludeDates={[new Date(), subDays(new Date(), 1)]}
  //       placeholderText="Select a date other than today or yesterday"
  //     />
  //   );
  // };
  function goToStart(){
    ReactDOM.render(<Start/>,document.getElementById("root"))
 }
 
function goToHome(){
  ReactDOM.render(<MyApp empId={localStorage.getItem('empId')}  />,document.getElementById("root"))
}
  function search(){
   
  }
  
  return (
      <>
      <div >
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"/>
    
        <div class="panel panel-default work-progress-table">
        {/* Default panel contents */}
       <div class="panel-heading" style={{textAlign:"center"}}>Meal Planer<i style={{textColor:'#f2f2f2'}}>Employee's page</i>
      </div>
       
        <footer class="col-md-12 text-right">
        <button onClick={goToStart}  class ="btn btn-primary pull-right " style={{marginTop:"-50px",marginRight:"188px"}} >Home</button>    
        <button onClick={goToHome}  class ="btn btn-primary pull-right" style={{marginTop:"-50px",marginRight:"110px"}} >Back</button> 
        
        
      <div id='reportPage' >
      <p style={{marginRight:"800px"}}>Please select start date and end date to view your history</p>
      <br/>
      <div style={{float:'left'}}>
      <DateRangeInput class='dateRangeInput' 
        
          onDatesChange={(data) =>dispatch({type: 'dateChange', payload: data})}
          onFocusChange={focusedInput => dispatch({type: 'focusChange', payload: focusedInput})}
          startDate={start(state.startDate)} // Date or null
          endDate={end(state.endDate)} // Date or null
          focusedInput={state.focusedInput} // START_DATE, END_DATE or null
          />

        
      </div>
          <button class="btn btn-primary pull-left" style={{margin:"5px"}} id="home" data-title="Home" onClick={reset}><span class="fa fa-refresh" ></span> Reset</button>
    </div>
    <br/>
    <br/>
    <div class ="pull-right">
       {/* <input type="text" id="searchData" style={{ float: 'left', marginTop: '5px' }} placeholder="Search by date" name="search" /> */}

          {/* <button type="submit" onClick={search} class="btn btn-primary pull-left" style={{ marginLeft: '5px', height: "30px", marginTop: '5px' }} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-search"></i></button> */}
          </div>
    <div >

    <table class="table" id="mealsTable"  style={{border:"1px" , paddingTop: "2px"}} >
    <thead>
      <tr>
        <th>Date</th>
        <th>Day</th>
        
        <th>Meal Status</th>
        <th>Veg/Non-veg</th>
        
      </tr>
    </thead> 
        <tbody>
                {
                  DAYLIST.map(
                    eachDay=>
                <tr>
                    <th scope="row">{eachDay[0].slice(0, 10)}</th>

                    <td>{weekdays[new Date(eachDay[0]).getDay()]}</td>
                    <td >{eachDay[1]==true?<span class="label label-success">Taken</span>:<span class="label label-danger">Skipped</span>}</td>
                    <td>{eachDay[2]==true?"veg":"non-veg"}</td>
                    
                   
                    <td><span class="label label-info">{eachDay[5]}</span></td>
                </tr>
                    )
                }
            </tbody>
  </table>
        </div>
        </footer>
        </div>
        </div>
    </>
  )
}
