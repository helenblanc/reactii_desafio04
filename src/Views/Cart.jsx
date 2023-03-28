import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from 'react';
import AppContext from '../app_context';

// FUNCIÓN QUE CREA UN COMPONENTE CART
export const Cart = () => {

    console.log('LOADING CART...')
    // CARGANDO VARIABLE DATA GLOBAL
    const { cart, setCart } = useContext(AppContext)
    console.log('cart: ', cart)
    // CREANDO HOOK LOCAL DE COMPONENTE PIZZAS
    const [localCart, setLocalCart] = useState({ 'pizzas': [], 'quantity': 0, 'pay': 0 })

    // CREANDO HOOK PARA RENDERIZAR
    useEffect(() => {
        let newCart = { 'pizzas': cart.pizzas, 'quantity': cart.quantity, 'pay': cart.pay };
        console.log('newCart: ', newCart);
        setLocalCart(newCart);
    }, []);

    const row = (pizza) => {
        return (
            <Row className='border-top border-bottom border-dark m-2 p-2'>
                <Col className='col-5'>
                    <img style={{ maxWidth: '150px' }} src={pizza.img} alt={pizza.name} />
                </Col>
                <Col className='col-7 m-auto text-uppercase'>
                    <Col className='col-12 m-2 p-2'>
                        <span className='m-2 p-2 border-bottom border-dark'>
                            <strong style={{ width: '150px' }}className='m-2 p-2'>{pizza.name}</strong>
                        </span>
                    </Col>
                    <Col className='col-12'>
                        <span className='m-2 p-2'>
                            <strong style={{ width: '150px' }} className='m-2 p-2'>CANTIDAD:</strong>{pizza.quantity}
                        </span>
                    </Col>
                    <Col className='col-12'>
                        <span className='m-2 p-2'>
                            <strong className='m-2 p-2'>PRECIO:</strong>{pizza.price}
                        </span>
                    </Col>
                    <Col className='col-12'>
                        <span className='m-2 p-2'>
                            <strong className='m-2 p-2'>SUBTOTAL:</strong>{pizza.quantity * pizza.price}
                        </span>
                    </Col>
                </Col>
            </Row>);
    }

    const rows = (pizzas) => {
        const newPizzas = pizzas.map(function (pizza) {
            return row(pizza);
        });
        console.log('rows: ', newPizzas);
        return (<>{newPizzas}</>);
    }

    return (
        <>
            {rows(localCart.pizzas)}
            <Row >
                <Col className='text-center'><strong className='m-4 p-4'>TOTAL:</strong>{localCart.pay}</Col>
            </Row>
            <div class="fixed-bottom m-4">
                <Row style={{ width: "250px" }} className="btn btn-primary">
                    <a style={{ width: "150px" }}>
                        <span style={{ width: "150px" }} className='col-12 icon bi-credit-card mx-1'><span className='mx-1'>PAY</span></span>
                        <span style={{ width: "150px" }} className='col-12 mx-3'>{localCart.pay}</span>
                    </a>
                </Row>
            </div>
        </>
    );
}

export default Cart;