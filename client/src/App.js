import React from 'react';
import Axios from 'axios';
import validator from 'validator';
import './App.css'

class App extends React.Component {
  constructor(input) {
    super();
    this.state = {
        empId : '',
        firstName : '',
        surName : '',
        email : '',
        dob : '',
        gender : input.gender,
        hideEmpId : true,
        status : 'Create New Employee',
        buttonState : 'Create',
        setEmailError : ''
    };
    this.employeeUrl = 'http://localhost:3000/employee';
  }

  changeHandler = event => {
    let name = event.target.name;
    let value = event.target.value;

    this.setState({[name]: value});

    
  }

 readUpdateDeleteEmp = (mode) => {
  this.setState({ empId:'', firstName:'', surName:'',  email :'',  dob:'',  gender :'',   });
  this.setState({hideEmpId:false});
   
   switch(mode){
     case 'Read':
       this.setState({status: "Read Existing Employee"});
       this.setState({buttonState:"Read"});
       break;
      case 'Update' :
        this.setState({status: "Update Existing Employee"});
        this.setState({buttonState:"Update"});
        break;
      case 'Delete':
        this.setState({status: "Delete Existing Employee"});
        this.setState({buttonState:"Delete"});
        break;  
      default:
        this.setState({status:'Create New Employee' });
        this.setState({buttonState:"Create"});
        this.setState({hideEmpId:true});
   } 
 }
// Add new Employee 
  addNewEmp = (event) => {       
     let EmpDetails = this.addEmp();
     console.log(EmpDetails) ;
  } 

// Read existing employee with given employee ID
  readExistingEmp = (event) => {
    const {empId} = this.state;
    var url = this.employeeUrl+'/'+ empId;    
    Axios.get(url).then((res) => {
    console.log(res);
    this.setState(res.data);
  },
  (error) => {
    alert("Employee Id does not exist");
    console.log(error);
  });      
}

// Update and Delete existing employee with the given ID
updateDelEmployee = (event) =>{
  const {empId} = this.state;
  var url = this.employeeUrl+'/'+ empId;
   switch(this.state.buttonState){
    case 'Update' : 
      const{firstName,surName,email,dob,gender} = this.state;
      Axios.put(url, {
        firstName,surName,email,dob,gender }).then((res) => {
        console.log(res);      
        alert(" Updated Employee");
      },(error)=>{
        console.log(error);
      });
      break;
    case 'Delete':
      Axios.delete(url).then((res)=>{
        console.log(res);       
        alert('Employee Deleted');
        this.setState({ empId:'', firstName:'', surName:'',  email :'',  dob:'',  gender :'',   });
      },(error)=>{
        console.log(error);
      });
      break;  
    default:
      this.addNewEmp();
   }
}
wrapperFunction = ( ) => {
  
  
  if (validator.isEmail(this.state.email)) 
          {
             this.updateDelEmployee();
           } else {
             alert("Incorrect email")
           };


}

//Axios call function block for adding new employee
async  addEmp() {
  const {empId,firstName,surName,email,dob,gender} = this.state; 
  try{
    let addResult = await Axios.post(this.employeeUrl,{empId,firstName,surName,email,dob,gender });
    alert(`Employee ${firstName+" " +surName} created successfully`);
    return addResult;
  }catch(err){
    alert("Employee Id exists");
    console.log(err);
  }
}

render(){
    const showButtonUp = this.state.hideEmpId ?{display :'none'} :{display:'block' ,float:'right'};
    const showButtonDown =  this.state.buttonState==="Read" ? {display:'none' }: {display:'block' ,float:'right'};
    return (     
      <div className="App">
        <div className='App-header'>
        <h1>Employee Management</h1>
        <h3>Open Book Assignment by Madhan Kumar T</h3>
          <button onClick={this.readUpdateDeleteEmp.bind(this,'Create')}>Create</button>
          <button onClick={this.readUpdateDeleteEmp.bind(this,'Read')}>Read</button>
          <button onClick={this.readUpdateDeleteEmp.bind(this,'Update')}>Update</button>
          <button onClick={this.readUpdateDeleteEmp.bind(this,'Delete')}>Delete</button>
        <br/> <hr/>
       </div>
       <div className='empDtl'>     
         <p>{this.state.status}</p>        
        <table className="readEmp">
          <tbody>
           <tr>
             <td ><label >Employee ID</label> </td>
             <td><input type='text' name='empId' value={this.state.empId}
                        onChange={this.changeHandler} required></input></td>
           </tr>
           <tr>
             <td></td>
             <td style={showButtonUp}><input type='button' value='Read' onClick={this.readExistingEmp.bind(this)}/></td>
           </tr>    
         </tbody> 
       </table>   
        <hr/>    
       <table>  
        <tbody>        
          <tr>
             <td><label >First Name</label>  </td>
             <td><input type='text' name='firstName' value={this.state.firstName}
                        onChange={this.changeHandler} required></input>
             </td>
          </tr>
          <tr>
             <td><label>Last Name</label> </td>
             <td><input type='text' name='surName' 
                    value={this.state.surName}
                    onChange={this.changeHandler} required></input>
              </td>
          </tr>
          <tr>
             <td> <label >Email</label> </td>
             <td> <input type='email'  name='email'  value={this.state.email}
                    onChange={  this.changeHandler }required></input>
             </td>
          </tr>     
          <tr>
             <td> <label >Date of Birth</label>  </td>
             <td><input type='date' name='dob' value={this.state.dob}
                    onChange={this.changeHandler} ></input></td>
          </tr>
          <tr>
             <td> <label >Gender</label>  </td>
             <td>                
                 <input type ='radio' name='gender' value='Male' checked={this.state.gender==='Male'}
                    onChange={this.changeHandler}/>Male&nbsp; &nbsp; 
                <input type ='radio'  name='gender' value='Female' checked={this.state.gender==='Female'}
                    onChange={this.changeHandler}/>Female </td>
          </tr>
          <tr>
             <td></td>
             <td><input type='button' style={showButtonDown} value={this.state.buttonState } onClick={  this.wrapperFunction }/></td>
          </tr> 
        </tbody>   
      </table> <br/>
    </div>
  </div>
 );
}}

export default App;
