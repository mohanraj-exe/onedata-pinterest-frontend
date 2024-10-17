import "../styles/Menu.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCompass,
    faPlusCircle,
    faBell,
    faMessage,
    faGear
} from "@fortawesome/free-solid-svg-icons";
import { faPinterest } from "@fortawesome/free-brands-svg-icons";

function Menu() {
    return (
        <>
            <aside className="menu">
                <ul>
                    <li><a href="#"><FontAwesomeIcon icon={faPinterest} size="xl" color="#e60023" /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faCompass} size="xl" /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faPlusCircle} size="xl" /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faBell} size="xl" /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faMessage} size="xl" /></a></li>
                    <li><a href="#"><FontAwesomeIcon icon={faGear} size="xl" /></a></li>
                </ul>
            </aside>
        </>
    )
}

export default Menu;