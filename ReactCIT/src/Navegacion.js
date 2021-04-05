import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class Navegacion extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/">
                    Inicio
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/Areas">
                    Areas
                </NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/Empleados">
                    Empleados
                </NavLink>

                </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}