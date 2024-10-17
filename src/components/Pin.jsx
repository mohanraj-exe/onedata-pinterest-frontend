import React from 'react';
import { useState } from 'react';
import "../styles/Pin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
} from "@fortawesome/free-solid-svg-icons";

function Pin() {
    const [pin, setPin] = useState({
        likes: 50,
        isliked: false,
        followers: 100,
        isFollowed: false,
        // comments: [{
        //     id:
        // }]
    });

    const handleLikes = (e) => {
        // console.log(e);
        setPin(prevState => ({ ...prevState, isliked: !pin.isliked }))
    }

    const handleFollowers = () => {
        // console.log(e);
        setPin(prevState => ({ ...prevState, isFollowed: !pin.isFollowed }))
    }
    return (
        <>
            <section className='main-content'>
                <main className="pin">
                    <img src='restaurantfood.jpg' alt="restaurant-food-serving" />
                    <article className='pin-info'>
                        <p>
                            <button onClick={handleLikes}>
                                {pin.isliked ? <FontAwesomeIcon icon={faHeart} size="xl" color='#e60023' /> :
                                    <FontAwesomeIcon icon={faHeart} size="xl" color='#808080' />
                                }</button> &nbsp;
                            {pin.isliked ? pin.likes + 1 : pin.likes}
                        </p>
                        <p className='follow'>Followers: {pin.isFollowed ? pin.followers + 1 : pin.followers} &nbsp;
                            <button id='follow-btn' onClick={handleFollowers}>
                                {pin.isFollowed ? <button className='following-btn'>Followed</button>
                                :
                                <button className='unfollow-btn'>Follow</button> }
                            </button>
                        </p>
                            {/* <button>Followed</button>
                            <button>Follow</button> */}
                    </article>
                </main>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, cupiditate porro nihil rerum culpa molestias! Enim aliquid esse quae rem. Rerum necessitatibus inventore voluptatem nam cumque non nobis asperiores nemo.

                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dolorem quod a, optio, ipsum laudantium tempora, vero cupiditate quis animi consectetur at incidunt! Illum molestias eius expedita, recusandae sed doloribus.
                </p>
            </section>
        </>
    )
}

export default Pin;
