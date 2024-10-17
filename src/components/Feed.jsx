import { useNavigate } from "react-router-dom";
import "../styles/Feed.css";
import { useEffect, useState } from "react";

function Feed() {

    const [pin, setPin] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/pin_all');
                const result = await response.json();
                // console.log(result.data);
                setPin(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {pin.length > 0 ? (
                <section className="feed">
                    {pin.map(item => (
                        <article key={item._id} onClick={() => navigate(`/pin/${item._id}`)}>
                            <img src={item.img} alt="pin-image" />
                        </article>
                    ))}
                </section>
            ) : (
                <p>Loading...</p>
            )}
        </>
    )
}

export default Feed;