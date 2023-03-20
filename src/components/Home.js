import React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, NavLink } from 'react-router-dom'
import FeaturedListingCardList from "./FeaturedListingCardList";

import useCSV from "../hooks/useCSV";

import "./Home.css"

const csvFilePath = require("../data/Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv")

function verifyInput(input, region) {
    return (
        region.toLowerCase().includes(input.toLowerCase()) ?
        true : false
    )
}

function Home() {
	const [ input, setInput ] = useState("")
    const [ searchParams, setSearchParams ] = useSearchParams()
    const { data, isLoading } = useCSV(csvFilePath)
    const regions = data.data

	useEffect(() => {
		setSearchParams({ q: "Corvallis" })
	}, [])

	return (
		<div id="home">
			<div id="banner">
				<div id="phrase">
					<h1 id="phrase-text">Find the home that's right for you!</h1>
				</div>
				<form id="search" onSubmit={e => {
					e.preventDefault()
					setSearchParams({ q: input })
					console.log(searchParams.get("q"))
            	}}>
					<input id="input" placeholder="Enter a region to begin your search" value={input} onChange={e => setInput(e.target.value)}></input>
					<button type="submit" id="submit">{<img id="mag" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1024px-Magnifying_glass_icon.svg.png"/>}</button>
				</form>
			</div>
			<div id="featured">
				<h1 id="featured-text">Featured in your area</h1>
				<div id="items">
					{regions && searchParams.get("q")
						&& regions.map(region => (
							verifyInput(searchParams.get("q"), region.RegionName) && 
								(
									<div key={region.RegionName}>
										<FeaturedListingCardList region={region.RegionName}/>
									</div>
								)
							))
					}
				</div>
			</div>
		</div>
	)
}

export default Home
