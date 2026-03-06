import React from 'react'
import { useState ,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function useEmployeeUpdate() {
      const navigate=useNavigate();
  // Example pre-filled data (later replace with API fetch)

 

  const toggleStatus = () => {
    setEmployee({ ...employee, active: !employee.active });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log("Updated employee:", employee);
  };
  const Cancel=()=>{
    alert("Employee Updated Successfully!");
    navigate("/dashboard/employee/display");
  }

    const [formData,setFormData]=useState({
        // fullname:''|| emp.fullname,
        // email:''|| emp.email,
        // phone:''|| emp.phone,
        fullname:"",
        email:"",
        phone:"",
     
        
    })
    console.log("formData ", formData);
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

 

    
    return {
        formData,
        setFormData,
        handleChange,
        handleSubmit,
        Cancel,
        toggleStatus,
       
    }
 
}

export default useEmployeeUpdate