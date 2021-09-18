import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { uncheck } from './EmployeeMealDetails';
import {removeEmployees} from './EmployeeMealDetails'
import {releaseEmployee} from './Header'
import Employee from './data/Employee';




 const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

//Pop window 
/**
 * 
 * @param {*} props 
 * @returns two popups :one is close popup it depends on nuumber of ID's in EmployeesList
 * when length of EmployeesList is 0 
 * And second popup is list of employees who are selected in the home page (is a confirm page)
 */
var EmployeesList=[]

export default function SimpleDialog(props) {
  const classes = useStyles();
  let { open,onClose, SelectedEmployees,Users} = props;
 
  const handleClose = () => {
    let date=new Date().toJSON().slice(0,10).replace(/-/g,'/');
    console.log("SelectedEmployees Ids those who got notification")
    var data=JSON.parse('{"date":"'+date+'", "EmployeesIDs":'+JSON.stringify([SelectedEmployees])+'}');
    console.log(data)
    onClose()
    uncheck(SelectedEmployees)
    releaseEmployee();
    
  };
  const closeWindow=()=>{
  onClose();
  }
  const handleListItemClick = (value) => {
    onClose(value);
  };
  const goBack=()=>{
    onClose()
  }
 
  //For confirmation whether the list of SelectedEmployees contains any ids or not
  
 if(SelectedEmployees.length==0 || SelectedEmployees.length==undefined){
  return (
    <>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
      
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle id="simple-dialog-title"> Please select atleast one employee to Submit</DialogTitle>
        <div>
          <div>
          <button onClick={closeWindow}
          class="btn btn-primary pull-right" 
          style={{marginBottom:'15px',marginRight:'15px'}} 
          data-title="Validate" 
          data-toggle="modal" 
          data-target="#validate" >close</button>
          </div>
        </div>
  </Dialog>
  </>
);
 }else{
  return (
      <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

<Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title"><h3 style={{textAlign: "center"}}>Confirm submission</h3></DialogTitle>
      <div style={{marginLeft:'15px'}}>
        <span style={{marginLeft:'5px'}}>You can't edit the submission</span>
      </div>
         <div>
           <br/>
           <div>
           <button onClick={handleClose} 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Validate" data-toggle="modal" 
            data-target="#validate" > Submit</button>

            <button onClick={goBack} 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Back" data-toggle="modal" 
            data-target="#validate" > Back</button>
           </div>
         </div>
    </Dialog>



    </>

  );
}
}

function bindEmployee(EmployeeList,Employeees){
  EmployeesList=EmployeeList;
  EmployeesList.sort();
  console.log("In bindEmployee",EmployeesList)
 return true;
}


function updateOpen(){
  //open=true
}

function SaveSubmit(props){
  const classes = useStyles();
  let { doSave,onSaveClose } = props;
 
  const handleClose = () => {
    onSaveClose()
    
  };
  const closeWindow=()=>{
    onSaveClose();
  }
  const handleListItemClick = (value) => {
    onSaveClose(value);
  };
  const goBack=()=>{
    onSaveClose()
  }
 
  //For confirmation whether the list of SelectedEmployees contains any ids or not
 
  return (
    <>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  
  <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={doSave}>
      <DialogTitle id="simple-dialog-title"><h3 style={{textAlign: "center"}}>Please submit validation</h3></DialogTitle>
      <div style={{marginLeft:'15px'}}>
        <span style={{marginLeft:'5px'}}>The changes you made will be lost if you won't submit</span>
      </div>
         <div>
           <br/>
           <div>
           

            <button onClick={goBack} 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Back" data-toggle="modal" 
            data-target="#validate" > Back</button>
           </div>
         </div>
    </Dialog> 
  </>
);
 
}


function DownloadError(props){
 const {open , closeWindow ,download}=props

 function goBack(){
   closeWindow()
 }
 
  return (
    <>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  
  <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title"><h3 style={{textAlign: "center"}}>Verify report</h3></DialogTitle>
      <div style={{marginLeft:'15px'}}>
        <span style={{marginLeft:'5px'}}>Please verify the report before you download  .</span>
      </div>
         <div>
           <br/>
           <div>
            <button onClick={goBack} 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Back" data-toggle="modal" 
            data-target="#validate" > Back</button>

            <button onClick={download} 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Back" data-toggle="modal" 
            data-target="#validate" > Download</button>

           </div>

         </div>
    </Dialog> 
  </>
);
}

export { bindEmployee ,updateOpen ,SaveSubmit,DownloadError}

