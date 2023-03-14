import React, { useEffect } from "react"
import Papa from 'papaparse'
import { useState } from "react";

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

function useCSV(csvFilePath) {
    const [ prices, setPrices ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: function(results) {
                console.log("in Papa.parse:", results)
                // setCity(results)
                setIsLoading(false)
                setPrices(results)
            }
        })
    }, [])
    
    return { prices, isLoading}
}

function History() {
    const { prices, isLoading } = useCSV(csvFilePath)

    console.log("In History, prices:", prices)
    console.log("In History, isLoading:", isLoading)
    
    return (
        <>
            {/* { console.log(city) } */}
            <h1>Testing. 1, 2, 3...</h1>
        </>
        
    )
}

export default History