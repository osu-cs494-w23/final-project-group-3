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
const FeaturedListingsContainer = styled.div`
    margin: 15px;
`

function FeaturedListingCardList(props) {
    const region = props.region ? props.region : "your area"
    let id = 0

    const [apiResults] = useRedfinApiPropertyListingsFromLocation(region,  null, false, 5)
    // // console.log(listings)
    // const listingsArray = listings.data
    // // console.log(listingsArray)
    // const listingsData = listingsArray.map(listing => listing.homes[0].homeData)
    // console.log("listingsData", listingsData)
    // {listingsData.map(listing => console.log("propertyId", listing.propertyId, "listing", listing))}
    // // if (listingsData[0].propertyId)

    const placeholderListings = [
        <ListingCard key={id} context={useOutletContext} id={++id}/>,
        <ListingCard key={id} context={useOutletContext} id={++id}/>,
        <ListingCard key={id} context={useOutletContext} id={++id}/>,
        <ListingCard key={id} context={useOutletContext} id={++id}/>,
        <ListingCard key={id} context={useOutletContext} id={++id}/>
    ]

    return (
        <FeaturedListingsContainer>
            <h1>Featured listings in {region}</h1>
                {/* {placeholderListings} */}
                { (apiResults.isError) && <div>Something went wrong ...</div> }
                { (apiResults.isLoading) && <div>Loading ...</div> }
                <ListingList>

                { (!apiResults.isError) && (!apiResults.isLoading) && apiResults.data.map((listing) => {
                    const regionName = listing['region_info']['subName'];
                    const regionId = listing['region_info']['id'];
                    const regionType = listing['region_info']['type'];
                    const propertyListings = listing['homes'];
                    return (
                        <>
                            {propertyListings && propertyListings.map((propertyListing) => {

                                const homeData = propertyListing['homeData'];
                                const propertyId = homeData['propertyId'];
            
                                return(
                                    <ListingCard key={propertyId} id={propertyId} type={regionType} regionId={regionId} homeData={homeData}></ListingCard>
                                );
                                
                            })}
                        </>
                    )
                }) }
                </ListingList>

                {/* {listingsData.map(listing => <ListingCard key={listing.propertyId} id={listing.propertyId} data={listing} context={useOutletContext}/>)} */}
        </FeaturedListingsContainer>
    )
}

export default FeaturedListingCardList
