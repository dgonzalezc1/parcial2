import React from 'react'
import { useEffect, useState } from 'react'
import { FormattedMessage, FormattedDate } from 'react-intl'
import Detail from './Detail';

function Table() {

    const [selectedSerie, setSelectedSerie] = useState();
    const [info, setInfo] = useState([]);
    const [online, setOnline] = useState(true);

    const language = window.navigator.language || navigator.browserLanguage;

    useEffect(() => {

        //console.log(navigator.onLine);
        if(!navigator.onLine){ 
        
            setOnline(false);
            if(localStorage.getItem("backup")===null){
                console.log("Loading...");
            } else {
                const storedData = JSON.parse(localStorage.getItem("backup"));
                setInfo(storedData);
            }
        } 

        let api = "";

        if(language==="en"){
            api = "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";
        } else {
            api = "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
        }

        fetch(api)
        .then(result => result.json())
        .then((result) => {

            console.log(result);

            //setOnline(true);
            localStorage.setItem("backup", JSON.stringify(result));
            //console.log(localStorage.getItem("backup"));

            setInfo(result);

        });
    }, []);

    const handleClick = (e) => {
        setSelectedSerie(e)
    }

    const formatDate = (d) => {
        let arr = d.split('/');
        return arr[1] + '/' + arr[0] + '/' + arr[2];
    }
    
    return (
        <div>
            <h1><FormattedMessage id="Title"/></h1>
            <hr/>
            <div className="tableBig">
                <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col"><FormattedMessage id="Name"/></th>
                        <th scope="col"><FormattedMessage id="Channel"/></th>
                        <th scope="col"><FormattedMessage id="Seasons"/></th>
                        <th scope="col"><FormattedMessage id="Episodes"/></th>
                        <th scope="col"><FormattedMessage id="Released"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {info.map(i =>{
                            return (
                            <tr key={i.id} onClick={() => handleClick(i)}>
                                <th scope="row">{i.id}</th>
                                <td>{i.name}</td>
                                <td>{i.channel}</td>
                                <td>{i.seasons}</td>
                                <td>{i.episodes}</td>
                                <td><FormattedDate value={formatDate(i.release)} year="numeric" month="long" day="numeric"/></td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div>
                    {selectedSerie != null ? <Detail serie={selectedSerie} online={online} /> : null}
                </div>
            </div>
        </div>
    )
}

export default Table
