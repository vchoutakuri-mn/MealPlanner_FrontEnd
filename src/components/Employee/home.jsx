import React, { useContext ,useState } from "react";

import { AccountContext } from "./accountContext";

import "../../App.css";

import reactDom from "react-dom";
//import Calendar from 'react-calendar';
//import ReactCalendar from "../emp_home";
import { SignupForm } from "./signupForm";
import LoginForm from "./loginForm";


import Calendar from 'react-calendar';






export default function Start(props) {
 
  
  function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
  }
  
  function goToLogin(){
    //<Calendar selectRange onChange={onChange} value={date} />
    console.log('going to login page...')
      reactDom.render(<LoginForm/>,document.getElementById("root"))
    }
    
  // Toggle between showing and hiding the sidebar when clicking the menu icon
  var mySidebar = document.getElementById("mySidebar");
  
  function w3_open() {
    if (mySidebar.style.display === 'block') {
      mySidebar.style.display = 'none';
    } else {
      mySidebar.style.display = 'block';
    }
  }
  
  // Close the sidebar with the close button
  function w3_close() {
      mySidebar.style.display = "none";
  }
  
  
  function buttons(){
  const buttons = document.querySelectorAll('button');
  buttons.forEach( button =>{
      button.addEventListener('click',()=>{
          const para = button.nextElementSibling;
          const icon = button.children[1];
  
          para.classList.toggle('show');
          icon.classList.toggle('rotate');
      })
  } )
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
                        <div class="panel-heading" style={{textAlign:"center"}}>Meal Planer<i style={{textColor:'#f2f2f2'}}>Home Page</i>
                        <button type="button" class="btn btn-primary pull-right" style={{marginTop:"-40px"}} onClick={goToLogin}>Login</button>
                       {/* <button class="btn primary pull-right" style={{marginTop:"-50px" }} onClick = {goToStart}>Home</button> */}
                        </div>
                        <div class="dropdown rounded"></div>
                        </div>
      </div>
      </div>
      
      </div>

{/* <head>
<title>Image Super Resolution</title>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
<link rel="stylesheet" href= "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/fontawesome.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.1.1/bootstrap-social.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"/>
    <link rel="preconnect" href="https://fonts.gstatic.com"/>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&amp;display=swap" rel="stylesheet"/>

</head> */}


{/* <div class="w3-top">
  <div class="w3-bar w3-white w3-card" id="myNavbar">
    <a href="#home" class="w3-bar-item w3-button w3-wide"><strong style={{fontSize: "20px" , marginLeft: "30px;"}}>Meal Planner</strong></a>
     */}
    <div class="w3-right w3-hide-small">
      {/* <a href="#" class="w3-bar-item w3-button">Home</a>
      <a href="#about" class="w3-bar-item w3-button active"><i class="fa fa-"></i> About</a>
      <a href="#contact" class="w3-bar-item w3-button"><i class="fa fa-user"></i>Contact Us</a> */}
     
    </div>
    
    <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onclick="w3_open()">
      <i class="fa fa-bars"></i>
    </a>
  </div>
</div>


<nav class="w3-sidebar w3-bar-block w3-black w3-card w3-animate-left w3-hide-medium w3-hide-large" style={{display:"none"}} id="mySidebar">
  <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-large w3-padding-16">Close ×</a>
  {/* <a href="#about" onclick="w3_close()" class="w3-bar-item w3-button">ABOUT</a>
  <a href="#team" onclick="w3_close()" class="w3-bar-item w3-button">TEAM</a>
  <a href="#contact" onclick="w3_close()" class="w3-bar-item w3-button">CONTACT</a> */}
  
</nav>


{/* <header class="bgimg-1 w3-display-container w3-grayscale-min" id="home">
  <div class="w3-display-left w3-text-white col-lg-6" style={{padding:"48px"}}>
  
    <span class="w3-jumbo">MEAL PLANNER</span><br/>
    
    <span class="w3-large"><p>Meals made simple!!!</p> </span>
    
  </div> 
  
  
</header> */}

<div class="w3-container" style={{padding:"50px", marginTop:"-1000px"}} id="about">
  <h3 class="w3-center">ABOUT THE PROJECT</h3>
  <div class="w3-row-padding w3-center">

    <div class="w3-row-padding" id="Resolute">
        <div class="w3-col m6">
          
          <section class="faq">
            <div class="questions-container">
                <div class="question">
                    <button onClick={buttons}>
                        <span>What is Meal Planner</span>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <p>Meal planner is an web service designed to digitalize the traditional system</p>
                </div>
                <div class="question"  onClick={buttons}>
                    <button>
                        <span>How it Works?</span>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <p>There are few entities like employees,vendors and finance department who are the main actors</p>
                </div>
                <div class="question"  onClick={buttons}>
                    <button>
                        <span>What is meal subsciprion</span>
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <p>The employee must subscribe mentioning a specific meal type 
                      in order to take the meals.
                    </p>
                </div>
            </div>
        
        </section>
        </div>
        <div class="w3-col m6" style={{marginTop: "20px"}}>
          <img class="w3-image w3-round-large" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIDE86FvI1BukF7FQpgYPUnAajwQ2RfpMyQ&usqp=CAU"  width="400px" height="700px"/>
        </div>
      </div>
  </div>
</div>





<div id="modal01" class="w3-modal w3-black" onclick="this.style.display='none'">
  <span class="w3-button w3-xxlarge w3-black w3-padding-large w3-display-topright" title="Close Modal Image">×</span>
  <div class="w3-modal-content w3-animate-zoom w3-center w3-transparent w3-padding-64">
    <img id="img01" class="w3-image"/>
    <p id="caption" class="w3-opacity w3-large"></p>
  </div>
</div>


{/* <div class="new" id="contact">
  <div class="h2">
          <h2 style={{fontSize:"15px"}}>Contact Us</h2>
           
        </div> */}
      <div  style={{padding:"1px"}} id="about">
  <h3 class="w3-center" style={{ marginTop:"-0.5%"}}>Contact Us</h3>
  <br></br>
          {/* <h4 style={{fontSize:"20px" , marginLeft:"200px"}}>Team</h4> */}
          <h6 style={{marginLeft:"100px" }}>Vyshali Chava <br></br> mail: vchava@modeln.com</h6>
          <h6 style={{marginLeft:"400px" , marginTop:"-2.89%"}}>Vishnu Vadhan Dhandu <br></br> mail: vdhandu@modeln.com</h6>
          <h6 style={{marginLeft:"700px" , marginTop:"-2.79%"}}>Sandeep Kumar<br></br> mail: sdkumar@modeln.com</h6>
          <h6 style={{marginLeft:"1000px", marginTop:"-2.6%"}}>Vikas Chotukuti <br></br> mail: vchotukuri@modeln.com</h6>
          {/* <ul>
            <li style={{fontSize:"16px" , marginLeft:"200px"}}> Vyshali Chava</li>
            <div class="jk">
           
            </div>
           
            <li>Vikas Chotukuri</li>
            <div class="jk">
              
            </div>
            
            <li> Modeln N, Hyderabad</li>
            
          </ul> */}
  </div>
 



{/* <footer class="w3-center w3-black w3-padding-64">
  <a href="#home" class="w3-button w3-light-grey"><i class="fa fa-arrow-up w3-margin-right"></i>To the top</a>
  
</footer> */}



     
</>

);
  }