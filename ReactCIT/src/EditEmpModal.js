import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditEmpModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'Empleado',{
            method:'PUT',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                AreaId:event.target.AreaId.value,
                AreaNombre:event.target.AreaNombre.value
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
            Editar Area
        </Modal.Title>
    </Modal.Header>    
    <Modal.Body>
            <Row>
                <Col sm={6}>
                    <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="AreaId">
                        
                        <Form.Label>AreaId</Form.Label>
                        <Form.Control 
                        type="text" name="AreaId" required disabled 
                        defaultValue={this.props.arid}
                        placeholder="AreaNombre"/>
                        </Form.Group>

                        <Form.Group controlId="AreaNombre">
                        <Form.Label>AreaNombre</Form.Label>
                        <Form.Control 
                        type="text" name="AreaNombre" required 
                        defaultValue={this.props.arnombre}
                        placeholder="AreaNombre"/>
                        </Form.Group>
                        
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Actualizar Empleado
                            </Button>
                        </Form.Group>
                    </Form>
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