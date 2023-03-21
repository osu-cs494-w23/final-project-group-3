import styled from '@emotion/styled/macro'
import { useState } from 'react'
import { useOutletContext } from "react-router-dom";

import { useRedfinApiPropertyListingsFromLocation } from '../hooks/useRedfinApi'
import ListingCard from './ListingCard'
import Loading from './Loading';

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
    const [apiResults] = useRedfinApiPropertyListingsFromLocation(region,  {}, false, 5)

    return (
        <FeaturedListingsContainer>
            <h1>Featured listings in {region}</h1>
                { (apiResults.isError) && <div>Something went wrong ...</div> }
                { (apiResults.isLoading) && <div><Loading /></div> }
                <ListingList>
                { (!apiResults.isError) && (!apiResults.isLoading) && apiResults.data.map((listing) => {
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
        </FeaturedListingsContainer>
    )
}

export default FeaturedListingCardList
