import { NavLink } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export const NavbarPage = () => {
    const setActiveClass = ({ isActive }) => (isActive ? "ms-3 text-decoration-none text-white" : "ms-3 text-decoration-none text-secondary");
    return (
        <Navbar fixed="bottom" variant="my-4">
            <Container className="justify-content-start">
                <Navbar.Brand>
                    <img
                        className="d-block"
                        src="http://localhost:3000/api/designevo-mammamia_162x81.PNG"
                        alt="First slide"
                    />
                </Navbar.Brand>
                <div className="bg-dark rounded w-100 navbar navbar-expand">
                    <NavLink className={setActiveClass} to="/" >
                        Home
                    </NavLink>
                    <NavLink className={setActiveClass} to="/favorite" >
                        Favorite
                    </NavLink>
                </div>
                <div>                    <img
                        className="d-block"
                        src="http://localhost:3000/api/designevo-mammamia_162x81.PNG"
                        alt="First slide"
                    /></div>
            </Container>
        </Navbar>
    );
};

export default NavbarPage;