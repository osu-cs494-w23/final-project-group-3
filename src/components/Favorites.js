import React from "react"
import styled from '@emotion/styled/macro'
import { useOutletContext } from "react-router-dom";

function Favorites() {

    const { getFavoriteListings, addFavoriteListing, removeFavoriteListing } = useOutletContext()

    return (
        <>
            {console.log(getFavoriteListings())}
            <h1>This is the favorites route</h1>
        </>
    )
}

export default Favorites
