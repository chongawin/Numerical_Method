import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from './App';

//Root of Equation
import Bisection from './Method/Bisection';
import False_Position from './Method/False_Position';
import One_Point_Iteration from './Method/One_Point_Iteration';
import Newton_Raphson from './Method/Newton_Raphson';
import Secant from './Method/Secant';

//Linear Algebraic Equation
import Cramers_Rule from './Method/Cramers_Rule'
import Gauss_Elimination from './Method/Gauss_Elimination'
import Gauss_Jordan from './Method/Gauss_Jordan'
import LU_Decomposition from './Method/LU_Decomposition'
import Jacobi_Iteration from './Method/Jacobi_Iteration'
import Gauss_Seidel from './Method/Gauss_Seidel'
import Conjugate_Gradient from './Method/Conjugate_Gradient'

//Interpolation and Extrapolation
import Newton_Divide from './Method/Newton_Divide'
import Largrange_Polynomials from './Method/Largrange_Polynomials'
import Spline_Iterpolation from './Method/Spline_Iterpolation'

const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter>
  <Switch>
    <Route exact path="/" component={App} />
    <Route path="/Bisection" component={Bisection} />
    <Route path="/False_Position" component={False_Position} />
    <Route path="/One_Point_Iteration" component={One_Point_Iteration} />
    <Route path="/Newton_Raphson" component={Newton_Raphson} />
    <Route path="/Secant" component={Secant} />
    
    <Route path="/Cramers_Rule" component={Cramers_Rule} />
    <Route path="/Gauss_Elimination" component={Gauss_Elimination} />
    <Route path="/Gauss_Jordan" component={Gauss_Jordan} />
    <Route path="/LU_Decomposition" component={LU_Decomposition} />
    <Route path="/Jacobi_Iteration" component={Jacobi_Iteration} />
    <Route path="/Gauss_Seidel" component={Gauss_Seidel} />
    <Route path="/Conjugate_Gradient" component={Conjugate_Gradient} />

    <Route path="/Newton_Divide" component={Newton_Divide} />
    <Route path="/Largrange_Polynomials" component={Largrange_Polynomials} />
    <Route path="/Spline_Iterpolation" component={Spline_Iterpolation} />
  </Switch>
</BrowserRouter>,
rootElement
);
