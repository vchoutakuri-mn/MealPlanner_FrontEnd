
import '../Vender/css/App.css'

import React from 'react';
import EmployeeMealDetails from './EmployeeDetsils';



const notification=[];
let  EmployeeList=[]
let Users={};
let doOpen=false;
  export default function Finance(props){

/**
 * As nothing is required beacuse this rendor is in read mode
 */
  
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
                        <div class="panel-heading" style={{testAlign:'center'}}>Meal Planer<i>Finanace Page &  (financeteam@gmail.com)</i>
                        </div>
                        <div class="dropdown rounded">
                        <button 
                       
                        class="btn btn-primary pull-right" style={{margin:"5px"}} data-title="Signout" data-toggle="modal" data-target="#ssignout"><span class="fa fa-sign-out"></span>Signout</button>

                          </div>
                            <div >
                          <EmployeeMealDetails  />
 
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








