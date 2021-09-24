import React, { useState ,  useCallback} from 'react';
import Calendar from 'react-calendar';
import ReactDOM from 'react-dom';
import 'react-calendar/dist/Calendar.css';
import Start from './home';
import Hist from './Emp_history';
import './css/empHomecss.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Employee from './data/Employee';


toast.configure();

var TABLE_HIDE='none';
var btn_hide = 'none';
var datesArray;
var dates = []
var typeOfMeal;
var sub = false;
var enable = false;

export default function MyApp() {
  const [value, onChange] = useState(false);
  var [dates2,setDates] = useState([])

  
function goToEmphist(){
  ReactDOM.render(<Hist/>,document.getElementById("root"))
}


function goToStart(){
   ReactDOM.render(<Start/>,document.getElementById("root"))
}


function goToTable(){
  if(sub == true){
    document.getElementById('mealsTable').style.display='block';
    document.getElementById('btn1').style.display='block';
    setDates(datesArray)
    //console.log("type of dates ...",typeof datesArray)
  }
  else{
    alert("Please subscribe! ")
  }
}


function goToNotify(){
    document.getElementById("myForm").style.display = "block";
}


function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


function getDetails(e){
  // if(document.getElementById("nonveg").checked == true){
  //   document.getElementById("veg").disabled = true;
  //   console.log("checked")
  // }
  // if(document.getElementById(eachDay+"veg").checked == true){
  //   document.getElementById(eachDay+"nonveg").disabled = true;
  //   console.log("veg checked")
  // }
  // var n = e.target.id
  // var v = document.getElementById("veg")
  // var nv = document.getElementById("nonveg")
  // console.log("n",n)
  // if(v.checked){
  //     nv.disabled=true;
  //   }
  console.log(e.target.id)
  
  var date=e.target.id.slice(0,12)//sep 12 2021 veg
  console.log(date)
  var mealtype = e.target.id.slice(12,15)
  console.log(mealtype)
  //console.log(date+'nonveg'==e.target.id)
  if(e.target.id.includes('nonveg') ){
  if(e.target.checked){
    document.getElementById(date+'nonveg').disabled=false
      document.getElementById(date+'veg').disabled=true
    }else{
      document.getElementById(date+'veg').disabled=false
      document.getElementById(date+'nonveg').disabled=false
    }

  }else{
    if(e.target.checked){
      document.getElementById(date+'nonveg').disabled=true
      document.getElementById(date+'veg').disabled=false
    }else{
      document.getElementById(date+'veg').disabled=false
      document.getElementById(date+'nonveg').disabled=false

    }
  }

  }


function subscribed(e){
  //var type = document.getElementById("veg").value
  console.log("clicked veg/nonveg")
  enable = true
  console.log("enable set to true",enable)
  goToSubs();
  typeOfMeal = e.target.id
  console.log("typeOfMeal....",typeOfMeal)
  //console.log(e.target.id)
  if(e.target.id.includes('nonveg') ){
    if(e.target.checked){
      document.getElementById('nonveg').disabled=false
        document.getElementById('veg').disabled=true
      }else{
        document.getElementById('veg').disabled=false
        document.getElementById('nonveg').disabled=false
      }
  
    }else{
      if(e.target.checked){
        document.getElementById('nonveg').disabled=true
        document.getElementById('veg').disabled=false
      }else{
        document.getElementById('veg').disabled=false
        document.getElementById('nonveg').disabled=false
  
      }
    }
    
}

function finalSubsciption(){
  closeForm1();
  //alert("subscribed for "+typeOfMeal+" successfully")
  sub = true
  document.getElementById("subinheader").disabled=true;
  toast.success(
    "subscribed for "+typeOfMeal+" successfully",
     {autoClose:2000,
     position: toast.POSITION.TOP_CENTER}
     )
     
}


function check(){
  alert("Meal details submitted successfully")
  document.location.reload();
}


function submitDetails(e){
 
  //window.location.href=window.location.href
  //window.location.reload();
  //setTimeout(function(){window.location.reload();},10);
  //e.preventDefault();
  //document.location.reload();
 
    //Location.reload(true);
  
  //window.onload = check();
}


function App() {
  const [value, setValue] = useState();
  const onChange = useCallback(
    (value) => {
      setValue(value);
    },
    [setValue],
  );  
}

var getDaysArray = function(start, end) {
  for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
    //console.log("checking for days",dt.getDay())
    if(0==dt.getDay() ||6==dt.getDay())
      continue
    arr.push(new Date(dt));
  }
  return arr;
};

function goToDel(e){
  console.log("onclickkkkk")
  document.getElementById(e.target.id)
  console.log(e.target.parentNode.parentNode)
  
  var i = e.target.parentNode.parentNode.parentNode.rowIndex;
    document.getElementById("mealsTable").deleteRow(i);
  //e.target.parentNode.parentNode.parentNode.style.display="none"
  console.log("value of i",i)
  }

function goToSubs(){
  console.log("clicked on subscribe")
  console.log("checking enable",enable)
  if(Employee.checkMealSubscription()==false){
    document.getElementById("proceedtosub").disabled = true;
  }
  else{
    document.getElementById("proceedtosub").disabled = false;
  }
  document.getElementById("sub").style.display = "block";
  
  //this.handleModal();
  //reactDom.render(<Demo/>,document.getElementById("root"))
}



function closeForm1() {
  document.getElementById("sub").style.display = "none";
}


const [date , setDate] = useState(new Date()) 
const onChangeDate = date => {
  setDate(date);
  //console.log("ALL DATESSSS ",getDaysArray(date[0],date[1]))
  datesArray=getDaysArray(date[0],date[1])
  var newdate = date.toString()
  var arr1 = newdate.split(' ');
  for(let i = 0; i< datesArray.length;i++){
      //console.log("STRING CONVERSION",String(datesArray[i]).slice(4,16))
      datesArray[i] = String(datesArray[i]).slice(4,16)
  }
}


const today1 = new Date()
const tomorrow = new Date(today1)
tomorrow.setDate(tomorrow.getDate() + 1)


  return (
    <>
      <div>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link href="StyleSheet.css" rel="stylesheet" type="text/css" media="only screen" />
        <link href="MobileStyleSheet.css" rel="stylesheet" type="text/css" media="only screen and (max-device-width: 480px) , only screen and (-webkit-min-device-pixel-ratio: 2) , screen and (-webkit-device-pixel-ratio:1.5)" />
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
        <div class="panel panel-default work-progress-table">
        {/* Default panel contents */}
        <div class="panel-heading" style={{textAlign:"center", fontSize:"30px"}}>MEAL PLANNER
       <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"/>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      </div>
       
        <footer class="col-md-12 text-right">
        <button onClick={goToEmphist}  class ="btn btn-primary pull-right" style={{marginTop:"-50px",marginRight:"27%"}} ><i class="fa fa-history">  History</i></button> 
        <button onClick={goToNotify}  class ="btn btn-primary pull-right" style={{marginTop:"-50px",marginRight:"17%"}} ><i class="fa fa-bell">  Notifications</i></button>   
        <button onClick={goToSubs} id="subinheader" class ="btn btn-primary pull-right" style={{marginTop:"-50px",marginRight:"8.4%"}} ><i class="fa fa-envelope">  Subscribe</i></button>   
        <button onClick={goToStart}  class ="btn btn-primary pull-right " style={{marginTop:"-50px",marginRight:"0.8%"}} ><i class="fa fa-sign-out">  Signout</i></button> 

       {/* <div class="container">
  <button type="button" class="btn btn-primary pull-right" data-toggle="modal" onClick={goToModal}>subscribe...</button>

 
   <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">
    
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Modal Header</h4>
        </div>
        <div class="modal-body">
          <p>Some text in the modal.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  
</div> */}


        <div class="form-popup" id="sub" style={{position:"fixed",top:"13%",left:"90%",marginLeft: "-300px" }}>
        <form  class="form-container" style={{width: "400px" ,textAlign:"left", backgroundColor:"#f0f5fc"}} >
        <p>The minimum meal price for vegetarian is Rs.800/-</p>
          <p>The minimum meal price for non-vegetarian is Rs.1400/-</p>
           <p>Please select the meal type : </p>
           <input type="checkbox" id="veg" value="veg"  onChange={subscribed}/>
            <label>veg</label>
           <br></br>
           <input type="checkbox" id="nonveg" value="nonveg"  onChange={subscribed}/>
            <label>nonveg</label>
            <br/>
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

        {/* <div class="container">
   <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
    <span class="caret"></span></button>
    <ul class="dropdown-menu">
      <li><a href="#">HTML</a></li>
      <li><a href="#">CSS</a></li>
      <li><a href="#">JavaScript</a></li>
    </ul>
  </div>
</div> */}

{/* <button  data-toggle="popover" data-container="a" title="Popover Header" data-content="Some content inside the popover">Toggle popover</button> */}

  <div class="form-popup" id="myForm" style={{position:"fixed",top:"13%",left:"90%",marginLeft: "-300px" }}>
  <form  class="form-container" style={{textAlign:"left" }}>
    <h4>Employee Notifications</h4>
    <p>Meal subscribed, but not taken on aug 18 2021</p>
    <p>Meal subscribed, but not taken on aug 18 2021</p>
    <p>Meal subscribed, but not taken on aug 18 2021</p>
    <button type="button" class="btn btn-primary" onClick={closeForm}>Close</button>
  </form>
</div>
        <div style={{marginLeft:"450px" , marginRight:"auto"}}>
         </div>
          <p style={{textAlign:"center" , marginTop:"20px"}}>Please select date range from the calendar : </p>
          <div  style={{alignItems: "center", justifyContent: "center" , minHeight: "100vh" , display: "flex",
  flexDirection: "column" , marginTop:"-150px" , marginLeft:"30%"}}>
    
   <Calendar selectRange  onChange={onChangeDate} value={date}  minDate={tomorrow}  id = "demo1"/>
    {console.log(date)}  
    {/* {date.toString()}   */}
    <button onClick={goToTable}  class ="btn btn-primary pull-right " style={{marginLeft:"1px" ,marginTop:"5px"}} >Select Dates</button>
  </div>
          
  <table class="table"  id="mealsTable"  style={{  marginTop:"-120px", marginLeft:"1%", display:TABLE_HIDE}} >
    <thead>
      <tr >
        <th style={{marginLeft:"100px"}}>Date</th>
        {/* <th>Day</th> */}
        <th>Veg</th>
        <th>Non-Veg</th>
        <th>Cancel</th>
      </tr>
    </thead> 

    <tbody>
      {
        dates2.map(eachDay=>
          <tr >
            <th style={{ padding: "10px 20px"}} scope="row" value={eachDay}><p id="datesFromCheckBox">{eachDay}</p></th>
            <th style={{ padding: "10px 50px"}}>
             {/* id={eachday} */}
              <input type="checkbox" id={eachDay+'veg'} onChange={getDetails} />
              
            </th>
            <th style={{ padding: "10px 50px"}}>
            
              <input type="checkbox" id={eachDay+'nonveg'} onChange={getDetails} />
              
            </th>
            <th>
              <span onClick={goToDel} id={eachDay+"delete"}><i class="fa fa-trash" style={{fontSize:"14px",color:"black"}} ></i></span>
            </th>
          </tr>)
      }   
    </tbody>
  </table>
  <br></br>
<button id = "btn1" class="btn btn-primary" onClick={submitDetails} style={{marginLeft:"48%",marginTop:"-40px",display:btn_hide}} >Submit</button>
</footer>
</div>    
</div>

    </>
    
  );
  }


/*commented js code*/

// var datee = new Date();
// var newdate = datee.toString()
// var arr1 = newdate.split(' ');
// var onlydate = arr1[2]
// var finaldate = parseInt(onlydate)+1
// var today = datee.getDate()+1;
// arr1.splice(2, 0, finaldate);
// delete arr1[3]
// var str='';
// for (var i = 0; i < arr1.length; i++) {
//   str+=arr1[i]+" ";
// }
//arr1.filter(n => n)
//str.replace('undefined', '');

//   const [startDate, setStartDate] = useState(null);
//  const [endDate, setEndDate] = useState(null);
//  () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);
//   const onChange = (dates) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };
// }

//  function handleDateChange(date) {
//     // initial change: start by setting the startDate
//     console.log("in handle date change")
//     if (!startDate && !endDate) {
//       setStartDate(date);
//      // startDate has been set, set the end date
//     } else if (startDate && !endDate) {
//      setEndDate(date);
//     }
//     console.log("in start date"+startDate)
//     console.log(endDate)
//     // user is choosing another range => set the start date
//     // and set the endDate back to null
//     if (startDate && endDate) {
//       setStartDate(date);
//       setEndDate(null);
//     }
//  }
//function goToNotif(){
//  document.getElementById("myForm").style.display = "block";
// toast.info(
// 'Meal subscribed, but not taken on aug 18 2021',
// {autoClose:false}
// )
// toast.info(
//   'Meal subscribed, but not taken on aug 23 2021',
//   {autoClose:3000}
//   )
// toast.warn(
//   'Total of 5 subscibed meals were not taken!',
//   {autoClose:false}
//   )
//}
    // var c = document.parent.childNodes;
    //console.log("emp type",parent,c[0])
    //document.getElementById("demo").innerHTML = parent;
  //   var c = document.parent.childNodes;
  //   var txt = "";
  //   var i;
  //   for (i = 0; i < c.length; i++) {
  //     txt = txt + c[i].nodeName + "<br>";
  // }
  // console.log(txt)



//function submitDetails(){
  //document.getElementById('btn1').style.display='block';
  // var x = document.getElementById("btn");
  // if (x.style.display === "none") {
  //   x.style.display = "block";
  // } else {
  //   x.style.display = "none";
  // }
  // document.getElementById('btn').style.display='block';
  //alert("Meal details submitted successfully")
//}


// function handler(e){
//   console.log("in handler")
//   var date = new Date();
//   var tdate = date.getDate();
//   var month = date.getMonth() +1;
//   var year = date.getUTCFullYear() - 0; 
//   if(month < 10){
//     month = "0" + month 
//   }
//   if(tdate < 10){
//     tdate = "0" + tdate;
//   }
//   var maxDate = year + "-" + month + "-" + tdate;
//   dates.push(e.target.value)
//   document.getElementById("demo1").setAttribute("min", maxDate);
  //console.log(dates)
    // let object={
    //   'dates':dates,
    //   'emplpoyessId':USERID
    // }
  // submitDattes(object)
//}


  




























