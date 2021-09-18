<tbody>
{
  
 EmployeeList.map(
   user=>
   <tr >
      <td>{Employees[user-1].id}</td>
      <td>{Employees[user-1].login}</td>
      <td>{Employees[user-1].url}</td>
 </tr>
 
)

 }
</tbody>













import React from 'react';
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
import { uncheck } from '../EmployeeMealDetails';
import {removeEmployees} from '../EmployeeMealDetails'




 const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

// function SimpleDialog(props) {
//   const classes = useStyles();
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const handleListItemClick = (value) => {
//     onClose(value);
//   };

//   return (
//     <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
//       <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
//       <List>
//         {emails.map((email) => (
//           <ListItem button onClick={() => handleListItemClick(email)} key={email}>
//             <ListItemAvatar>
//               <Avatar className={classes.avatar}>
//                 <PersonIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ListItemText primary={email} />
//           </ListItem>
//         ))}

//         <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
//           <ListItemAvatar>
//             <Avatar>
//               <AddIcon />
//             </Avatar>
//           </ListItemAvatar>
//           <ListItemText primary="Add account" />
//         </ListItem>
//       </List>
//     </Dialog>
//   );
// }

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired,
// };

// export default function SimpleDialogDemo() {
//   const [open, setOpen] = React.useState(false);
//   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (value) => {
//     setOpen(false);
//     setSelectedValue(value);
//   };

//   return (
//     <div>
//       <Typography variant="subtitle1">Selected: {selectedValue}</Typography>
//       <br />
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Open simple dialog
//       </Button>
//       <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
//     </div>
//   );
// }


//Pop window 
/**
 * 
 * @param {*} props 
 * @returns two popups :one is close popup it depends on nuumber of ID's in EmployeeList
 * when length of EmployeeList is 0 that means
 */
export default function SimpleDialog(props) {

  let { onClose, selectedValue, open, EmployeeList ,Employees} = props;

  const handleClose = (List) => {
    onClose(selectedValue);
    uncheck(List)
    removeEmployees();
    console.log("Before",EmployeeList)
  
    console.log("After",EmployeeList)
  };


  const closeWindow=()=>{
    onClose(selectedValue);
  }


  const handleListItemClick = (value) => {
    onClose(value);
  };

  
  console.log("Before if else block",EmployeeList)
 if(EmployeeList.length==0){
  console.log("After line 123 in if",EmployeeList)
  return (
    <>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
      
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
    <DialogTitle id="simple-dialog-title"> Please Select atleast one employee to send notification</DialogTitle>
        <div>
          <div>
          <button onClick={handleClose} 
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
  console.log("After line 148 in if",EmployeeList)
  return (

      <>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <Dialog onClose={closeWindow} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title"></DialogTitle>

      <div style={{marginLeft:'15px'}}>
      <table id="mytable" class="table">
             <thead>
                 <tr>
                    <th >Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                 </tr>
             </thead>
            <EmployeeData />
         </table>
         </div>
         <div>
           <div>
           <button onClick={()=>{
                    
                    handleClose(EmployeeList)
                    
                    
                    }
             
            } 
           style={{marginBottom:'5px',marginRight:'5px'}}
           class="btn btn-primary pull-right"  
            data-title="Validate" data-toggle="modal" 
            data-target="#validate" ><span class="fa fa-edit"  ></span> Send notification</button>
           </div>
         </div>
    </Dialog>
    </>
  );
}
}





