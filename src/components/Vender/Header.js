//import './css/App.css'
import NavigationBar from './NavigationBar';
import EmployeeMealDetails from './EmployeeMealDetails';
import SimpleDialog, { SaveSubmit, updateOpen } from './SendNotificationConfirm'
import  ReactDOM  from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

import {releasingEmployees ,isSelected } from './EmployeeMealDetails'
import Report  from './Report';
import Finance from '../FinanaceTeam/finance'
import MealPrice from './MealPrice';
import reactDom from 'react-dom';
import Start from '../Employee/home';

const notification=[];
let  EmployeeList=[]
let Users={};
let doOpen=false;
  export default function Header(props){

    const [open, setOpen] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);
    const [home ,setHome]=React.useState(true);
    const [saveSubmit ,saving]=React.useState(false);
    const [submitValidationEmployee,setSubmitValidationEmployee]=React.useState('block');
    const [price,setPrice]=React.useState('block');
    const [save,doSavePrice]=React.useState('none');
    const [homePage,setHomePage]=React.useState('none')
    const [veiwReport,setViewReport]=React.useState('block')
    const [isMealPriceClicked,setMealPriceClicked]=React.useState(false)
  

    const handleClickOpen = () => {
     console.log("This is in handleClickOpen ",EmployeeList)
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
    };
  
    const onSaveClose=()=>{
      saving(false)
    }

    
    const viewReport=()=>{
      {
        //
        if(isSelected()){
          saving(true)
        }
        else{
          setHomePage('block')
          document.getElementById("viewReport").style.display="none"
          document.getElementById("submitValidation").style.display="none"
          console.log("This is in viewReport")
          setHome(false);
          doSavePrice('none')
          //saving(true)
          setOpen(false)
          setPrice('none')
          setSubmitValidationEmployee('none')
          setMealPriceClicked(false)
        }
        
      }
      
    }

    const basicHomePage=()=>{
      document.getElementById("viewReport").style.display="block"
      document.getElementById("submitValidation").style.display="block"
      console.log("Going to home page")
      setHome(true);
      setPrice('block')
      doSavePrice('none')
      setHomePage('none')
      setSubmitValidationEmployee('block')
      setMealPriceClicked(false)
    }
    const submitValidation=()=>{
      console.log("This is in submit validation")
      setSubmitValidationEmployee(true);
      
    }
    const onCloseSubmitValidation=()=>{
      setSubmitValidationEmployee(false);
    }

    // const goToFinance=()=>{
    //   console.log("Going to finance page")
    //   ReactDOM.render(<Finance/>,document.getElementById('root'))
    // }
  
const setMealPrice=()=>{
  setMealPriceClicked(true)

}

const closeMealPrice=()=>{
  setMealPriceClicked(false)
}

const signout=()=>{
  console.log("Signout")
reactDom.render(<Start/>,document.getElementById("root"))
}
    return (
        <>
        <div >
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"/>
    {/*---- Include the above in your HEAD tag --------*/}

<div class="container">
    <div class="row">
            <div class="col-md-12">
                <div class="widget blank no-padding">
                
                    <div class="panel panel-default work-progress-table">
                            {/* Default panel contents */}
                        <div class="panel-heading">Meal Planer<i style={{textColor:'#f2f2f2'}}>Vender's Page &  (vendor@gmail.com)</i>
                        </div>
                        <div class="dropdown rounded">
   
                        <button 
                        class="btn btn-primary pull-right" style={{margin:"5px"}} data-title="Signout" data-toggle="modal" data-target="#ssignout"  onClick={signout}><span class="fa fa-sign-out"></span>Signout</button>

                        <button 
                        class="btn btn-primary pull-right" style={{margin:"5px",display:save}} data-title="save" data-toggle="modal" data-target="#ssignout"><span class="fa fa-save"></span>Save</button>
                        <button class="btn btn-primary pull-right" style={{margin:"5px",display:submitValidationEmployee}}  id="submitValidation" data-title="submitValidation" data-toggle="modal" onClick={handleClickOpen} data-target="#home" id="submitValidation" ><span class="fa fa-paper-plane"  ></span> Submit</button>

                        <button class="btn btn-primary pull-right" style={{margin:"5px",display:price}} id="setMealPrice" data-title="Home" data-toggle="modal"  data-target="#home" onClick={setMealPrice}><span class="fa fa-inr" ></span> Meal Price</button>
                        <button class="btn btn-primary pull-right" style={{margin:"5px" ,display:veiwReport}} id="viewReport" data-title="Validate" data-toggle="modal" data-target="#validate"  onClick={viewReport}><span class="fa fa-file"></span> View Report</button>
                        <button class="btn btn-primary pull-right" style={{margin:"5px",display:homePage}} id="home" data-title="Home" data-toggle="modal"  data-target="#home" onClick={basicHomePage}><span class="fa fa-fw fa-home" ></span> Home</button>

                          </div>
                          <div >
                         {(home)? (<EmployeeMealDetails open={open} onClose={handleClose} doSave={saveSubmit} />):<Report/>}
                         <MealPrice openMealPrice={isMealPriceClicked} closeMealPrice={closeMealPrice} veg={80} nonVeg={100}/>
                          <SaveSubmit doSave={saveSubmit} onSaveClose={onSaveClose}/>
                          </div>
                    </div>
                </div>
            </div>
			</div>
</div>
</div>
        </>
    )
}




function sendNotification(doEnable ,EmployeesList,Employees){
  if(doEnable){
    EmployeeList=EmployeesList
    Users=Employees
    console.log("In sendNotification",EmployeesList)
    //bindEmployee(EmployeesList,Employees)
    ;
  }
}

// DNOW
function releaseEmployee(){
  releasingEmployees()
}



export { sendNotification ,releaseEmployee};