import React , { useState } from 'react'
import '../Vender/css/App.css'
import Employee from './data/Employee';
import MealDetails from './data/MealDetails';
import DownloadErrorDialog, { ConfirmDownload } from './DownloadErrorDialog';
import Footer from './footer';

var SelectedEmployees=[]
var Users=[];
var ShowUsers=[]
let TABLE_HEAD=['Employee ID','Name','Email','No of Meals','Total money']
var TEMPORERY_SIZE=12;
export default class EmployeeMealDetails extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            users:[],
            ShowUsers:[],
            searchBy:'Employee ID',
            openDownloadErrorDialog:false,
            pageNo:1,
            startPage:1,
            endPage:10,
            pageSize:5,
            confirmDialog:false
        }
        this.search=this.search.bind(this);
        this.search=this.search.bind(this);
        this.downloadReport=this.downloadReport.bind(this)
        this.closeDownloadError=this.closeDownloadError.bind(this)
        this.downloadHelper=this.downloadHelper.bind(this)
        this.selectSearchType=this.selectSearchType.bind(this);
        this.selectRowsPerPage=this.selectRowsPerPage.bind(this);
        this.getData=this.getData.bind(this);
        this.nextPage=this.nextPage.bind(this);
        this.closeConfirmDialog=this.closeConfirmDialog.bind(this)
        this.backward=this.backward.bind(this);
        this.previousPage=this.previousPage.bind(this);
        this.forward=this.forward.bind(this)
    }

    
    componentDidMount(){
        this.getData(this.state.pageNo,this.state.pageSize);
    };

    getData(pageNo,pageSize){
        console.log(pageNo,pageSize)
        MealDetails.getEmployeeMealDates(pageNo,pageSize).then((Response)=> {
            console.log( Response.data)
            Response.data.content.map(
                user=>{
                    user['noOfMeals']=Math.floor(Math.random() * 30)
                    if(user['noOfMeals']<=12){
                        user['totalMoney']=1000
                    }else{
                        user['totalMoney']=user['noOfMeals'] * 75
                    }
                    
                }
            )
            this.setState({users:Response.data.content})
            Users=this.state.users
        });
    }

      /**
     * Search the employees based on employeeID
     * Function defination:
     *      First store all the employeeDetails in one global varible rather than state varibale then 
     *    whenever the vendor searchs the based on employeeID then remove all the employee other than the
     *    that employeeID. If the search text is empty then all the employeeDetails will be displayed
     *      {or}
     *      Add keyboard event listner and remove the search button which will execute this event whenever 
     *    the vender releases key and then do the same procedure as in the above
     */
    /**
     * Yet to be defined
     */
     search() {
        let searchData = document.getElementById('searchData').value
        console.log('value..',searchData,this.state.users)
        if(searchData==''||searchData==undefined){
            this.state.users=Users
            this.setState({ShowUsers:[0]})
            return;
        }
        this.state.users=[]
        switch(this.state.searchBy){
            case "Employee ID":
                for(let userNumber=0;userNumber<Users.length;userNumber++){
                    if(searchData!='' && String(Users[userNumber].id).includes(searchData)){
                        this.state.users.push(Users[userNumber])
                    }
                }
                break;
            case "Employee name":
                for(let userNumber=0;userNumber<Users.length;userNumber++){
                    if(Users[userNumber].employeeName.toUpperCase().includes(searchData.toUpperCase())){
                        this.state.users.push(Users[userNumber])
                    }
                }
                break;
            case "Employee email":
                for(let userNumber=0;userNumber<Users.length;userNumber++){
                    if(Users[userNumber].email.toUpperCase().includes(searchData.toUpperCase())){
                        this.state.users.push(Users[userNumber])
                    }
                }
                break;

                case "Total Money":
                    for(let userNumber=0;userNumber<Users.length;userNumber++){
                        if(searchData!='' && String(Users[userNumber].totalMoney).includes(searchData)){
                            this.state.users.push(Users[userNumber])
                        }
                    }
                    break;
            default:
                console.log("In default")
                this.state.users=Users
                break;
        }
        this.setState({ShowUsers:[0]})
        console.log("...",this.state.users,searchData)
    }


    selectSearchType(e){
        this.setState({searchBy:e.target.value})
        console.log(this.state.searchBy)
    }

    
//create a user-defined function to download CSV file 
 downloadReport() {
     
    if(this.state.users.length==0){
      this.setState({openDownloadErrorDialog:true})
      console.log('downloading error')
      return;
    }else{
        this.setState({confirmDialog:true})
    }
    
  }

  closeConfirmDialog(){
    this.setState({confirmDialog:false})
}
  
   downloadHelper(){
    
    var csvData=TABLE_HEAD[0];
     //define the heading for each row of the data
     for(let each=1;each<TABLE_HEAD.length;each=each+1){
         csvData=csvData+','+TABLE_HEAD[each]
     }
     csvData=csvData+'\n'
     let data=this.state.users;
     Employee.getUsers().then(Response=>{
         Response.data.map(user=>{
            user['noOfMeals']=Math.floor(Math.random() * 30)
            if(user['noOfMeals']<=12){
                user['totalMoney']=1000
            }else{
                user['totalMoney']=user['noOfMeals'] * 75
            }
            
        })
        data=Response.data;
        console.log(data)
        console.log(this.state.users)
        data.forEach(function(row) {
            console.log(typeof row)
         csvData += row.id+','+row.employeeName+','+ row.email+','+row.noOfMeals+','+ row.totalMoney+',';
         csvData += "\n";
        });
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
        hiddenElement.target = '_blank';
        
        //provide the name for the CSV file to be downloaded
        hiddenElement.download = 'Meal Report.csv';
        hiddenElement.click();
     })
     
    

  }

  closeDownloadError(){
      this.setState({openDownloadErrorDialog:false})
  }

  
  selectRowsPerPage(pageNo,selectedRows){
      this.state.pageSize=selectedRows;
      console.log("rowsPerChange is Chaniging");
          this.getData(pageNo,selectedRows); 
  }
  
  backward(){
      if(this.state.pageNo-2>0){
        this.state.pageNo=this.state.pageNo-2
        this.getData(this.state.pageNo,this.state.selectedRows); 
      }
  }

  previousPage(){
    if(this.state.pageNo-1>0){
        this.state.pageNo=this.state.pageNo-1
        this.getData(this.state.pageNo,this.state.pageSize); 
      }
  }
//Get the length of  data present in database

  nextPage(){
      console.log('change size to dynamic')
    if(this.state.pageNo+1<TEMPORERY_SIZE){
        this.state.pageNo=this.state.pageNo+1
        this.getData(this.state.pageNo,this.state.pageSize); 
      }
  }

  forward(){
    console.log('change size to dynamic')
    if(this.state.pageNo+2<TEMPORERY_SIZE){
        this.state.pageNo=this.state.pageNo+2
        this.getData(this.state.pageNo,this.state.pageSize); 
      }
  }
  

    render(){
        //console.log("This is in body page")
        return (
            <>
            <div id="employeeInformation">
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
             <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"/>
             <script src="//code.jquery.com/jquery-1.11.1.min.js"/>
             <div>
             <input type="text" id="searchData" style={{float:'left' , marginTop:'5px'}} name="search" placeholder={this.state.searchBy} onKeyUp={this.search}/>
             <select name="cars" id="cars" onChange={this.search} class="btn btn-primary pull-left" style={{ float: 'left', marginTop: '5px', marginLeft: '5px' }} onClick={this.selectSearchType}>
                                <option value="Employee ID">Search by</option>
                                <option value="Employee ID">EmployeeID</option>
                                <option value="Employee name">Employee name</option>
                                <option value="Employee email">Employee email</option>
                                <option value="Total Money">Total Money</option>
                            </select>
            <button type="submit" onClick={this.search} class="btn btn-primary pull-left" style={{marginLeft:'5px' ,height:"30px", marginTop:'5px'}} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-search"></i></button>
             </div>
            
             <button type="submit" onClick={this.downloadReport} class="btn btn-primary pull-left" style={{ marginLeft: '5px', height: "30px", marginTop: '5px' }} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-download"></i> Download Report</button>
            
        
             <div >
   
             <table id="mytable" class="table" >
             <thead>
                 <tr>
                    {/* <th><input type="checkbox" id="checkall" /></th> */}
                    <th >Employee ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th >No of meals</th>
                    <th>Total Money</th>
                  
                 </tr>
             </thead>
             <tbody style={{height:"360px"}} >
                
                 {
                     this.state.users.map(
                         user=>
                         <tr>
                            {/* 
                            
                            SelectedEmployees.map(
                      user=>
                      <tr >
                         <td>{Users[user-1].id}</td>
                         <td>{Users[user-1].login}</td>
                         <td>{Users[user-1].url}</td>
                    </tr> 
                            
                            <td><input type="checkbox" id={user.id} class="checkthis" onClick={this.setEmployes}/></td> */}
                            <td>{user.id}</td>
                            <td>{user.employeeName}</td>
                            <td>{user.email}</td>         
                            <td><span class="label label-info">{user.noOfMeals}</span></td>
                            <td><span class="label label-info">{user.totalMoney}</span></td>
                            
                 </tr>
                    )
                 }
                 
             </tbody>
         </table>
         </div>
         <Footer   pageNo={this.state.pageNo} selectRowsPerPage={this.selectRowsPerPage} rowsPerPage={this.state.rowsPerPage} startPage={this.state.startPage} data={0} backward={this.backward} previousPage={this.previousPage} nextPage={this.nextPage} forward={this.forward}/>
     
         </div>
         <DownloadErrorDialog open={this.state.openDownloadErrorDialog} closeWindow={this.closeDownloadError} />
         <ConfirmDownload open={this.state.confirmDialog} closeWindow={this.closeConfirmDialog} download={this.downloadHelper} />
            
          </>
        );
    }
}

//SelectedEmployees is a array which holds the employee id which are selected to send an notification
//Uncheck and change the notified text to YES because these SelectedEmployees has sent a notification
 function uncheck(SelectedEmployees){
     //console.log("Unchecking",SelectedEmployees.length)
     if(SelectedEmployees.length!=0 && SelectedEmployees.length!=undefined){
        SelectedEmployees.forEach(employee => {
            let checkBox=document.getElementById(employee)
            checkBox.checked=false
            checkBox.disabled=true
            checkBox.parentElement.parentElement.lastElementChild.innerHTML='Submitted'
            
            //console.log(document.getElementById(parseInt(employee)+"n"),"..",employee)
            // document.getElementById("notified").className='label label-primary'
            // console.log(document.getElementById("notified").className,"..")
        
        });
}
}
function releasingEmployees(){
    SelectedEmployees=[]
}

function isSelected(){
    if(SelectedEmployees.length==0){
        return false;
    }
    return true;
}


export {uncheck ,releasingEmployees , isSelected}