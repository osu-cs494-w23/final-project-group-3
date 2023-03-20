import React from "react"
import styled from '@emotion/styled/macro'
import { useOutletContext } from "react-router-dom";
import ListingCard from "./ListingCard";

function Favorites() {

    const { getFavoriteListings, addFavoriteListing, removeFavoriteListing } = useOutletContext()
    const favoritesList = getFavoriteListings()
    const listingIds = Object.keys(favoritesList)

    return (
        <>
            {listingIds.map(id => <ListingCard key={id[0]} context={useOutletContext} id={id[0]} />)}
            <h1>This is the favorites route</h1>
        </>
    )
}

export default Favorites
