import React, { useEffect } from "react"
import Papa from 'papaparse'
import { useState } from "react";

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

function useCSV(csvFilePath) {
    const [ data, setData ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        Papa.parse(csvFilePath, {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: function(results) {
                console.log("in Papa.parse:", results)
                setIsLoading(false)
                setData(results)
            }
        })
    }, [])
    
    return { data, isLoading}
}

function History() {
    const { data, isLoading } = useCSV(csvFilePath)

    console.log("In History, data:", data)
    console.log("In History, isLoading:", isLoading)
    
    return (
        <>
            <h1>Testing. 1, 2, 3...</h1>
        </>
        
    )
}

export default History