import React from "react"
import { useState } from "react";
import { useSearchParams } from 'react-router-dom'

import useCSV from "../hooks/useCSV";

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

function Loading() {
    return (
        <h1>Loading...</h1>
    )
} 

function Region(props) {
    const region = props.region
    // console.log(region)

    const values = Object.values(region).map(field => <li>{field}</li>)
    const prices = values.splice(5)
    const keys = Object.keys(region).map(field => <li>{field}</li>)
    const dates = keys.splice(5)

    const date_price_pairs = dates.map((d, p) => [d, prices[p]])

    return (
        <>
            <p>{region.RegionName}</p>
            <ul>
                {date_price_pairs}
            </ul> 
        </>

    )
}

function verifyInput(input, region) {
    return (
        region.toLowerCase().includes(input.toLowerCase()) ?
        true : false
    )
}

function History() {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const [ inputQuery, setInputQuery ] = useState(searchParams.get("q") || "")

    const [ text, setText ] = useState("")
    const { data, isLoading } = useCSV(csvFilePath)
    const regions = data.data

    // const targetRegion = 'New York, NY'
    const targetRegion = 'New York'
    // const targetRegion = 'Chicago, IL'
    
    return (
        <>
            <form onSubmit={e => {
                e.preventDefault()
                // setInputQuery(text)
                setSearchParams({ q: inputQuery })
                console.log(searchParams.get("q"))
            }}>
                {/* <input placeholder="Enter a region" onChange={(e) => setText(e.target.value)}/> */}
                <input placeholder="Enter a region" value={inputQuery} onChange={e => setInputQuery(e.target.value)}/>
                {/* {console.log(text)} */}
                <button type="submit">Search</button>
            </form>
            {isLoading && <Loading />}
            {regions 
                && regions.map(region => (
                    // verifyInput(targetRegion, region.RegionName) && <Region key={region.RegionID} region={region} display={targetRegion} />
                    verifyInput(searchParams.get("q"), region.RegionName) && <Region key={region.RegionID} region={region} display={searchParams.get("q")} />
                    ))
            }
            <h1>Testing. 1, 2, 3...</h1>
        </>
        
    )
}

export default History