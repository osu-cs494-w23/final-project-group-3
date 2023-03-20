import styled from '@emotion/styled/macro'
import { useState } from 'react'

import ListingCard from './ListingCard'

const ListingList = styled.ul`
    // border: 1px solid dimgray;
    display: flex;
    justify-content: center;
    padding: 0;
`

function ListingCardList(props) {
    const region = props.region ? props.region : "your area"

    const [ favoriteListings, setFavoriteListings ] = useState({})

    function addFavoriteListing(listingId, regionId, type, uipt, status) {
        let newFavoriteListings = {
            ...favoriteListings,
        }
        newFavoriteListings[listingId] = {region_id: regionId, type: type, uipt: uipt, status: status}
        setFavoriteListings(newFavoriteListings)
    }

    function removeFavoriteListing(listingId) {
        const newFavoriteListings = {
            ...favoriteListings
        }
        delete newFavoriteListings[listingId]
        setFavoriteListings(newFavoriteListings)
    }

    function getFavoriteListings() {
        return favoriteListings
    }

    let id = 0
    const listings = [
        <ListingCard createFavoriteListingsCallback={addFavoriteListing} removeFavoriteListing={removeFavoriteListing} id={++id}/>,
        <ListingCard createFavoriteListingsCallback={addFavoriteListing} removeFavoriteListing={removeFavoriteListing} id={++id}/>,
        <ListingCard createFavoriteListingsCallback={addFavoriteListing} removeFavoriteListing={removeFavoriteListing} id={++id}/>,
        <ListingCard createFavoriteListingsCallback={addFavoriteListing} removeFavoriteListing={removeFavoriteListing} id={++id}/>,
        <ListingCard createFavoriteListingsCallback={addFavoriteListing} removeFavoriteListing={removeFavoriteListing} id={++id}/>
    ]

    return (
        <>
            <h1>Recomended listings in {region}</h1>
            <ListingList>
                {listings}
            </ListingList>
            {console.log("getFavoriteListings", getFavoriteListings())}
        </>
    )
}

export default ListingCardList
