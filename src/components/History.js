import React from "react"
import { useState } from "react";
import { useSearchParams } from 'react-router-dom'
import { useOutletContext } from "react-router-dom";
import styled from '@emotion/styled/macro'

import useCSV from "../hooks/useCSV";

import PriceHistoryChart from "./PriceHistoryChart";
import FeaturedListingCardList from "./FeaturedListingCardList";
import Loading from "./Loading";

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

const breakpoints = {
    sm: 768,
    med: 1024
}

const media = `
    @media (min-width: ${breakpoints.sm + 1}px) and (max-width: ${breakpoints.med}px) {
        font-size: 24px;
    }
    @media (max-width: ${breakpoints.sm}px) {
        font-size: 32px;
    }
`

const Button = styled.button`
    font-size: 20px;
    border-radius: 5px;
    margin: 3px;
    ${media}
`

const Input = styled.input`
    border: 1px solid #ababab;
    border-radius: 5px;
    padding: 2px;
    font-size: 20px;
    ${media}
`

const SearchContainer = styled.form`
    text-align: center;
    padding: 10px;
`

const ChartContainer = styled.div`
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid dimgray;
    border-radius: 5px;
    margin: 15px;
    background-color: ghostwhite;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const CaptionContainer = styled.div`
    padding-left: 5px;
    padding-right: 5px;
    margin: 15px;
    margin-top: 0;
    background-color: ghostwhite;
`

function getDates(region) {
    const keys = Object.keys(region).map(field => field)
    return keys.splice(5)
}

function getPrices(region) {
    const values = Object.values(region).map(field => Number(field).toFixed(2))
    return values.splice(5)
}

function verifyInput(input, region) {
    return (
        region.toLowerCase().includes(input.toLowerCase()) ?
        true : false
    )
}

function History() {
    const [ searchParams, setSearchParams ] = useSearchParams({ q: "Corvallis" })
    const [ inputQuery, setInputQuery ] = useState(searchParams.get("q") || "")
    const { data, isLoading } = useCSV(csvFilePath)
    const regions = data.data

    return (
        <>
            <SearchContainer onSubmit={e => {
                e.preventDefault()
                setSearchParams({ q: inputQuery })
                console.log(searchParams.get("q"))
            }}>
                <Input placeholder="Enter a region" value={inputQuery} onChange={e => setInputQuery(e.target.value)}/>
                <Button type="submit">Search</Button>
            </SearchContainer>
            {isLoading && <Loading />}
            {regions && searchParams.get("q")
                && regions.map(region => (
                    verifyInput(searchParams.get("q"), region.RegionName) && 
                        (
                            <div key={region.RegionName}>
                                <ChartContainer>
                                    <PriceHistoryChart name={region.RegionName} xAxis={getDates(region)} yAxis={getPrices(region)} />
                                    <CaptionContainer>
                                        <p>
                                            Zillow Home Value Index (ZHVI): A measure of the typical home value and 
                                            market changes across a given region for all housing types.
                                            It reflects the typical value for homes in the 35th to 65th percentile range.
                                            Data rendered as smoothed, seasonally adjusted measure.
                                        </p>
                                    </CaptionContainer>  
                                </ChartContainer>
                                <FeaturedListingCardList region={region.RegionName} context={useOutletContext}/>
                            </div>
                        )
                    ))
            }
        </>
    )
}

export default History
