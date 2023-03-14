import React, { useEffect } from "react"
import Papa from 'papaparse'
import { useState } from "react";

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
                setIsLoading(false)
                setData(results)
            }
        })
    }, [])
    
    return { data, isLoading}
}

export default useCSV