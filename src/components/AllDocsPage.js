import React, { useState, useEffect } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { Button } from 'react-bootstrap';

function AllDocsPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3002/tutorials', {
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
            {data.map((section) => {
                return (<section key={section.id}>
                    <h2>{section.title}</h2>
                    <p>{section.author}</p>
                    <div style={{ border: '2px solid grey' }} className='body-content'>
                        {section.body.map((item, index) => {
                            if (item.type == 'header') {
                                return <h3 key={`${item.type}${index}`}>{item.content}{index}</h3>
                            } else if (item.type == 'text') {
                                return <p>{item.content}</p>
                            } else if (item.type == 'image') {
                                return <img src={item.url} width="200px" />
                            } else if (item.type == 'video') {
                                return <iframe width="560" height="315" src={item.url.replace('watch?v=', 'embed/')} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            }
                        })}
                    </div>
                </section>)
            })}
        </div>
    )
}

export default AllDocsPage;
