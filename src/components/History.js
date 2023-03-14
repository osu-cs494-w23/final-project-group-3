import React from "react"

import useCSV from "../hooks/useCSV";

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

function Loading() {
    return (
        <h1>Loading...</h1>
    )
} 

function City(props) {
    return (
        <>
            <p>{props.name.RegionName}</p>
        </>

    )
}

function History() {
    const { data, isLoading } = useCSV(csvFilePath)
    const priceHistoryByCity = data.data

    const cityName = 'New York, NY'
    // const cityName = 'Chicago, IL'
    
    return (
        <>
            {isLoading && <Loading />}
            {priceHistoryByCity && console.log(priceHistoryByCity[1])}
            {priceHistoryByCity 
                // && priceHistoryByCity.map(city => <City key={city.RegionID} name={city} display={cityName} />)
                && priceHistoryByCity.map(city => (
                    city.RegionName === cityName && <City key={city.RegionID} name={city} display={cityName} />
                    ))
            }
            <h1>Testing. 1, 2, 3...</h1>
        </>
        
    )
}

export default History