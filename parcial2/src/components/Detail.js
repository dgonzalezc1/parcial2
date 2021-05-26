import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

function Detail(props) {

    const intl = useIntl();

    return (
        <div className="card" >
            { props.online === false ? (<p><FormattedMessage id="Error"/></p>) 
                : (<img className="card-img-top" src={props.serie.poster} alt={intl.formatMessage({id:"Error"})} />)
            }
            <div className="card-body">
                <h5 className="card-title">{props.serie.name}</h5>
                <p className="card-text">{props.serie.description}</p>
                <a className="card-link" target="_blank" href={props.serie.webpage} rel="noopener noreferrer">{props.serie.webpage}</a>
            </div>
        </div>
    )
}

export default Detail
