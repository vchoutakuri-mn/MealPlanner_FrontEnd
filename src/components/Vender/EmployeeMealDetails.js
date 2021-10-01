import { indigo } from '@material-ui/core/colors';
import { Refresh } from '@material-ui/icons';
import React, { useState } from 'react'
import { DownloadConfirm, InvalidUser } from './SendNotificationConfirm';
import './css/App.css'
import Employee from './data/Employee';
import { GET_TOKEN } from './data/Storage';
import Footer from './footer';
import SimpleDialog from './SendNotificationConfirm'
import MyApp from '../Employee/Emp_home_new';
import reactDom from 'react-dom';
import Start from '../Employee/home';
import MealDetails from './data/MealDetails';

var SelectedEmployees = []
var Users = [];
var ShowUsers = []
var TEMPORERY_SIZE=13
let DEFAULT_PAGE_SIZE=10;

export default class EmployeeMealDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            SelectedEmployees: [],
            ShowUsers: [],
            open: false,
            noOfDaysInPercentage: 0,
            noOfDays: 0,
            searchBy:'Employee ID',
            pageSize:DEFAULT_PAGE_SIZE,
            pageNo:1,
            totalNoOfRecords:0,
            reload:false,
            sessionTimeOut:false
        }
        this.setEmployes = this.setEmployes.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setPercentage = this.setPercentage.bind(this);
        this.setDays = this.setDays.bind(this);
        this.setShowUsers = this.setShowUsers.bind(this)
        this.search=this.search.bind(this);
        this.setUsers=this.setUsers.bind(this);
        this.selectSearchType=this.selectSearchType.bind(this);
        this.backward=this.backward.bind(this);
        this.previousPage=this.previousPage.bind(this);
        this.forward=this.forward.bind(this)
        this.nextPage=this.nextPage.bind(this);
        this.selectRowsPerPage=this.selectRowsPerPage.bind(this);
        this.checkList=this.checkList.bind(this)
        this.reload=this.reload.bind(this)
    }
    /**
     * Get the data from an api and store in the state vairable 'users'
     * As of now add the number of days and percentage because the api is not created properly
     * thus add the static data to the 'users' variable
     */
    componentDidMount() {
        this.getNumberOfRecords(this.checkList)
        this.getData(this.state.pageNo,this.state.pageSize)
        
        
    };
    checkList(){
        //data is stores in totalNoOfRecords variable
        //console.log(this.state.totalNoOfRecords)
    }

    getData(pageNo,pageSize){
       
        Employee.getUsers(pageNo,pageSize).then((Response) => {
            //console.log(Response.status);
            //if(Response.status==403)//console.log("Login expired ")

            // Response.data.map(
            //     // user => {
            //     //     user['noOfDays'] = Math.floor(Math.random() * 30)
            //     //     user['noOfDaysInPercentage'] = Math.floor(Math.random() * 100)
            //     //     this.state.ShowUsers.push(user.id)
            //     //     ShowUsers.push(user.id)
            //     // }
            // )
            
            this.setState({ users: Response.data })
            Users=this.state.users;
            console.log(Users)
            
        }).catch(err=>{
            //console.log("Something went wrong")
            console.log("Session time out")
            this.setState({sessionTimeOut:true})
        });
    }
    //Returns the length of the data that is coming from the api
    getNumberOfRecords(checkList){
        Employee.getNoOfRecords().then((Response)=>{
           this.state.totalNoOfRecords=Response.data;
           checkList()
        })
      
    }
    reload(){
        this.getData(1,1);
    }
    setShowUsers() {

    }

    setUsers(user){
        this.setState({users:user})
    }

    setPercentage() {
        this.setState({ noOfDaysInPercentage: Math.random() * 100 })
    }

    setDays() {
        this.setState({ noOfDays: Math.random() * 30 })
    }
o
/**
 * 
 * @param {e}  e is an event listner
 * Save the selected employee in global varible i.e 'SelectedEmployees' depending  on the following condition
 * if the toggle button is checked and 
 *      employeeId is not present in 'SelectedEmployees' 
 *          then add the employeeIDn to the 'SelectedEmployees'
 *          else(i.e employeeId is already present in 'SelectedEmployees') remove the employeeID from 'SelectedEmployees'
 */
    setEmployes(e) {
        let IDs = e.target.id;
        if (e.target.checked == true && !SelectedEmployees.includes(IDs)) {
            SelectedEmployees.push(IDs)
        } else {
            SelectedEmployees.splice(SelectedEmployees.indexOf(IDs), 1)
        }
        this.setState({ SelectedEmployees: e })

    }

    raiseNotification(e) {
    }
    uncheck() {
        //console.log("Unchecking")
    }
    /**
     * 
     * @param {*} 
     * handleClose is used to close the popUp window or dialog which is raised
     
     */
    handleClose(value) {
        this.setState({ open: false })
    };
/**
 * 
 * @param {e}  e is an event listner
 * Save the selected employee in global varible i.e 'SelectedEmployees' depending  on the following condition
 * if the toggle button is checked and 
 *      employeeId is not present in 'SelectedEmployees' 
 *          then add the employeeIDn to the 'SelectedEmployees'
 *          else(i.e employeeId is already present in 'SelectedEmployees') remove the employeeID from 'SelectedEmployees'
 */
    toggleClicked(e) {
        let IDs = e.target.id;
        if (e.target.checked == true && !SelectedEmployees.includes(IDs)) {
            SelectedEmployees.push(IDs)
        } else {
            SelectedEmployees.splice(SelectedEmployees.indexOf(IDs), 1)
        }
        console.log("Selected Employees", SelectedEmployees)
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
     * implemented
     */
    bond(user){
        //console.log("garbage function delete now",user,)
    }

    /**
     * Chnages the data of state users
     * @returns 
     */
    search() {
        let searchData = document.getElementById('searchData').value
        //console.log('value..',searchData,this.state.users)
        if(searchData==''||searchData==undefined){
            this.state.users=Users
            this.setState({ShowUsers:[0]})
            return;
        }
        this.state.users=[]
        switch(this.state.searchBy){
            case "Employee ID":
                for(let userNumber=0;userNumber<Users.length;userNumber++){
                    if(searchData!='' && String(Users[userNumber].empID).includes(searchData)){
                        this.state.users.push(Users[userNumber])
                    }
                }
                break;
            case "Employee name":
                for(let userNumber=0;userNumber<Users.length;userNumber++){
                    if(Users[userNumber].empName.toUpperCase().includes(searchData.toUpperCase())){
                        this.state.users.push(Users[userNumber])
                    }
                }
                break;
            case "Employee email":
                for(let userNumber=0;userNumber<Users.length;userNumber++){
                    if(Users[userNumber].empEmail.toUpperCase().includes(searchData.toUpperCase())){
                        this.state.users.push(Users[userNumber])
                    }
                }
                break;

                case "Number of days skipped":
                    for(let userNumber=0;userNumber<Users.length;userNumber++){
                        if(searchData!='' && String(Users[userNumber].noOfDays).includes(searchData)){
                            this.state.users.push(Users[userNumber])
                        }
                    }
                    break;
            default:
                //console.log("In default")
                this.state.users=Users
                break;
        }
        this.setState({ShowUsers:[0]})
        
    }


    selectSearchType(e){
        this.setState({searchBy:e.target.value})
       
    }

    
  backward(){
    if(this.state.pageNo-2>0){
      this.state.pageNo=this.state.pageNo-2
      this.getData(this.state.pageNo,this.state.pageSize); 
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
  if(this.state.pageNo+1<TEMPORERY_SIZE){
      this.state.pageNo=this.state.pageNo+1
      this.getData(this.state.pageNo,this.state.pageSize); 
    }
}

forward(){

  if(this.state.pageNo+2<TEMPORERY_SIZE){
      this.state.pageNo=this.state.pageNo+2
      this.getData(this.state.pageNo,this.state.pageSize); 
    }
}
selectRowsPerPage(pageSize){
    this.state.pageSize=pageSize;
    this.getData(this.state.pageNo,pageSize);
}
goToHome(){
    reactDom.render(<Start/>,document.getElementById('root'))
}


    render() {
        ////console.log("This is in body page")
        return (
            <>
            
                <div id="employeeInformation">
                    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
                    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js" />
                    <script src="//code.jquery.com/jquery-1.11.1.min.js" />
                    <div>
                        <input type="text" id="searchData" style={{ float: 'left', marginTop: '5px' }} placeholder={this.state.searchBy} onKeyUp={this.search} name="search" />
                        
                        <select name="sortBy" id="sortBy" onChange={this.search} class="btn btn-primary pull-left" style={{ float: 'left', marginTop: '5px', marginLeft: '5px' }} onClick={this.selectSearchType}>
                                <option value="Employee ID">Search by</option>
                                <option value="Employee ID">EmployeeID</option>
                                <option value="Employee name">Employee name</option>
                                <option value="Employee email">Employee email</option>
                                <option value="Number of days skipped">Number of days skipped</option>
                            </select>
                        <button type="submit" onClick={this.search} class="btn btn-primary pull-left" style={{ marginLeft: '5px', height: "30px", marginTop: '5px' }} data-title="Signout" data-toggle="modal" data-target="#ssignout"><i class="fa fa-search"></i></button>
                        <button type="submit" onClick={this.reload} class="btn btn-primary pull-left" style={{ marginLeft: '5px', height: "30px", marginTop: '5px' }} data-title="Signout" data-toggle="modal" data-target="#ssignout" ><i class="fa fa-refresh"></i></button>
                    </div>


                    <table id="mytable" class="table" style={{height:'50%'}}>
                        <thead>
                            <tr>
                                {/* <th><input type="checkbox" id="checkall" /></th> */}
                                <th >Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>

                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody style={{ height:"350px"}}>
                            {(this.state.users.length!=0)?
                                this.state.users.map(
                                    user =>
                                        <tr>
                                            <td>{user[0]}</td>
                                            <td>{user[1]}</td>
                                            <td>{user[2]}</td>
                                            
                                           
                                            <td>

                                                <label class="switch">
                                                    {(user[3]=='true'|| user[3]==true) ?
                                                      <><span>Submitted</span></>
                                                      :
                                                      <>
                                                      <input type="checkbox" id={user[0]} onClick={this.toggleClicked}/>
                                                      <span class="slider round"></span></> 
                                                    }
                                                </label>
                                            </td>
                                        </tr>
                                ):
                                <p style={{width:'100%',marginTop:'10%'}}>No data found</p>
                            }
                        </tbody>
                    </table>
                </div>
                
                <Footer selectRowsPerPage={this.selectRowsPerPage} rowsPerPage={10} pageNo={this.state.pageNo} noOfRecords={this.state.totalNoOfRecords} backward={this.backward} previousPage={this.previousPage} nextPage={this.nextPage} forward={this.forward} pageSize={this.state.pageSize}/>
                <SimpleDialog open={this.props.open} onClose={this.props.onClose} SelectedEmployees={SelectedEmployees} Users={Users} doSave={this.props.doSave} />

                <InvalidUser open={this.state.sessionTimeOut}  />

            </>
        );
    }
}

/**
 * 
 * @param {*} SelectedEmployees 
 * SelectedEmployees is a array which holds the employee id which are selected to send an status
 * Uncheck and change the notified text to submitted because these SelectedEmployees has sent a status
 */
function uncheck(SelectedEmployees) {
    ////console.log("Unchecking",SelectedEmployees.length)
    if (SelectedEmployees.length != 0 && SelectedEmployees.length != undefined) {
        SelectedEmployees.forEach(employeeID => {
            let checkBox = document.getElementById(employeeID)
            checkBox.checked = false
            checkBox.disabled = true
            checkBox.parentElement.parentElement.lastElementChild.innerHTML = 'Submitted'
            Employee.submitStatus(employeeID)
            
        });
        //console.log([new Date(),SelectedEmployees])
    }
}

/**
 * To clear all the employeeID's in the global variable whenever the component reloads
 * 
 * Defination done
 */
function releasingEmployees() {
    SelectedEmployees = []
}


/**
 * 
 * @returns true
 * As of now no use of isSelected
 */
function isSelected() {
    if (SelectedEmployees.length == 0) {
        return false;
    }
    return true;
}


export { uncheck, releasingEmployees, isSelected }