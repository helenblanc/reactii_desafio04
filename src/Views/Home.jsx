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
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AppContext from '../app_context';


/* LLAMADO DE API PIZZAS */
async function apiPizzas() {
    let newData = []
    try {
        const base = window.location.hostname;
        console.log('base: ', base)
        const url = 'http://' + base + ':3000/api/pizzas.json';
        console.log('call api: ', url)
        const response = await fetch(url);
        //console.log('response: ', response.text())
        let dataJ = await response.text();
        dataJ = JSON.parse(dataJ)
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
    const { cart, setCart } = useContext(AppContext)
    // CREANDO HOOK LOCAL ID
    const [localCart, setLocalCart] = useState({ 'pizzas': [], 'quantity': 0, 'pay': 0 });
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
            //setLocalCart({ 'pizzas': [], 'quantity': 0, 'pay': 0 });
        };

        fetchData();
    }, []);

    console.log('Pizzas', pizzas)

    // FUNCIÓN PARA REDIRECCIONAR DE FORMA PROGRAMATICA
    /*const navigate = useNavigate();
    const detail = (id) => {
        navigate('/character/' + id);
    };*/

    /* FUNCIÓN QUE CREA UN CARD CON LOS DATOS EN PERSONAJE DE RICK Y MORTY*/
    const card = (pizza, index) => {
        // LISTA DE INGREDIENTES
        const ingredients = pizza.ingredients.map(function (ingredient, index) {
            // GENERACIÓN HTML LISTA INGREDIENTES
            return <Col className='col-12 bg-white my-1'> {ingredient} </Col>
            //return <></>
        });

        //console.log('load card: ', character)
        return (
            <Col key={`col-card-${pizza.name}${index}`} className="col-lg col-md-5 my-4" style={{ minWidth: "350px" }}>
                <Card key={`card-${pizza.name}${index}`} className='m-1' >
                    <Card.Img key={`card-img-${pizza.name}${index}`} variant="top" className='rounded' src={pizza.img} alt={pizza.name} />
                    <Card.Body key={`card-body-${pizza.name}${index}`}>
                        <Card.Title key={`card-title-${pizza.name}${index}`} className='text-uppercase text-secondary'><span style={{ height: "" }}>{pizza.name}</span></Card.Title>
                        <Card.Text>
                            <span key={`card-text-${pizza.name}${index}`} className="row text-center m-2" >${pizza.price}</span>
                        </Card.Text>
                        <Row className='row'>
                            <Col className='col-lg my-1 mx-1'>
                                <Button onClick={(e) => { click(e.target, pizza, index) }} className='btn btn-primary icon bi-cart-plus text-right'></Button>
                                <Card.Link className='btn btn-danger icon bi-cart-dash-fill text-right' href="#"></Card.Link>
                            </Col>
                            <Col>
                                <OverlayTrigger
                                    trigger="click"
                                    key={`overlay-trigger-${pizza.name}${index}`}
                                    placement="top"
                                    overlay={
                                        <Popover id={`popover-${pizza.name}${index}`}>
                                            <Popover.Header id={`popover-title-${pizza.name}${index}`} as="h3" className='text-white bg-dark'>INGREDIENTES</Popover.Header>
                                            <Popover.Body id={`popover-body-${pizza.name}${index}`}>
                                                <Row className='row text-danger text-sm text-capitalize'>
                                                    <Col className='col-12 bg-white my-1'> <img src={pizza.img} alt="" className='col-12' /> </Col>
                                                    {ingredients}
                                                </Row>

                                            </Popover.Body>
                                        </Popover>
                                    }
                                >
                                    <Button variant="secondary" className='btn btn-dark icon bi-search'></Button>
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col >);
    };

    // FUNCIÓN QUE PERMITE ACTUALIZAR EL ESTADO DE UN OBJETO EN LA VARIABLE LOCAL Y GLOBAL
    const click = (target, pizza, index) => {
        //console.log('target: ', target);
        console.log('click: ', pizza);
        console.log('localCart', localCart);
        let newD = { 'pizzas': [], 'quantity': 0, 'pay': 0 }
        //if (localCart === undefined) {
        //newD.pizzas = [{ 'name': pizza.name, 'price': pizza.price, 'quantity': 1 }];
        //} else {
        let arr = localCart.pizzas.slice(0);
        let add = false;
        localCart.pizzas.forEach(function (e, index) {
            if (e.name = pizza.name) {
                console.log('e.name: ', e.name);
                console.log('pizza.name: ', pizza.name);
                console.log('e.quantitye: ', e.quantity);
                e.quantity = e.quantity + 1;
                console.log('e.quantitye: ', e.quantity);
                add = true;
            }
        });
        if (!add) {
            // COPIA DE LA LISTA LOCAL
            arr.push({ 'name': pizza.name, 'price': pizza.price, 'quantity': 1 });
        }
        newD.pizzas = arr;
        //}
        let quantity = 0;
        let pay = 0;
        newD.pizzas.forEach(function (e, index) {
            quantity = quantity + e.quantity;
            pay = pay + (e.quantity * parseInt(e.price));
        });
        console.log('quantity:', quantity)
        console.log('pay:', pay)
        newD.quantity = quantity;
        newD.pay = pay;
        setLocalCart(newD);
        console.log('newD', newD);
        console.log('localCart', localCart);
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
            return (<Row id={`row-pizzas`} className="mx-4">{cards}</Row>);
        } catch (ex) {
            console.log(ex)
            return (<Row id={`row-pizzas`} className="row"></Row>);
        }
    };

    // CREACIÓN DE COMPONENTE HOME
    return (
        <div>
            <div className='' style={{ margin: '0 auto', alignItems: "center", justifyContent: "center", marginTop: '20px', marginBottom: '20px' }}>
                <Form >
                    {cards(pizzas)}
                </Form>
            </div>
            <div class="fixed-bottom">
                <Row >
                    <a className="m-1 p-1"  href=""><span style={{ minWidth: "150px" }} className='icon bi-cart-plus btn btn-warning mt-1 '><span className="">{localCart.quantity}</span></span></a>
                    <a className="m-1 p-1" href=""><span style={{ minWidth: "150px" }} className='icon bi-credit-card btn btn-warning mt-1'><span className="">{localCart.pay}</span></span></a>
                </Row>
            </div>
        </div>

    );
};

export default Home;