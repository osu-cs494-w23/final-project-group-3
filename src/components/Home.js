import React from "react"
import { useState } from "react"

import "./Home.css"

function Home() {
	const [ inputRegion, setRegion ] = useState("")

	return (
		<div id="home">
			<div id="header">
				<h3>Home Finder</h3>
			</div>
			<div id="banner">
				<h1 id="phrase">
					<h1 id="phrase-text">Find the home that's right for you!</h1>
				</h1>
				<form id="search">
					<input id="input" placeholder="Enter a region to begin your search"></input>
					<button type="submit" id="submit">{<img id="mag" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1024px-Magnifying_glass_icon.svg.png"/>}</button>
				</form>
			</div>
			<div id="featured">
				<h1 id="featured-text">Featured in your area</h1>
				<ul id="items">
					
				</ul>
			</div>
		</div>
	)
}

export default Home