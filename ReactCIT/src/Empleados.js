import React,{Component} from 'react';
import {Table, Button,ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';
import 'bootstrap/dist/css/bootstrap.min.css';


export class Empleados extends Component{

    constructor(props){
        super(props);
        this.state={emps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Empleado')
        .then(response=>response.json())
        .then(data=>{
            this.setState({emps:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid){
        if(window.confirm('¿Estas seguro?')){
            fetch(process.env.REACT_APP_API+'Empleado/'+empid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {emps, empid, empnombre, emparea, fotonombre, fdi}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false}); 
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>EmpleadoId</th>
                        <th>EmpleadoNombre</th>
                        <th>Area</th>
                        <th>Fecha de Inicio</th>
                        <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp=> 
                            <tr key={emp.EmpleadoId}>
                                <td>{emp.EmpleadoId}</td>
                                <td>{emp.EmpleadoNombre}</td>
                                <td>{emp.Area}</td>
                                <td>{emp.FechaDeInicio}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info" 
    onClick={()=>this.setState({editModalShow:true,
        empid:emp.EmpleadoId, empnombre:emp.EmpleadoNombre, emparea:emp.Area, fotonombre:emp.FotoPerfil, fdi:emp.FechaDeInicio})}>
            Editar
        </Button>


    <Button className="mr-2" variant="danger" 
    onClick={()=>this.deleteEmp(emp.EmpleadoId)} > 
            Eliminar
        </Button>

        <EditEmpModal show={this.state.editModalShow}
        onHide={editModalClose}
        empid={empid}
        empnombre={empnombre}
        emparea={emparea}
        fotonombre={fotonombre}
        fdi={fdi}
        />

</ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>    

                <ButtonToolbar>
                    <Button variant="primary" 
                    onClick={()=>this.setState({addModalShow:true})}>
                    Agregar Empleado
                    </Button>

                    <AddEmpModal show={this.state.addModalShow} 
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    } 
}