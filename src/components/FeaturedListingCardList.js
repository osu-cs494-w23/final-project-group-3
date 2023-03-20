import styled from '@emotion/styled/macro'
import { useState } from 'react'
import { useOutletContext } from "react-router-dom";

import { useRedfinApiPropertyListingsFromLocation } from '../hooks/useRedfinApi'
import ListingCard from './ListingCard'

const ListingList = styled.ul`
    // border: 1px solid dimgray;
    display: flex;
    justify-content: center;
    padding: 0;
`

function ListingCardList(props) {
    const region = props.region ? props.region : "your area"
    let id = 0

    const [listings] = useRedfinApiPropertyListingsFromLocation(region,  null, false, 5)
    // console.log(listings)
    const listingsArray = listings.data
    // console.log(listingsArray)
    const listingsData = listingsArray.map(listing => listing.homes[0].homeData)
    console.log("listingsData", listingsData)
    {listingsData.map(listing => console.log("propertyId", listing.propertyId, "listing", listing))}
    // if (listingsData[0].propertyId)

    const placeholderListings = [
        <ListingCard key={id} context={useOutletContext} id={++id}/>,
        <ListingCard key={id} context={useOutletContext} id={++id}/>,
        <ListingCard key={id} context={useOutletContext} id={++id}/>,
        <ListingCard key={id} context={useOutletContext} id={++id}/>,
        <ListingCard key={id} context={useOutletContext} id={++id}/>
    ]

    return (
        <>
            <h1>Featured listings in {region}</h1>
            <ListingList>
                {/* {placeholderListings} */}
                {listingsData.map(listing => <ListingCard key={listing.propertyId} id={listing.propertyId} data={listing} context={useOutletContext}/>)}
            </ListingList>
        </>
    )
}

export default ListingCardList
