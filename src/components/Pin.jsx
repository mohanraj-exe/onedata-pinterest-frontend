import React from 'react';
import { useEffect, useState } from "react";
import "../styles/Pin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

function Pin() {
    const { id } = useParams();
    const [pin, setPin] = useState({
        id: "",
        likes: "",
        isliked: false,
        followers: "",
        isFollowed: false,
        img: "",
        newComment: "",
        comments: [],
        users: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/pin/${id}`);
                const result = await response.json();
                const { _id, author, comments, img, likes } = result.data;
                // console.log(result.data);
                setPin((prevState) => ({
                    ...prevState,
                    id: _id,
                    img: img,
                    likes: likes,
                    isliked: false,
                    followers: author.followers,
                    isFollowed: false,
                    comments: comments,
                    newComment: ""
                }));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const handleLikes = async () => {
        // setPin(prevState => ({ ...prevState, isliked: !pin.isliked }));
        const newIsLiked = !pin.isliked;
        const newLikes = newIsLiked ? pin.likes + 1 : pin.likes - 1;

        setPin((prevState) => ({
            ...prevState,
            isliked: newIsLiked,
            likes: newLikes
        }));

        const result = await updateLikes(newLikes);
        if (!result.success) {
            // Rollback if the update failed
            setPin((prevState) => ({
                ...prevState,
                isliked: !newIsLiked,
                likes: pin.likes // Revert to previous likes count
            }));
        }
    }

    const updateLikes = async (newLikes) => {
        // console.log(newLikes);
        try {
            const response = await fetch(`http://localhost:3000/api/pin_likes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    likeCount: newLikes
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error updating pin: ${errorMessage}`);
            }

            const result = await response.json();
            console.log(result);
            return { success: true };

        } catch (error) {
            console.error('Error updating likes:', error);
            return { success: false }; // Indicate failure
        }
    };

    // useEffect(() => {
    //     // updateLikes();
    //     console.log(pin.isliked, pin.likes);
    // }, [pin.isliked, pin.likes]);

    // useEffect(() => {
    //     // updateLikes();
    //     console.log(pin.isFollowed, pin.followers);
    // }, [pin.isFollowed, pin.followers]);

    const handleFollowers = async () => {
        // setPin(prevState => ({ ...prevState, isFollowed: !pin.isFollowed }));
        const newIsFollowed = !pin.isFollowed;
        const newFollower = newIsFollowed ? pin.followers + 1 : pin.followers - 1;

        setPin((prevState) => ({
            ...prevState,
            isFollowed: newIsFollowed,
            followers: newFollower
        }));

        const result = await updateFollowers(newFollower);
        if (!result.success) {
            // console.log("hit")
            // Rollback if the update failed
            setPin((prevState) => ({
                ...prevState,
                isFollowed: !newIsFollowed,
                followers: pin.followers // Revert to previous likes count
            }));
        }
    }

    const updateFollowers = async (newFollower) => {
        // console.log(newFollower);
        try {
            const response = await fetch(`http://localhost:3000/api/pin_followers_add/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    followerCount: newFollower
                })
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorMessage = await response.text(); // Read error response
                throw new Error(`Error updating pin: ${errorMessage}`);
            }

            const result = await response.json();
            console.log(result);
            return { success: true }; // Indicate success

        } catch (error) {
            console.error('Error updating follower:', error);
            return { success: false }; // Indicate failure
        }
    };

    const handleCommentSubmit = async () => {
        if (!pin.newComment) {
            throw new Error(`Error: Input field is empty!`);
        }

        try {
            console.log(pin.newComment);
            const response = await fetch(`http://localhost:3000/api/pin_comments/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newComment: pin.newComment,
                })
            });
            const result = await response.json();
            console.log(result.data.comments);

            setPin((prevState) => ({
                ...prevState,
                newComment: "",
                comments: result.data.comments
            }));
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <>
            <section className='main-content'>
                <main className="pin">
                    <img src={pin.img} alt="pin-image" />
                    <article className='pin-info'>
                        <p>
                            <button onClick={handleLikes}>
                                {pin.isliked ? <FontAwesomeIcon icon={faHeart} size="xl" color='#e60023' /> :
                                    <FontAwesomeIcon icon={faHeart} size="xl" color='#808080' />
                                }</button>
                            &nbsp;
                            <span>{pin.likes}</span>
                        </p>
                        <p className='follow'>Followers: {pin.followers} &nbsp;
                            <button id='follow-btn' onClick={handleFollowers}>
                                {pin.isFollowed ? 'Following' : 'Follow'} </button>
                        </p>

                        {/* Comments Section */}
                        <section className="comments">
                        <h2>Comments</h2>
                            {/* Comment Input */}
                            {pin.comments.map(item => (
                                <ul>
                                    <li key={item._id}>
                                        {item.comment}
                                    </li>
                                </ul>
                            ))
                            }
                        <input
                            className='comments-input'
                            type="text"
                            value={pin.newComment}
                            onChange={(e) => setPin((prevState) => ({ ...prevState, newComment: e.target.value }))}
                            placeholder="Add a comment..."
                            /> <br />
                        <button id='comment-btn' onClick={handleCommentSubmit}>Post Comment</button>
                            </section>
                    </article>
                </main>
            </section>
        </>
    )
}
export default Pin;
