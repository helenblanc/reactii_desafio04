import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AppContext from '../app_context';


/* LLAMADO DE API PIZZAS */
async function apiPizzas() {
    let newData = []
    try {
        const url = 'http://localhost:3000/api/pizzas.json';
        console.log('call api: ', url)
        // Documentacion API https://rickandmortyapi.com/documentation
        const response = await fetch(url);
        //console.log('response: ', response.text())
        let dataJ = await response.text();
        dataJ =  JSON.parse(dataJ)
        console.log('dataJ: ', dataJ)
        newData = dataJ.sort((a, b) => {
            //  ORDENAR POR NOMBRE DE LA A A LA Z
            if (a.id < b.id) {
                return -1;
            }
        });
    } catch (ex) {
        console.log(ex)
    }
    return newData;
};

// FUNCIÓN QUE CREA UN COMPONENTE HOME
export const Home = () => {
    console.log('LOADING HOME...')
    // CARGANDO VARIABLE DATA GLOBAL
    const { data, setData } = useContext(AppContext) 
    // CREANDO HOOK LOCAL ID
    const [id, setId] = useState("");
    console.log('CREATE HOOK PIZZAS')
    // CREANDO HOOK LOCAL DE COMPONENTE CHARACTERS
    const [pizzas, setPizzas] = useState([])    
    // CREANDO HOOK PARA RENDERIZAR 
    useEffect(() => {
        console.log('call apiPizza()')
        //FUNCIÓN ASINCRONA LLAMADO A API RICK AND MORTY
        const fetchData = async () => {
            const arr = await apiPizzas();
            //ACTUALIZACIÓN ESTADO VARIABLE PIZZAS
            setPizzas(arr);
        };

        fetchData();
    }, []);

    console.log('Pizzas', pizzas)

    // FUNCIÓN PARA REDIRECCIONAR DE FORMA PROGRAMATICA
    const navigate = useNavigate();
    const detail = (id) => {
        navigate('/character/'+id);
    };

    /* FUNCIÓN QUE CREA UN CARD CON LOS DATOS EN PERSONAJE DE RICK Y MORTY*/
    const card = (pizza, index) => {
        // LISTA DE INGREDIENTES
        const ingredients = pizza.ingredients.map(function (ingredient, index) {
            // GENERACIÓN HTML LISTA INGREDIENTES
            return <Col className='col-6 bg-white border rounded border-danger text-center my-2'> {ingredient} </Col>
        });

        //console.log('load card: ', character)
        return (
            <Col key={pizza.id} className="col-6">
                <Card  className='m-4 p-4'>
                    <Card.Img variant="top" className='rounded' src={pizza.img} alt={pizza.name} />
                    <Card.Body >
                        <Card.Title className='text-uppercase text-secondary'>{pizza.name}</Card.Title>
                        <Card.Text>
                            <Row className='text-danger align-middle text-sm text-capitalize'>
                                { ingredients }
                            </Row>
                            <Row className='text-lg'>
                                <h4 className="text-center" >${pizza.price}</h4>
                            </Row>
                        </Card.Text>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
            </Col>);
    };

    /* FUNCIÓN QUE CREARA LOS CARDS */
    const cards = (pizzas) => {
        try {
            //console.log('load cards: ', characters)
            // RECORRER LISTA INGRESADA
            const cards = pizzas.map(function (pizzas, index) {
                //INVOCAR FUNCIÓN PARA GENERAR UN CARD
                return card(pizzas, index)
            });
            return (<Row id="" className="g-6">{cards}</Row>);
        } catch (ex) {
            console.log(ex)
            return (<Row id="" className="g-6"></Row>);
        }
    };

    // CREACIÓN DE COMPONENTE HOME
    return (
        <div style={{ maxWidth: "1024px", margin: '0 auto', alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }}>
            <Form >
                <Row>
                    <Col md>
                    </Col>
                </Row>
                {cards(pizzas)}
            </Form>
        </div>
    );
};

export default Home;