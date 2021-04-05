import React,{Component} from 'react';
import {Table, Button,ButtonToolbar} from 'react-bootstrap';
import {AddAreaModal} from './AddAreaModal';
import {EditAreaModal} from './EditAreaModal';
import 'bootstrap/dist/css/bootstrap.min.css';


export class Areas extends Component{

    constructor(props){
        super(props);
        this.state={ares:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'Area')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ares:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteArea(arid){
        if(window.confirm('¿Estas seguro?')){
            fetch(process.env.REACT_APP_API+'Area/'+arid,{
                method:'DELETE',
                header:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
        }
    }
    
    render(){
        const {ares, arid, arnombre}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false}); 
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>AreaId</th>
                        <th>AreaNombre</th>
                        <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ares.map(are=> 
                            <tr key={are.AreaId}>
                                <td>{are.AreaId}</td>
                                <td>{are.AreaNombre}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info" 
    onClick={()=>this.setState({editModalShow:true,
        arid:are.AreaId, arnombre:are.AreaNombre})}>
            Editar
        </Button>


    <Button className="mr-2" variant="danger" 
    onClick={()=>this.deleteArea(are.AreaId)} > 
            Eliminar
        </Button>

        <EditAreaModal show={this.state.editModalShow}
        onHide={editModalClose}
        arid={arid}
        arnombre={arnombre}/>

</ButtonToolbar>

                                </td>
                            </tr>)}
                    </tbody>
                </Table>    

                <ButtonToolbar>
                    <Button variant="primary" 
                    onClick={()=>this.setState({addModalShow:true})}>
                    Agregar Area
                    </Button>

                    <AddAreaModal show={this.state.addModalShow} 
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    } 
}