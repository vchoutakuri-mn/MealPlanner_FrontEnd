import React, { useContext , useState } from "react";
import "../../App.css";
import Employee from "./data/Employee";

import reactDom  from "react-dom";
import './css/signUpFormcss.css'
import  LoginForm  from "./loginForm";
import MyApp from "./Emp_home_new";
import Start from "./home";
import Demo from "./subscribe";
import Vender from "../Vender";
import Finance from "../FinanaceTeam/finance";

var USERTYPE='employee';
export default function SignupForm(props) {
//   const { switchToSignin } = useContext(AccountContext);
    const [userType,changeUserType]=useState('employee');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [repeatPassword, setRepeatPassword] = useState('');
  
//   const [onLoginSucess,isLogined]=useState('');
//   const [name,setName]=useState('');
//   const [id,setID]=useState('');


//   function validateEmail(email) {
//       var re = /\S+@\S+\.\S+/;
//       console.log(re.test(email))
//         return re.test(email);
//   }

 
//   const submitValue = () => {
//     if(!validateEmail(email)){
//       alert("Enter valid EMail address")
//       return ;
//     }else{
//       console.log("Email is verified")
//     }
   
//       // Validate lowercase letters
//       var lowerCaseLetters = /[a-z]/g;  
//       // Validate capital letters
//       var upperCaseLetters = /[A-Z]/g;
//       // Validate numbers
//       var numbers = /[0-9]/g;
//       if(!password.match(numbers) || password.length < 8 || !password.match(upperCaseLetters) || !password.match(lowerCaseLetters)) {  
//         console.log("Password field is not strong")
//         alert("Password is too small")
//         return;
//       }
//     if(password!=repeatPassword){
//       alert("Password not matching")
//       return;
//     }
//     if(email && password){
//       isLogined(true)
//       const element=document.getElementById("root")
//       reactDom.render(<UserComponent/>,element);
//     }
//     else{
//       alert("Enter valid details...")
//     }    
// }

function goToLogin(){
  reactDom.render(<LoginForm/>,document.getElementById("root"))
}
const [showDialog,setShowDialog]=useState(false);

function setUserType(e){
  USERTYPE=e.target.value;
}

function goToHome(){
  
  var useuse = document.getElementById("userType").value;
  console.log("use use",useuse)
  var userType=USERTYPE;
  var userId=document.getElementById("userId").value;
  var userName=document.getElementById("userName").value;
  var userEMail=document.getElementById("userEmail").value;
  var userPassword = document.getElementById("password").value
  var confirmPassword = document.getElementById("confirmPassword").value
  //var mealSubscribed=document.getElementById("mealSubscribed").value;

  var mealSubscribed=false;
  
  
  
  var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    

      if( userPassword.length >= 8  &&
       userPassword.match(lowerCaseLetters) != null && 
     userPassword.match(upperCaseLetters) !=null && 
   userPassword.match(numbers) != null  &&
     userPassword==confirmPassword
      )
    
    
     var token=''
     //console.log("New User details")
     //console.log(userType,userId,userPassword,userName,userEMail,mealSubscribed)
     Employee.createAccount(userType,userId,userPassword,userName,userEMail,mealSubscribed).then(Response=>{
       console.log(Response.status)
       
     
     //reactDom.render(<MyApp />,document.getElementById("root"))
      if(Response.status==200 && Response.data!=''){
                  //go to next page
                  //console.log("response success")
                  console.log("usertype",useuse)
              
                   token=Response.data;
                  console.log('Token generated')
                  console.log(token)
              }else{
                console.log('details wrong')
                  //Reload component or input fields make empty
              }
          }).catch(err=>console.log('Something went wrong'))
    if(useuse=="Employee"){
      reactDom.render(<MyApp />,document.getElementById("root"))
  }else if(useuse=="vendor"){
      reactDom.render(<Vender token={token}/>,document.getElementById("root"))
  }else{
    
      reactDom.render(<Finance />,document.getElementById("root"))
  }
          
        }
        
    



function goToStart(){
  reactDom.render(<Start/>,document.getElementById("root"))
}


// class Demo extends React.Component {  
//   constructor(){  
//     super();  
//     this.state={  
//       show:false  
//     }  
//   } 


// handleModal(){  
//   this.setState({show:!this.state.show})  
// } 
// }

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
                            <div class="panel-heading" style={{textAlign:"center", fontSize:"30px"}}>MEAL PLANNER
                        <button class="btn btn-primary pull-right" style={{marginTop:"1%"}} onClick = {goToStart}>Home</button>
                         </div>
                  </div>
                        
                        
      </div>
      </div>
      
      </div>
        <body>
 
      
        <div class="container">
            <div class="right" style={{marginLeft:"25%",marginTop:"1%"}}>
                <div class="formBox" style={{backgroundColor:"#D3D3D3", height:"550px"}}>
                    <p class="sign" style={{marginTop:"-50px"}}>Create Account</p>
                    <form  style={{marginTop:"-35px"}}>
                        <p style={{marginTop:"-30px",fontSize:"14px",marginLeft:"1px" }}>SignUp</p>
                        <select name="cars" id="userType" style={{marginTop:"-10px",width:"40%",marginLeft:"6px" }} onChange={setUserType} >
                        <option value="Employee">Employee</option>
                        <option value="Vendor" >Vendor</option>
                        <option value="Financier">Financier</option>
                        </select><br></br>
                        <p>UserId</p>
                        <input type="text" id="userId"  name="name" placeholder="Your Id" required/>

                        <p>User Name</p>
                        <input type="text" id="userName"  name="name" placeholder="Your Name" required/>

                        <p>E-mail Address</p>
                        <input type="text" id ="userEmail" name="email" placeholder="Enter your Mail ID" required/>

                        <p>Create Password</p>
                        <input type="Password" id="password" name="password" placeholder="Create a Strong Password" required />
                        <p>Confirm Password</p>
                        <input type="Password" id="confirmPassword" placeholder="Re-enter your Password" required />
                        <span id = "message2" style={{color:"red",fontSize: "10px"}}> </span> 
                        <button class="btn btn-primary" onClick={goToHome} >create an account..</button>
                         

                        {/* <p style={{marginTop:"-30px",fontSize:"14px",marginLeft:"1px" }}>Subscribe</p>
                        <select name="cars" id="cars" style={{marginTop:"-10px",width:"40%",marginLeft:"6px"}} >
                        <option value="volvo">
                        <p>The minimum meal price for vegetarian is Rs.800/-</p>
                        <p>The minimum meal price for non-vegetarian is Rs.1400/-</p>
                        <p>Please select the meal type : </p>
                        <input type="checkbox"/>
                          <label>veg</label>
                        <br></br>
                        <input type="checkbox"/>
                          <label>nonveg</label>
                          <p>NOTE:</p>
                        <p>
                          The meal price will be deducted from your account according to the subscription chosen whether you take the meals or not.After the subscription amount is null you need to pay for the meal .
                        </p>
                        </option>
                       
                        </select><br></br> */}

 

{/* <Dialog aria-labelledby="simple-dialog-title" open={true}>
    <DialogTitle id="simple-dialog-title"> Please select atleast one employee to Submit</DialogTitle>
        <div>
          <div>
          <button 
          class="btn btn-primary pull-right" 
          style={{marginBottom:'15px',marginRight:'15px'}} 
          data-title="Validate" 
          data-toggle="modal" 
          data-target="#validate" >close</button>
          </div>
        </div>
  </Dialog> */}

 
  {/* <Modal show={showDialog}>  
          <Modal.Header closeButton>SUBSCRIPTION</Modal.Header>  
          <Modal.Body>
            {console.log('This is in dialg') }
          <p>The minimum meal price for vegetarian is Rs.800/-</p>
          <p>The minimum meal price for non-vegetarian is Rs.1400/-</p>
           <p>Please select the meal type : </p>
           <input type="checkbox"/>
            <label>veg</label>
           <br></br>
           <input type="checkbox"/>
            <label>nonveg</label>
            <p>NOTE:</p>
           <p>
             The meal price will be deducted from your account according to the subscription chosen whether you take the meals or not.After the subscription amount is null you need to pay for the meal .
           </p>
          </Modal.Body>  
          <Modal.Footer>  
            <Button >Yes</Button>  
            <Button >No</Button>  
          </Modal.Footer>  
        </Modal>  */}
        {/* <div>  
        <div className="modalClass">  
          <Button onClick={()=>this.handleModal()}>subscribe</Button>  
        </div>  
          
        <Modal show={this.state.show} onHide={()=>this.handleModal()}>  
          <Modal.Header closeButton>SUBSCRIPTION</Modal.Header>  
          <Modal.Body>
          <p>The minimum meal price for vegetarian is Rs.800/-</p>
          <p>The minimum meal price for non-vegetarian is Rs.1400/-</p>
           <p>Please select the meal type : </p>
           <input type="checkbox"/>
            <label>veg</label>
           <br></br>
           <input type="checkbox"/>
            <label>nonveg</label>
            <p>NOTE:</p>
           <p>
             The meal price will be deducted from your account according to the subscription chosen whether you take the meals or not.After the subscription amount is null you need to pay for the meal .
           </p>
          </Modal.Body>  
          <Modal.Footer>  
            <Button onClick={()=>this.handleModal()}>Yes</Button>  
            <Button onClick={()=>this.handleModal()}>No</Button>  
          </Modal.Footer>  
        </Modal>  
      </div>    */}
                         
                        <p class="create" style={{marginTop:"-95px",marginLeft:"-100px"}}>Already a Member?<a class="tag" onClick={goToLogin}>Sign In</a></p>
                    </form>
                </div>
            </div>
            
        </div>
      
      </body>
      </div>
      </div>
        </>
  );
}

