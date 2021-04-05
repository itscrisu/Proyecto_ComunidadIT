import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form, Image} from 'react-bootstrap';

export class AddEmpModal extends Component{
    constructor(props){
        super(props);
        this.state={ares:[]}
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    fotonombre = "anon.png";
    imagesrc = process.env.REACT_APP_FOTOSPATH+this.fotonombre;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'Area')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ares:data});
        });
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Empleado',{
            method:'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                EmpleadoNombre:event.target.EmpleadoNombre.value,
                Area:event.target.Area.value,
                FechaDeInicio:event.target.FechaDeInicio.value,
                FotoPerfil:this.fotonombre
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Error');
        })
    }

    handleFileSelected(event){
        event.preventDefault();
        this.fotonombre=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "miArchivo",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Empleado/GuardarArchivo',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_FOTOSPATH+result;
        },
        (error)=>{
            alert('Error');
            console.log(error);
        })
        
    }

    render(){
        return(
            <div className="container">
<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Agregar Empleado
        </Modal.Title>
    </Modal.Header>    
    <Modal.Body>       
            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    
                        <Form.Group controlId="EmpleadoNombre">
                        <Form.Label>EmpleadoNombre</Form.Label>
                        <Form.Control type="text" name="EmpleadoNombre" 
                        required placeholder="EmpleadoNombre"/>
                        </Form.Group>
                        
                        <Form.Group controlId="Area">
                        <Form.Label>Area</Form.Label>
                        <Form.Control as="select">
                            {this.state.ares.map(are=>
                                <option key={are.AreaId}>{are.AreaNombre}</option>)}
                        </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="FechaDeInicio">
                        <Form.Label>Fecha de Inicio</Form.Label>
                        <Form.Control 
                        type="date"
                        name="FechaDeInicio" required
                        placeholder="Fecha de Inicio"
                        />
                        </Form.Group>
                        
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Agregar Empleado
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>

                <Col sm={6}>
                    <Image width="200px" height="200px" src={this.imagesrc}/>
                    <input onChange={this.handleFileSelected} type="File"/>
                </Col>
            </Row>
    </Modal.Body>

        <Modal.Footer>
            <Button variant="danger" onClick={this.props.onHide}>Cerrar</Button>
        </Modal.Footer>
</Modal>


            </div>
        )
    }
}