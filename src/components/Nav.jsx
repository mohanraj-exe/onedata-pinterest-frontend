import "../styles/Nav.css";
import { Avatar } from '@chakra-ui/react'

function Nav() {
    return (
        <>
            <nav className="nav">
                <input type="text" placeholder="Search"/>
                <Avatar size='sm' bg='gray.400' name='Mohanraj S' src='https://bit.ly/tioluwani-kolawole' />
                {/* <a href="#">Home</a> */}
            </nav>
        </>
    )
}

export default Nav;