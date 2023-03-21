import React from "react"
import styled from '@emotion/styled/macro'
import { useOutletContext } from "react-router-dom";
import ListingCard from "./ListingCard";

const HeadingContainer = styled.div`
    text-align: center;
`

const Title = styled.h1`
    text-align: center;
`

const ListingGrid = styled.div`
    // border: 1px solid dimgray;
    display: grid;
    grid-template-columns: auto auto auto auto;
    justify-content: center;
    padding: 0;
`

function Favorites() {
    const { getFavoriteListings, addFavoriteListing, removeFavoriteListing } = useOutletContext()
    const favoritesList = getFavoriteListings()
    const listingIds = Object.keys(favoritesList)

    return (
        <>
            <HeadingContainer>
                <Title>Your favorite listings</Title>
                <p>Filters?</p>
            </HeadingContainer>
            <ListingGrid>
                {listingIds.map(id => {
                  const listing = favoritesList[id];
                  console.log(listing);
                  console.log(id);
                  const { regionId, type, homeData } = listing;
                  return <ListingCard key={id} id={id} regionId={regionId} type={type} homeData={homeData} context={useOutletContext} />
                }
                )}
            </ListingGrid>
        </>
    )
}

export default Favorites
