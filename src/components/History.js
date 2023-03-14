import React from "react"

import useCSV from "../hooks/useCSV";

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

function Loading() {
    return (
        <h1>Loading...</h1>
    )
} 

function Region(props) {
    console.log(props.region)

    return (
        <>
            <p>{props.region.RegionName}</p>
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