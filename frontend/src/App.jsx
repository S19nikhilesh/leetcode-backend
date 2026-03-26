
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {Routes, Route, Navigate } from "react-router";
import { checkAuth } from "./authSlice";
import { useDispatch,useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import { useEffect } from "react";


function App() {
  
  //is autenticated hai ya nhi uska code yaha pe hoga 
  const {isAuthenticated}=useSelector((state)=>state.auth) //state. slice ka naam

  const dispatch=useDispatch();
  
  useEffect(()=>{
    dispatch(checkAuth()); //function call
  },[dispatch])//ek hi baar call krna chchta hu , jab dispatch change ho -jo kabhi hoga nhi,ya khali array bhi chodd skte ho


  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated?<Homepage></Homepage>:<Navigate to="/signup"/>}></Route>
        <Route path="/login" element={isAuthenticated?<Navigate to="/"/> :<Login></Login>}></Route>
        <Route path="/signup" element={isAuthenticated?<Navigate to="/"/> :<Signup></Signup>}></Route>
        {/* 
        <Route path="/"><Homepage></Homepage></Route>
        <Route path="/login" ><Login></Login></Route>
        <Route path="/signup" ><Signup></Signup></Route> */}
      </Routes>
    </>
  )
}

export default App
