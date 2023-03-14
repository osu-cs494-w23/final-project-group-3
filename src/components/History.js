import React from "react"

import useCSV from "../hooks/useCSV";

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

function Loading() {
    return (
        <h1>Loading...</h1>
    )
} 

function Region(props) {
    const region = props.region
    console.log(region)

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

function History() {
    const { data, isLoading } = useCSV(csvFilePath)
    const regions = data.data

    const targetRegion = 'New York, NY'
    // const cityName = 'Chicago, IL'
    
    return (
        <>
            {isLoading && <Loading />}
            {regions 
                && regions.map(region => (
                    region.RegionName === targetRegion && <Region key={region.RegionID} region={region} display={targetRegion} />
                    ))
            }
            <h1>Testing. 1, 2, 3...</h1>
        </>
        
    )
}

export default History