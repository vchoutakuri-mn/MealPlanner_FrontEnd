import React, {useReducer, useState} from 'react'
import {DateRangeInput} from '@datepicker-react/styled'
import './css/App.css'
import { DownloadError } from './SendNotificationConfirm';
import EmployeeMealDetails from './EmployeeMealDetails';
import Footer from './footer'

var firstTime=true;
var DateArray=[]
var TotalDates=[]
var TABLEHIDE='none'
//Convert from array to object
let DAYLIST=[]
let resetStartDate=false;
let resetEndDate=false
let HOLIDAYS=['2021-09-08']
var REPORTDETAILS=[]
var data=[]
let startPage=1;
let endPage=10;

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

export default function Report () {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [doReset,startDoingReset]=useState([])
  const [_, doResetDates] = useReducer((x) => x + 1, 0);
  let [rowsPerPage,setRowsPerPage]=useState('');
  const [openDownloadErrorDialog,setOpenDownloadErrorDialog]=useState(false)


    function createRegularDateFormat(t, s) {
      let a = [{month: 'numeric'},{day: 'numeric'},  {year: 'numeric'}];
      function format(m) {
         let f = new Intl.DateTimeFormat('en', m);
         return f.format(t);
      }
      return a.map(format).join(s);
   }


  function start(startDate){
    
    let date = createRegularDateFormat(startDate, '/');
      let dateObj=startDate
      if(date!=null){
      if(DateArray[0]==undefined ){
        DateArray.push(date)
      } else{
        DateArray[0]=date
      }
      showTableData(DateArray)
      }
      
    return startDate
  }



  function end(endDate){
    //console.log("end date selected")
    let date = createRegularDateFormat(endDate, '/');
      if(date!=null){
     
      if(DateArray[1]==undefined ){
              DateArray.push(date)
            } else{
              DateArray[1]=date
            }
      //console.log('s date',date)
      showTableData(DateArray)
      }
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
      
      var DAYS=DAYLIST.map(day=>day.toString().split(' ')[0])
      //console.log("=====>"+DAYLIST)
      DAYLIST=DAYLIST.map((v)=>
        v.toISOString().slice(0,10))
      
      //console.log("/..",DAYLIST)
      data=[]
      let veg=0
      let nonVeg=veg
      for (let meals = 0; meals< DAYS.length-1;meals++){
          veg=Math.floor(Math.random() * 100)
          nonVeg=Math.floor(Math.random() * 100)
  
          if('Sat'==DAYS[meals] ||'Sun'==DAYS[meals] || HOLIDAYS.find(day => day == DAYLIST[meals+1])!=undefined){
            continue
          }
        data.push([(DAYLIST[meals+1]),DAYS[meals],veg,nonVeg,(nonVeg+veg)])
      }
      TABLEHIDE='block'
      console.log('basic functions')
      if(firstTime==true){
      console.log('basic functions if block')
        if(data.length!=0){
          if(data.length<=10){
            rowsPerPage=data.length
          }else{
            rowsPerPage=10
          }
          REPORTDETAILS=data.slice(0,rowsPerPage)
          console.log(REPORTDETAILS.length)
          startPage=1;
          endPage=rowsPerPage;
        }
    }else{
      console.log('basic functions else block')
    }
    }
  }

  function reset(){
    REPORTDETAILS=[]
    state.startDate=''
    state.endDate=''
    doResetDates();
  }

function selectRowsPerPage(){
  firstTime=false
  
  if(data.length!=0){
    if(10!=10){
      rowsPerPage=10
      console.log(data.length,rowsPerPage,'dv')
    }else{
      rowsPerPage=document.getElementById("sortBy").value
    }
    REPORTDETAILS=data.slice(-data.length,rowsPerPage-data.length)
    console.log(REPORTDETAILS,'complete date..',data)
    startPage=1;
    endPage=10; 
  }
  console.log(rowsPerPage,'/././.')
  doResetDates()
 
}
function setPaging(totalRows){
  if(totalRows<=10){
    rowsPerPage=totalRows
  }else{
    rowsPerPage=10
  }
  startPage=1
  endPage=10
}

  function search() {
    // let searchData = document.getElementById('searchData').value
    

}


function backward(){
  console.log('backword')
}



function previousPage(){
console.log('previous page')
}

function nextPage(){
  let presentRowsPerPage=rowsPerPage
  if(data.length!=0){
    if(data.length<=endPage+10){
      rowsPerPage=data.length-endPage
    }else{
      rowsPerPage=10
    }
  
  REPORTDETAILS=data.slice(presentRowsPerPage-data.length,presentRowsPerPage+rowsPerPage-data.length)
    console.log(REPORTDETAILS.length+"./",presentRowsPerPage-data.length,presentRowsPerPage+rowsPerPage-data.length)
    startPage=endPage;
    endPage=rowsPerPage;
  }
  

console.log('next page')
doResetDates();
}

function forward(){
  console.log('next page.next page')
}
var number=0;
function sno(){
  number=number+1
  return number
}
//create CSV file data in an array

 
function closeDownloadError(){
  setOpenDownloadErrorDialog(false)
}
  return (
      <>
      {console.log('html is loading',REPORTDETAILS.length)}
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div id='reportPage'>
   
      <br/>
      <div style={{float:'left',marginTop:'5px'}}>
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
          </div>
    <div >
    <div >

    <table class="table" id="mealsTable"  >
    <thead>
      <tr>
        <th>Date</th>
        <th>Day</th>
        <th>Vegetarian</th>
        <th>Non-Vegetarian</th>
        <th>Total number of meals</th>
      </tr>
    </thead> 
        <tbody style={{height:"300px"}}>{console.log(REPORTDETAILS.length,'last lins')}
                {
                  REPORTDETAILS.map(
                    eachDay=>
                <tr>
              
                    <th scope="row">{eachDay[0]}</th>
                    <td>{eachDay[1]}</td>
                    <td>{eachDay[2]}</td>
                    <td>{eachDay[3]}</td>
                    <td>{eachDay[4]}</td>
                    <td><span class="label label-info">{eachDay[5]}</span></td>
                </tr>
                    )
                }
            </tbody>
  </table>
  </div>
  <hr/>
  <Footer selectRowsPerPage={selectRowsPerPage} rowsPerPage={rowsPerPage} startPage={startPage} data={data} backward={backward} previousPage={previousPage} nextPage={nextPage} forward={forward}/>
          </div>
        {/* <DownloadError open={openDownloadErrorDialog} closeWindow={closeDownloadError} /> */}
    </>
  )
}
