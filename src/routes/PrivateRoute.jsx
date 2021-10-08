import React from 'react'
import { Redirect, Route } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ component: Component, ...props})=> {
    const {isAuth} = useAuth()
    
    return(
    <Route {...props} render={
        ()=>isAuth? <Component {...props} />  :  <Redirect to="/login"/> 
    }/>
    )
};

export default PrivateRoute