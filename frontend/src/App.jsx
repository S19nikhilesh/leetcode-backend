
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import {Routes, Route, Navigate } from "react-router";
import { checkAuth } from "./authSlice";
import { useDispatch,useSelector } from "react-redux";

import { useEffect } from "react";
import CreateProblem from "./pages/Adminpanel"
import ProblemPage from "./pages/Problempage"

function App() {
  
  //is autenticated hai ya nhi uska code yaha pe hoga 
  const {isAuthenticated,loading,user}=useSelector((state)=>state.auth) //state. slice ka naam

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth()); //function call
  },[dispatch])//ek hi baar call krna chchta hu , jab dispatch change ho -jo kabhi hoga nhi,ya khali array bhi chodd skte ho

  if(loading){
    return<div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }
 //pehle directly siginup page pe redirect hora tha . 
  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated?<Homepage></Homepage>:<Navigate to="/signup"/>}></Route>
        <Route path="/login" element={isAuthenticated?<Navigate to="/"/> :<Login></Login>}></Route>
        <Route path="/signup" element={isAuthenticated?<Navigate to="/"/> :<Signup></Signup>}></Route>
        {/* <Route path="/admin" element={isAuthenticated && user?.role==='admin'?<CreateProblem/>:<Navigate to="/"/>}></Route> */}
        <Route path="/admin" element={<CreateProblem/>}></Route>
        {/* <Route path="/problem/:problemId" element={<ProblemPage/>}></Route> */}
      
      </Routes>
    </>
  )
}

export default App
