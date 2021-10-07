import React, { useReducer, useState } from 'react'
import { DateRangeInput } from '@datepicker-react/styled'
import '../Vender/css/App.css'
import { DownloadConfirm, DownloadError, InvalidUser } from '../Vender/SendNotificationConfirm';
import reactDom from "react-dom";
import Footer from './footer'

import MealDetails from './data/MealDetails';
import ForbiddenError from '../HomeFolder/ErrorHandler/ForbiddenError';
var firstTime = true;
var DateArray = []
var TotalDates = []
var TABLEHIDE = 'none'
//Convert from array to object
let DAYLIST = []
let resetStartDate = false;
let resetEndDate = false
let HOLIDAYS = ['2021-09-08']
var REPORTDETAILS = []
var data = []
let startPage = 1;
let endPage = 10;
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
      return { ...state, focusedInput: action.payload }
    case 'dateChange':
      return action.payload
    default:
      throw new Error()
  }
}

export default function EmployeeDesils(props) {
  const [ downloadReport, closeDownloadReport ] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [reload, doReload] = useState(false)
  const [_, doResetDates] = useReducer((x) => x + 1, 0);
  let [rowsPerPage, setRowsPerPage] = useState('');
  const [openDownloadErrorDialog, setOpenDownloadErrorDialog] = useState(false)
  let [START_DATE, setStartDate] = useState('');
  let [END_DATE, setEndDate] = useState('');
  let [data, setDate] = useState([]);
  let [sessionTimeOut, setSessionTimeOut] = useState(false)
  const [downloadError, raiseDownloadError] = useState(false)
  let [searchBy,setSearchBy]=useState("Employee id")
  const [pageNo,setPageNo]= useState(1)
  const [pageSIze,setPageSIze]=useState(10)
  let [Users,setUsers]=useState([])



  function createRegularDateFormat(t, s) {
    let a = [{ year: 'numeric' }, { month: 'numeric' }, { day: 'numeric' }];
    function format(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }


  function start(startDate) {

    let date = createRegularDateFormat(startDate, '-');
    START_DATE = createRegularDateFormat(startDate, '-');

    fetchData(START_DATE, START_DATE + 1,pageNo,pageSIze)
    let dateObj = startDate
    // if(date!=null){
    // if(DateArray[0]==undefined ){
    //   DateArray.push(date)
    // } else{
    //   DateArray[0]=date
    // }
    // showTableData(DateArray)
    // }

    return startDate
  }

  function download() {
    closeDownloadReport(true)

  }
  function fetchData(start, end,pageNo,pageSIze) {
    MealDetails.getMealDates(start, end,pageNo,pageSIze).then(Response => {
      console.log("status code ", Response.data)
      REPORTDETAILS = Response.data;
      Users= Response.data
      console.log("Something ",Users)
    }).catch(err => {
      console.log("Something went wrong",err.Response)
      //setSessionTimeOut(true)
     // reactDom.render(<ForbiddenError/>,document.getElementById("root"))
    })

  }

  function end(endDate) {
    ////console.log("end date selected")
    let date = createRegularDateFormat(endDate, '-');
    END_DATE = createRegularDateFormat(endDate, '-');
    fetchData(START_DATE, END_DATE,pageNo,pageSIze)

    // if(date!=null){

    // if(DateArray[1]==undefined ){
    //         DateArray.push(date)
    //       } else{
    //         DateArray[1]=date
    //       }
    // ////console.log('s date',date)
    // showTableData(DateArray)
    // }
    return endDate
  }

  var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };


  function showTableData(DateArray) {
    let start = -1
    let end = start
    if (DateArray.length != undefined) {
      if (DateArray.length == 1) {
        start = 0
        end = start
      } else if (DateArray.length == 2) {
        start = 0
        end = start + 1
      }
      DAYLIST = getDaysArray(new Date(DateArray[start]), new Date(DateArray[end]))

      var DAYS = DAYLIST.map(day => day.toString().split(' ')[0])
      ////console.log("=====>"+DAYLIST)
      DAYLIST = DAYLIST.map((v) =>
        v.toISOString().slice(0, 10))

      ////console.log("/..",DAYLIST)
      data = []
      let veg = 0
      let nonVeg = veg
      for (let meals = 0; meals < DAYS.length - 1; meals++) {
        veg = Math.floor(Math.random() * 100)
        nonVeg = Math.floor(Math.random() * 100)

        if ('Sat' == DAYS[meals] || 'Sun' == DAYS[meals] || HOLIDAYS.find(day => day == DAYLIST[meals + 1]) != undefined) {
          continue
        }
        data.push([(DAYLIST[meals + 1]), DAYS[meals], veg, nonVeg, (nonVeg + veg)])
      }
      TABLEHIDE = 'block'

      if (firstTime == true) {

        if (data.length != 0) {
          if (data.length <= 10) {
            rowsPerPage = data.length
          } else {
            rowsPerPage = 10
          }
          //REPORTDETAILS=data.slice(0,rowsPerPage)

          startPage = 1;
          endPage = rowsPerPage;
        }
      } else {
        //console.log('basic functions else block')
      }
    }
  }

  function reset() {
    REPORTDETAILS = []
    state.startDate = ''
    state.endDate = ''
    doResetDates();
  }

  function selectRowsPerPage() {
    firstTime = false

    if (data.length != 0) {
      if (10 != 10) {
        rowsPerPage = 10
      } else {
        rowsPerPage = document.getElementById("sortBy").value
      }
      REPORTDETAILS = data.slice(-data.length, rowsPerPage - data.length)
      startPage = 1;
      endPage = 10;
    }
    ////console.log(rowsPerPage,'/././.')
    doResetDates()

  }
  function setPaging(totalRows) {
    if (totalRows <= 10) {
      rowsPerPage = totalRows
    } else {
      rowsPerPage = 10
    }
    startPage = 1
    endPage = 10
  }

  function search() {
    let searchData = document.getElementById('searchData').value
    searchBy=document.getElementById('searchBy').value
    if(searchData==''||searchData==undefined){
      REPORTDETAILS=Users
        doResetDates()
        return;
    }
    console.log("Searching...")
    REPORTDETAILS=[]
    switch(searchBy){
        case "Employee ID":
          console.error("Searching...Employee with ID",Users)
            for(let userNumber=0;userNumber<Users.length;userNumber++){
                console.log("In employee",searchData,Users[userNumber][0])
                if(searchData!='' && String(Users[userNumber][0]).includes(searchData)){
                    console.log('ds c')
                    REPORTDETAILS.push(Users[userNumber])
                }
            }
            console.log("In " ,Users)
            break;
        case "Employee name":
          console.log("Searching...Employee with name")
            for(let userNumber=0;userNumber<Users.length;userNumber++){
                if(Users[userNumber][1].toUpperCase().includes(searchData.toUpperCase())){
                  REPORTDETAILS.push(Users[userNumber])
                }
            }
            break;
        case "Employee email":
            for(let userNumber=0;userNumber<Users.length;userNumber++){
                if(Users[userNumber][2].toUpperCase().includes(searchData.toUpperCase())){
                  REPORTDETAILS.push(Users[userNumber])
                }
            }
            break;

            
        default:
            console.log("In default")
            REPORTDETAILS=Users
            break;
    }
   
    doResetDates()
    
}



  function backward() {
    console.log('backword')
  }



  function previousPage() {
    console.log('previous page')
  }

  function nextPage() {
    let presentRowsPerPage = rowsPerPage
    if (data.length != 0) {
      if (data.length <= endPage + 10) {
        rowsPerPage = data.length - endPage
      } else {
        rowsPerPage = 10
      }

      REPORTDETAILS = data.slice(presentRowsPerPage - data.length, presentRowsPerPage + rowsPerPage - data.length)
      //console.log(REPORTDETAILS.length + "./", presentRowsPerPage - data.length, presentRowsPerPage + rowsPerPage - data.length)
      startPage = endPage;
      endPage = rowsPerPage;
    }


    console.log('next page')
    doResetDates();
  }

  function forward() {
    console.log('next page.next page')
  }
  var number = 0;
  function sno() {
    number = number + 1
    return number
  }
  //create CSV file data in an array


  function closeDownloadError() {
    setOpenDownloadErrorDialog(false)
  }
  function closeDownload(){
    closeDownloadReport(false)
  }

  function selectSearchType(e){

  }
  return (
    <>
      {console.log('html is loading', REPORTDETAILS)}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div id='reportPage'>

        <br />
        <div style={{ float: 'left', marginTop: '5px' }}>
          <DateRangeInput class='dateRangeInput'
            onDatesChange={(data) => {
              console.log("on Date change")
              fetchData(START_DATE, END_DATE,pageNo,pageSIze)
              dispatch({ type: 'dateChange', payload: data })
            }}
            onFocusChange={focusedInput => dispatch({ type: 'focusChange', payload: focusedInput })}
            startDate={start(state.startDate)} // Date or null
            endDate={end(state.endDate)} // Date or null
            focusedInput={state.focusedInput} // START_DATE, END_DATE or null
          />
        </div>
        <button class="btn btn-primary pull-left" style={{ margin: "5px", marginTop:"10px" }} id="home" data-title="Home" onClick={() => { doReload(!reload) }}><span class="fa fa-file" ></span> Get Details</button>
        <button class="btn btn-primary pull-left" style={{ margin: "5px", marginTop:"10px" }} id="home" data-title="Home" onClick={reset}><span class="fa fa-refresh" ></span> Reset</button>


        <button type="submit" onClick={download} class="btn btn-primary pull-right" style={{ marginLeft: '5px', height: "30px", marginTop: '10px' }} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-download"></i> Download Report</button>
             
             <button type="submit" onClick={search} class="btn btn-primary pull-right" style={{marginLeft:'5px' ,height:"30px", marginTop:'10px'}} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-search"></i></button>
             <select name="cars" id="searchBy" onChange={search} class="btn btn-primary pull-right" style={{ float: 'left', marginTop: '10px', marginLeft: '5px' }} onClick={selectSearchType}>
                               
                                <option value="Employee ID">EmployeeID</option>
                                <option value="Employee name">Employee name</option>
                                <option value="Employee email">Employee email</option>
                              
                            </select>
                            <input type="text" class="pull-right"id="searchData" style={{float:'left' , marginTop:'13px'}} name="search" onKeyUp={search}/>

      </div>
      <br />
      <br />
      <div class="pull-right">
      </div>
      <div >
        <div >

          <table class="table" id="mealsTable"  >
            <thead>
              <tr>
                <th>Employee Id</th>
               
                <th>Employee Name</th>
                <th>Email</th>
                <th>Total number of meals</th>
                <th>Total  money</th>
              </tr>
            </thead>
            <DownloadConfirm open={downloadReport} error={REPORTDETAILS.length} closeWindow={closeDownload} report={REPORTDETAILS} startDate={START_DATE} endDate={END_DATE} />
            <tbody style={{ height: "300px" }}>{console.log(REPORTDETAILS, 'last lins')}

              {(REPORTDETAILS.length != 0) ?
                (
                  REPORTDETAILS.map(
                    eachDay =>
                      <tr>
                        <th scope="row">{eachDay[0]}</th>

                      
                        <td>{eachDay[1]}</td>
                        <td>{eachDay[2]}</td>
                        <td>{eachDay[3]}</td>
                        <td><span class="label label-info">Rs {eachDay[4]}</span></td>
                      </tr>
                  ))
                : <>
                  <p style={{ textAlign:'center' ,marginTop:'10%'}}>No data found</p>
                </>}
            </tbody>
          </table>
        </div>
        <hr />
        <InvalidUser open={sessionTimeOut} />

        <Footer selectRowsPerPage={selectRowsPerPage} rowsPerPage={rowsPerPage} startPage={startPage} data={data} backward={backward} previousPage={previousPage} nextPage={nextPage} forward={forward} />
      </div>
      {/* <DownloadError open={openDownloadErrorDialog} closeWindow={closeDownloadError} /> */}
    </>
  )
}



