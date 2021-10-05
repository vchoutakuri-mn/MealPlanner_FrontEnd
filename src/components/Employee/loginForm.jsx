import React, { useContext, useState } from "react";
import { AxiosResponse, AxiosError } from 'axios'
import reactDom from "react-dom";
import './css/loginFormcss.css'
//import { Datepicker } from "@datepicker-react/styled";
//import background from "./Capture.PNG"
import SignupForm from "./signupForm";
import ReactCalendar from "./emp-home";
import App from "./Emp_history";
import MyApp from "./Emp_home_new";
import Employee from "./data/Employee";
import Start from "./home";
import Vender from "../Vender";
import Finance from "../FinanaceTeam/finance";
import { GET_TOKEN, SET_TOKEN } from "../Vender/data/Storage";
import { TOKEN } from "../API's/CommonService";
import PageNotFound from "../HomeFolder/ErrorHandler/PageNotFound";
import InternalServerError from "../HomeFolder/ErrorHandler/InternalServerError";
import Error from "../HomeFolder/ErrorHandler/Error";

export default function LoginForm(props) {
    const [value, onChange] = useState(false);
    var [userType, setUser] = useState('Employee');
    const [token, deleteToken] = useState('');
    var [empid, setEmpId] = useState();
    //   const { switchToSignup  } = useContext(AccountContext);

    //   const [userID, setUserID] = useState('');
    //   const [password, setPassword] = useState('');
    //   const [onLoginSucess,isLogined]=useState('');

    //   const submitValue = () => {


    //     if(userID && password){
    //       isLogined(true)
    //       const element=document.getElementById("root")
    //       reactDom.render(<UserComponent/>,element);
    //     }
    //     else{
    //       alert("Enter valid details")
    //     }    
    // }
    function goTOSignUp() {
        //filter the data

        //Take the data from the input value
        // Employee.newUser(userData)
        // .then(function(res){
        //     if(res.STATUS_CODE==200){
        //         //ON success
        //     }
        // }).catch(err=>console.log('error'))
        // console.log("Going to signup")
        reactDom.render(<SignupForm />, document.getElementById("root"))


       var selectedDatesList=[
        ["2021-09-30" ,'veg'],
        ["2021-10-01",'veg'],
        ["2021-10-04",'non-veg'],
        ["2021-10-05",'veg'],
        ["2021-10-06",'non-veg'],
      ]
      
      var currentSelectedDatesList=[
        ["2021-09-30"],
        ["2021-10-01"],
        ["2021-10-04"],
        ["2021-10-05"],
        ["2021-10-06"],
        ["2021-10-07"]
      ]
console.log(currentSelectedDatesList[0][0])
      for(var previouslySelectedDate=0;previouslySelectedDate<selectedDatesList.length;previouslySelectedDate++){
          for(var currentSelectedDate=0;currentSelectedDate<currentSelectedDatesList.length;currentSelectedDate++){
              if(selectedDatesList[previouslySelectedDate][0].includes(currentSelectedDatesList[currentSelectedDate][0])){
                  console.log(selectedDatesList[previouslySelectedDate][0],currentSelectedDatesList[currentSelectedDate][0])
                  if(currentSelectedDatesList[currentSelectedDate][1]!=undefined){
                    currentSelectedDatesList[currentSelectedDate][1]=selectedDatesList[previouslySelectedDate][1]
                  }else{
                    currentSelectedDatesList[currentSelectedDate].push(selectedDatesList[previouslySelectedDate][1])
                  }
              }
          }
      }
      console.log(currentSelectedDatesList[5][1])
      
      var finalDatesList=[
        ["2021-09-30" ,'veg'],
        ["2021-10-01",'veg'],
        ["2021-10-04",'non-veg'],
        ["2021-10-05",'veg'],
        ["2021-10-06",'non-veg'],
        ["2021-10-07",'veg']
      ]
    }
    function goToStart() {
        console.log("test working")
        reactDom.render(<Start />, document.getElementById("root"))
    }

    function setTypeOfUser(e) {
        setUser(e.target.value)

    }

    function goToHome(e) {
        e.preventDefault();
        //Filter the data
        console.log("im in gotohome")
        var e = document.getElementById("log");
        var strUser = e.options[e.selectedIndex].text;
        console.log("struser", strUser)

        empid = document.getElementById("userId").value;


        var empasswd = document.getElementById("password").value;
        if (empid == null || empasswd == null) {
            console.log("null entered")
            alert("please enter userid and password")

        }

        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;

        var token = ''
        //This is a comment 

        // if(empid.match(numbers) != null && 
        //    empasswd.length >= 8  &&
        //    empasswd.match(lowerCaseLetters) != null && 
        //    empasswd.match(upperCaseLetters) !=null && 
        //    empasswd.match(numbers) != null 
        // )
        {
            console.log("Registered user details", userType)
            console.log("User:", empid, empasswd)
            // try {
            //     await axios.get('/bad-call')
            // } catch (error) {
            //    const err = error //as import("axios").AxiosError
            //    if (err.response) {
            //       console.log(err.response.status)
            //       console.log(err.response.data)
            //    }
            //    this.handleAxiosError(error)
            // }
            if(strUser == "Finance Department"){
                strUser = "financer"
            }
            Employee.checkValidation( empid, empasswd, strUser).then(Response => {
                console.log("In login", Response.status)
                if (Response.status == 200 && Response.data != '' && Response.data != undefined) {

                    token = Response.data.slice(7);
                    console.log("token generated", token)
                    SET_TOKEN(token, GET_TOKEN)
                    localStorage.setItem('role', userType)
                    localStorage.setItem('validUser', true)
                    localStorage.setItem('token', GET_TOKEN());
                    localStorage.setItem('empId',empid)

                    if (userType == "Employee") {
                        var meal_subscribed;
                        reactDom.render(<MyApp empId={empid} meal_subscribed={false} token={token} />, document.getElementById("root"))
                        Employee.checkMealSubscription(empid).then((Response) => {
                            console.log('typeof', Response.data);
                            meal_subscribed = Response.data


                        })
                    } else if (userType == "vendor") {
                        reactDom.render(<Vender token={token} />, document.getElementById("root"))
                    } else {
                        reactDom.render(<Finance token={token} />, document.getElementById("root"))
                    }
                } else {
                    //Reload component or input fields make empty
                    console.log("Details are wrong")
                    alert("Incorrect Details found")
                    // reactDom.render(<MyApp/>,document.getElementById("root"))
                }
            }).catch(function (error) {
               if(error.response){
                   console.log("details wrong ",error)
                   if(error.response!=undefined ){
                    reactDom.render(<PageNotFound/>,document.getElementById("root"))
                   }
                   else if(error.response.status.include(5)){
                    reactDom.render(<InternalServerError/>,document.getElementById("root"))
                   }
               }else{
                reactDom.render(<InternalServerError/>,document.getElementById("root"))
               }
              }).finally(() => {
            }
            );

            onChange(true)






        }
        //Take the values form the input fields
        // Employee.validateUser(id,pass)
        // .then(function(res){
        //     if(res.STATUS_CODE==200){
        //         //go to next page

        // else{
        //         Login failed becz of wrong credentials

        //  }).catch(err=>console.log('Login failed'))
        //onChange(true)
        //reactDom.render(<MyApp/>,document.getElementById("root"))
    }
    if (localStorage.getItem('validUser') != undefined && localStorage.getItem('validUser').includes(true)) {
        SET_TOKEN(localStorage.getItem('token'))
        console.log("finding details")
        if (localStorage.getItem('role') != undefined && localStorage.getItem('role').includes("vendor")) {
            console.log("vendor found")
            return (
                <>
                    <Vender />
                </>
            )
        } else if (localStorage.getItem('role') != undefined && localStorage.getItem('role').includes("Employee")) {
            return (
                <>
                    <MyApp empId={localStorage.getItem('empId')} />
                </>
            )
        } else if (localStorage.getItem('role') != undefined && localStorage.getItem('role').includes("financier")) {
            return (
                <>
                    <Finance />
                </>
            )
        } else {
            <>
                <div>
                    <p>not found</p>
                </div>
            </>
        }
    } else {



        return (

            <>
                <div >
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
                    <script src="//code.jquery.com/jquery-1.11.1.min.js" />
                    {/*---- Include the above in your HEAD tag --------*/}

                    <div class="container" style={{ width: "100%" }}>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="widget blank no-padding">
                                    <div class="panel panel-default work-progress-table">
                                        {/* Default panel contents */}
                                        <div class="panel-heading" style={{ textAlign: "center", fontSize: "30px" }}>MEAL PLANNER
                                            <div>
                                                <button class="btn btn-primary pull-right" style={{ marginTop: "1%" }} onClick={goToStart}>Home</button>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                        <body>

                            <div class="container" >
                                <div class="right" style={{ marginLeft: "25%" }}>

                                    <div class="formBox" style={{ backgroundColor: "#D3D3D3" }} >
                                        <p class="sign" style={{ marginTop: "1%", fontSize: "25px" }}>Sign in</p>

                                        <form>
                                            <label style={{ marginTop: "1%", fontSize: "14px", marginLeft: "25%" }}>Login</label>
                                            <select name="logs" id="log" style={{ marginTop: "1%", width: "40%", marginLeft: "16%", textAlign: 'center' }} onChange={setTypeOfUser} >
                                                <option value="employee" >Employee</option>
                                                <option value="vendor" >Vendor</option>
                                                <option value="financier">Finance Department</option>
                                            </select><br></br>
                                            <label style={{ fontSize: "14px", marginLeft: "25%" }}>User ID  </label>
                                            <input type="text" name="name" placeholder="User Id" required="" id="userId" style={{ width: "40%", marginLeft: "68px", textAlign: 'center' }} />
                                            <label style={{ fontSize: "14px", marginLeft: "25%" }}>Password  </label>
                                            <input type="Password" name="password" placeholder="User Password" required="" id="password" style={{ width: "40%", marginLeft: "50px", textAlign: 'center' }} />
                                            <button onClick={goToHome} class="btn btn-primary" style={{ marginLeft: "50%", top: "20%" }} >Sign in</button>

                                            <br></br>
                                            <h5 style={{ marginTop: "30px", marginLeft: "40%" }}>Don't have an account? </h5>
                                            <a onClick={goTOSignUp} style={{ marginLeft: "55%", marginTop: "5%" }} class="tag" >Create Account</a>

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

}





// import React, { useContext ,useState } from "react";
// import {
//   BoldLink,
//   BoxContainer,
//   FormContainer,
//   Input,
//   MutedLink,
//   SubmitButton,
// } from "./common";
// import {
//   body,
//   container,
// } from "./features"
// import Switch from "react-switch";
// import { Marginer } from "../marginer";
// import { AccountContext } from "./accountContext";
// import UserComponent from "../UserComponent";
// import reactDom from "react-dom";
// //import Calendar from 'react-calendar';
// //import ReactCalendar from "../emp_home";
// import "../../App.css";
// import { SignupForm } from "./signupForm";

// export function LoginForm(props) {
// //   const { switchToSignup  } = useContext(AccountContext);

// //   const [userID, setUserID] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [onLoginSucess,isLogined]=useState('');

// //   const submitValue = () => {


// //     if(userID && password){
// //       isLogined(true)
// //       const element=document.getElementById("root")
// //       reactDom.render(<UserComponent/>,element);
// //     }
// //     else{
// //       alert("Enter valid details")
// //     }    
// // }
// function goTOSignUp(){
//     console.log("Going to signup")
//     reactDom.render(<SignupForm/>,document.getElementById("root"))
// }


// function goToHome(){
//     reactDom.render(<emp-home/>,document.getElementById("root"))
//   }


// return (
//   <>
//   <body>
//   <div class="title"><h2>Meal Planner</h2></div>
//       <a href="/">
//           <button class="btn"><i class="fa fa-home"></i> Home</button>
//       </a>
//       <div class="container">
//           <div class="left"></div>
//           <div class="right">
//               <div class="formBox">
//                   <p class="sign">Sign into Your Account</p>
//                   {/* <span style="color:red;font-size: 15px"><center></center></span> */}
//                   <form >
//                   <h3>Who are you:</h3>
//                   <select name="cars" id="cars">
//                   <option value="volvo">Employee</option>
//                   <option value="saab">Vendor</option>
//                   <option value="opel">Financier</option>
//                   </select>
//                       <p>Username</p>
//                       <input type="text" name="name" placeholder="Your Name" required=""/>
//                       <p>Password</p>
//                       <input type="Password" name="password" placeholder="Enter your Password" required=""/>
//                       <button type="submit"  value="Sign In" onClick= {goToHome}>Signin</button>
//                       <p class="create">Don't have an account?<button   onClick = {goTOSignUp}  class="tag" >Create Account</button></p>
//                   </form>
//               </div>
//           </div>
//       </div>
//       </body>
//       </>
// );
// }