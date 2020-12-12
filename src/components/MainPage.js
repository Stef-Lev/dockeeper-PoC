import React, { useState, useEffect } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

function MainPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:4321/tutorials', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(tuts => {
            console.log(tuts);
            setData(tuts);
            setLoading(false);
        })
    }, [])
    console.log(data);

    if (loading) return <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
    />
    return (
        <div>
            <h1>Main Page</h1>
            {data.map((item) => {
                return (<div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.author}</p>
                    <div style={{ border: '2px solid grey' }} className='body-content'>
                        {item.body.map(sect => {
                            if (sect.type == 'header') {
                                return <h3>{sect.content}</h3>
                            } else if (sect.type == 'text') {
                                return <p>{sect.content}</p>
                            } else if (sect.type == 'image') {
                                return <img src={sect.url} width="200px" />
                            }
                        })}
                    </div>
                </div>)
            })}
        </div>
    )
}

export default MainPage;
