import React from "react";
import Papa from 'papaparse'

function History() {
    const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv");

    Papa.parse(csvFilePath, {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: function(results) {
            console.log(results)
        }
    })

    return (
        <h1>Testing. 1, 2, 3...</h1>
    )
}

export default History