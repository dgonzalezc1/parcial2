import React from 'react'
import { useEffect, useRef } from "react";
import * as d3 from "d3";

function Grafica() {

    const language = window.navigator.language || navigator.browserLanguage;

    useEffect(() => {

        let api = "";

        if(language==="en"){
            api = "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json";
        } else {
            api = "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json";
        }

        fetch(api)
        .then(result => result.json())
        .then((result) => {
            localStorage.setItem("backup", JSON.stringify(result));
            drawChart(result);
        });

    }, []);

    const canvas = useRef();
    
    const width = 900;
    const height = 500;
    const margin = { top: 10, left: 50, bottom: 40, right: 10 };
    const iwidth = width - margin.left - margin.right;
    const iheight = height - margin.top - margin.bottom;

    const drawChart = (data) => {
        //console.log("data", data);

        let xTit = ""; 
        let yTit = "";

        if(language==="en"){
            yTit="Seasons";
            xTit="Episodes";
        } else {
            yTit="Temporadas";
            xTit="Episodios";
        }

        const svg = d3
        .select(canvas.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
        
        const x = d3.scaleLinear().domain([0, 350]).range([0, iwidth]);
        svg.append("g").attr("transform", "translate(0," + iheight + ")").call(d3.axisBottom(x));

        const y = d3.scaleLinear().domain([0, 12]).range([iheight, 0]);
        svg.append("g").call(d3.axisLeft(y));

        svg.append("g")
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d.episodes); } )
            .attr("cy", function (d) { return y(d.seasons); } ) 
            .attr("r", 6)
            .style("fill", "orange");

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
          .selectAll("text")
          .data(data)
          .join("text")
            .attr("dy", "0.35em")
            .attr("x", d => x(d.episodes) + 7)
            .attr("y", d => y(d.seasons))
            .text(d => d.name);

        svg.append("text")    
            .attr("font-size", 14)         
            .attr("transform", "translate(" + (iwidth/2) + " ," + (iheight + margin.top + 24) + ")")
            .style("text-anchor", "middle")
            .text(xTit);

        svg.append("text")
            .attr("font-size", 14)  
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (iheight/2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text(yTit); 
    
    };

    return (
        <div className="d3graph">
            <div ref={canvas}></div>
        </div>
    );
}

export default Grafica
