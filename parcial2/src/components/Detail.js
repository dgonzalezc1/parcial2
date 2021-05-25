import React from 'react'

function Detail(props) {
    return (
        <div>
            <div className="card" style={{width: '18rem'}}>
                <img className="card-img-top" src={props.serie.poster} alt="Poster" />
                <div className="card-body">
                    <h5 className="card-title">{props.serie.name}</h5>
                    <p className="card-text">{props.serie.description}</p>
                    <a href={props.webpage}>{props.serie.webpage}</a>
                </div>
            </div>
        </div>
    )
}

export default Detail
