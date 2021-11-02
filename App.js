import React from 'react';
import Axios from 'axios';
import './App.css'


class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
        empId:'',
        firstName:'',
        surName:'',
        email :'',
        dob:'',
        gender :'',    
        hideEmpId:true,
        status:'Create New Employee',
        btnVl:'Create'
    };
    this.empApiUrl='http://localhost:5000/employee';
  }

  changeHandler = (event)=>{
    let name = event.target.name;
    let value = event.target.value;
    this.setState({[name]: value});
  }

 readUpdateDelEmp=(mode)=>{
  this.setState({ empId:'', firstName:'', surName:'',  email :'',  dob:'',  gender :''   });
  this.setState({hideEmpId:false})  
   
   switch(mode){
     case 'Read':
       this.setState({status: "Read Existing Employee"});
       this.setState({btnVl:"Read"})
       break;
      case 'Update' :
        this.setState({status: "Update Existing Employee"});
        this.setState({btnVl:"Update"})
        break;
      case 'Delete':
        this.setState({status: "Delete Existing Employee"});
        this.setState({btnVl:"Delete"})
        break;  
      default:
        this.setState({status:'Create New Employee' });
        this.setState({btnVl:"Create"})
        this.setState({hideEmpId:true})
   } 
 }

// Adding new employee

  addNewEmp =(event)=>{       
     let rst = this.call();
     console.log(rst) ;
  } 

// Reading employee with given emp id

  readEstEmp =(event)=>{
    const{empId} = this.state;
    var url = this.empApiUrl+'/'+ empId;    
    Axios.get(url).then((res)=>{
    console.log(res)       
    this.setState(res.data)
  },
  (error)=>{
    alert("Employee Id is not Exist");
    console.log(error)
  });          
}

// Updating employee details

updateDelEmployee =(event) =>{
  const{empId} = this.state;
  var url = this.empApiUrl+'/'+ empId;
   switch(this.state.btnVl){
    case 'Update' :        
      const{firstName,surName,email,dob,gender} = this.state;
      Axios.put(url, {
        firstName,surName,email,dob,gender }).then((res)=>{
        console.log(res)      
        alert(" Successfully Updated Employee")
      },(error)=>{
        console.log(error)
      });
      break;
    case 'Delete':
      Axios.delete(url).then((res)=>{
        console.log(res)       
        alert('Employee Deleted')
        this.setState({ empId:'', firstName:'', surName:'',  email :'',  dob:'',  gender :'',   });
      },(error)=>{
        console.log(error)
      });
      break;  
    default:
      this.addNewEmp();
   }
}

async  call() {
  const {empId,firstName,surName,email,dob,gender} = this.state; 
  try{
    var result = await Axios.post(this.empApiUrl,{}, {params: {empId,firstName,surName,email,dob,gender }});
    return result;
  }
  catch(err){
    console.log(err);
  }
}
  render(){
    const style = this.state.hideEmpId ?{display :'none'} :{display:'block' ,float:'right'};
    const showBtn =  this.state.btnVl==="Read" ? {display:'none' }: {display:'block' ,float:'right'} ;       
    return (  
         
      <div className="App">
        <div className='App-header'>
        
        <h1>Employee Management</h1>
        <h3>Open Book Assignment by Madhan_Kumar_T</h3>
        <ul>
          <li><button    onClick={this.readUpdateDelEmp.bind(this,'Create')}>Create</button></li>
          <li><button   onClick={this.readUpdateDelEmp.bind(this,'Read')}>Read</button></li>
          <li><button   onClick={this.readUpdateDelEmp.bind(this,'Update')}>Update</button></li>
          <li><button   onClick={this.readUpdateDelEmp.bind(this,'Delete')}>Delete</button></li>
        </ul><br/>
        <hr/>
       </div>
       <div className='empDtl'>     
        <p>{this.state.status}</p>        
       <label >Employee ID</label> 
              <input type='text' name='empId' value={this.state.empId} onChange={this.changeHandler} required></input>
          <input type='button'  value='Read' style={style} onClick={this.readEstEmp.bind(this)}/>
        <hr/>    
        <ul> <label >First Name</label> 
             <input type='text' name='firstName' value={this.state.firstName} onChange={this.changeHandler} required></input>
           <label >Last Name</label>&nbsp; 
             <input type='text'  name='surName' value={this.state.surName} onChange={this.changeHandler} required></input>
              <label >Email</label>
              <input type='email'  name='email'  value={this.state.email} onChange={this.changeHandler} required></input>
               <label >Date of Birth</label>&nbsp;  
              <input type='date' name='dob'  value={this.state.dob} onChange={this.changeHandler} ></input>
                     <label >Gender</label> &nbsp; &nbsp;                
                 <input type ='radio'  name='gender'   value='Male' checked={this.state.gender==='Male'}  onChange={this.changeHandler}/>Male&nbsp; &nbsp; 
                <input type ='radio' name='gender'  value='Female' checked={this.state.gender==='Female'}  onChange={this.changeHandler}/>Female  </ul>
                <input type='button' style={showBtn} value={this.state.btnVl}  onClick={this.updateDelEmployee}/>
  <br/>  
       </div>
      </div>
    );
  }
}

export default App;