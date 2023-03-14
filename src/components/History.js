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

function getDates(props) {
    const region = props
    const keys = Object.keys(region).map(field => field)
    return keys.splice(5)
}

function getPrices(props) {
    const region = props
    const values = Object.values(region).map(field => Number(field).toFixed(2))
    return values.splice(5)
}

function Region(props) {
    const region = props.region
    const dates = getDates(region)
    const prices = getPrices(region)
    const date_price_pairs = dates.map((d, p) => [<li key={d}>{d}</li>, <li key={p}>{prices[p]}</li>])

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
                            <div key={region.RegionName}>
                                <PriceHistoryChart name={region.RegionName} xAxis={getDates(region)} yAxis={getPrices(region)} />
                                <p>
                                    Zillow Home Value Index (ZHVI): A measure of the typical home value and 
                                    market changes across a given region for all housing types.
                                    It reflects the typical value for homes in the 35th to 65th percentile range.
                                    Data rendered as smoothed, seasonally adjusted measure.
                                </p>
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