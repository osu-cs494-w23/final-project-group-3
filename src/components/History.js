import React from "react"
import { useState } from "react";
import { useSearchParams } from 'react-router-dom'

import useCSV from "../hooks/useCSV";

import PriceHistoryChart from "./PriceHistoryChart";

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

function Loading() {
    return (
        <h1>Loading...</h1>
    )
} 

function Region(props) {
    const region = props.region
    // console.log(region)

    const values = Object.values(region).map(field => <li key={field}>{field}</li>)
    const prices = values.splice(5)
    const keys = Object.keys(region).map(field => <li key={field}>{field}</li>)
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

    const { data, isLoading } = useCSV(csvFilePath)
    const regions = data.data
    
    return (
        <>
            <form onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
                console.log(searchParams.get("q"))
            }}>
                <input placeholder="Enter a region" value={inputQuery} onChange={e => setInputQuery(e.target.value)}/>
                <button type="submit">Search</button>
            </form>
            {isLoading && <Loading />}
            {regions && searchParams.get("q")
                && regions.map(region => (
                    verifyInput(searchParams.get("q"), region.RegionName) && 
                        (
                            <div>
                                <PriceHistoryChart name={region.RegionName}/>
                                <Region key={region.RegionID} region={region} display={searchParams.get("q")} />
                            </div>
                        )
                    ))
            }
            <h1>Testing. This is the History Route</h1>
        </>
        
    )
}

export default History