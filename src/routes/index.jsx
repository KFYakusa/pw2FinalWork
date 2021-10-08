
import React from 'react'
import { Route, Switch,Redirect } from 'react-router-dom'
import PrivateRoute  from './PrivateRoute'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Admin from '../pages/Admin'
import FilmesAdmin from '../pages/Admin/FilmesAdmin'
import CategoriasAdmin from '../pages/Admin/CategoriasAdmin'


const Routes = ()=> (    
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <PrivateRoute exact path="/adm" component={Admin}/>
            <PrivateRoute exact path="/filme" component={FilmesAdmin}/>
            <PrivateRoute exact path="/categoria" component={CategoriasAdmin}/>
            <Route path="*">
                <Redirect to="/"/>
            </Route>
        </Switch>
)

export default Routes
