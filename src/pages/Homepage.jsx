import Menu from "../components/Menu";
import Nav from "../components/Nav";
import Main from "../components/Main";

function Homepage() {
    return (
        <>
            <Menu />
            <div className="main-container">
                <Nav />
                <Main />
            </div>
        </>
    );
}

export default Homepage;
