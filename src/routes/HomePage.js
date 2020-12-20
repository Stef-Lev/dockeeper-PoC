import React, { useState, useEffect } from 'react'
import SearchForm from "../components/SearchForm";
import DocItem from "../components/DocItem";

function HomePage() {

    const [data, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:3002/tutorials').then(res => res.json()).then(docs => setData(docs))
    }, [])

    console.log(data);
    return (
        <>
            <SearchForm />
            <div id="search-results-cont">
                {Array.from(data).map(item => {
                    return <DocItem title={item.title} author={item.author} />
                })}
            </div>
        </>
    )
}

export default HomePage
