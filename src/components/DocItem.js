import React from 'react'

function DocItem({ title, author }) {
    return (
        <div className="doc-item">
            <h2>{title}</h2>
            <h5>{author}</h5>

        </div>
    )
}

export default DocItem
