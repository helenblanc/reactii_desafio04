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
    // CREANDO HOOK LOCAL DE COMPONENTE PIZZAS
    const [pizzas, setPizzas] = useState([])
    // CREANDO HOOK PARA RENDERIZAR 
    useEffect(() => {
        console.log('call apiPizza()')
        //FUNCIÓN ASINCRONA LLAMADO A API RICK AND MORTY
        const fetchData = async () => {
            const arr = await apiPizzas();
            //ACTUALIZACIÓN ESTADO VARIABLE PIZZAS
            setPizzas(arr);
            setLocalCart(cart);
        };

        fetchData();
    }, []);

    console.log('Pizzas', pizzas)

    /* FUNCIÓN QUE CREA UN CARD CON LOS DATOS EN PERSONAJE DE RICK Y MORTY*/
    const card = (pizza, index) => {
        // LISTA DE INGREDIENTES
        const ingredients = pizza.ingredients.map(function (ingredient, index) {
            // GENERACIÓN HTML LISTA INGREDIENTES
            return <Col className='col-12 bg-white my-1 text-capitalize'> {ingredient} </Col>
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
                                <Button onClick={(e) => { add(e.target, pizza, index) }} className='btn btn-primary icon bi-cart-plus text-right mx-2'></Button>
                                <Button onClick={(e) => { dash(e.target, pizza, index) }} className='btn btn-danger icon bi-cart-dash-fill text-right mx-2'></Button>
                            </Col>
                            <Col>
                                <OverlayTrigger
                                    trigger="click"
                                    key={`overlay-trigger-${pizza.name}${index}`}
                                    placement="top"
                                    overlay={
                                        <Popover id={`popover-${pizza.name}${index}`}>
                                            <Popover.Header id={`popover-title-${pizza.name}${index}`} as="h3" className='text-white bg-dark text-uppercase'>{pizza.name}</Popover.Header>
                                            <Popover.Body id={`popover-body-${pizza.name}${index}`}>
                                                <Row className='row text-danger text-sm'>
                                                    <Col className='col-12 bg-white my-1'> <img src={pizza.img} alt="" className='col-12' /> </Col>
                                                    <span className='text-dark text-justify my-2'>{pizza.desc}</span>
                                                    <strong>INGREDIENTES:</strong>
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

    // FUNCIÓN PARA REDIRECCIONAR DE FORMA PROGRAMATICA
    const navigate = useNavigate();
    const cartRedirect = () => {
        navigate('/cart');
    };

    // FUNCIÓN QUE PERMITE ACTUALIZAR EL CART
    const updateCart = (pizza, cart, add) => {
        // SE CREA COPIA DE LISTADO DE PIZZAS
        let pizzas = cart.pizzas.slice(0);
        // VARIABLE PARA DETERMINAR SI SE ENCONTRO LA PIZZA DENTRO DEL CARRO
        let finded = false;
        // RECORRIENDO LISTA COPIA DE PIZZAS
        pizzas.forEach(function (e) {
            //SI EXISTE SE AGREGA O QUITA A LA CANTIDAD DE PIZZAS
            if (e.name === pizza.name) {
                if (add) {
                    e.quantity = e.quantity + 1;
                } else {
                    e.quantity = e.quantity - 1;
                }
                finded = true;
            }
        });
        // SE AGREGA PIZZA A CARRITO DE NO EXISTIR
        if (!finded && add) {
            pizzas.push({ 'name': pizza.name, 'price': pizza.price, 'quantity': 1, 'img': pizza.img });
        }
        // ELIMINAR PIZZAS CON CANTIDAD 0
        let arr = [];
        pizzas.forEach(function (e) {
            if (e.quantity >= 0) {
                arr.push(e);
            }
        });
        // CALCULAR MONTO A PAGAR Y CANTIDAD DE PIZZAS
        let quantity = 0;
        let pay = 0;
        arr.forEach(function (e) {
            quantity = quantity + e.quantity;
            pay = pay + (e.quantity * e.price);
        });
        const newCart = { 'pizzas': arr, 'quantity': quantity, 'pay': pay };
        return newCart;
    };

    // FUNCIÓN QUE PERMITE AGREGAR UNA PIZZA AL CART
    const add = (target, pizza, index) => {
        console.log('pizzas: ', pizzas);
        let cart = { 'pizzas': [], 'quantity': 0, 'pay': 0 }
        if (localCart !== undefined) {
            cart = localCart;
        }
        console.log('cart: ', cart);
        const newCart = updateCart(pizza, cart, true);
        setLocalCart(newCart);
        setCart(newCart);
        console.log('cart: ', cart);
    };

    // FUNCIÓN QUE PERMITE QUITAR UNA PIZZA AL CART
    const dash = (target, pizza, index) => {
        console.log('pizzas: ', pizzas);
        let cart = { 'pizzas': [], 'quantity': 0, 'pay': 0 }
        if (localCart !== undefined) {
            cart = localCart;
        }
        console.log('cart: ', cart);
        const newCart = updateCart(pizza, cart, false);
        setLocalCart(newCart);
        setCart(newCart);
        console.log('cart: ', cart);
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
            <div class="fixed-bottom m-4">
                <Row style={{ width: "250px" }} className="btn btn-warning">
                    <a style={{ width: "150px" }} onClick={(e) => { cartRedirect() }}>
                        <span style={{ width: "150px" }} className='col-12 icon bi-cart-plus mx-3'><span className="mx-2">{localCart.quantity}</span></span>
                        <span style={{ width: "150px" }} className='col-12 icon bi-credit-card mx-3'><span className="mx-2">{localCart.pay}</span></span>
                    </a>
                </Row>
            </div>
        </div>

    );
};

export default Home;