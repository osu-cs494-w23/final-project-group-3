import styled from '@emotion/styled/macro'
import { useState } from 'react'

const ListingContainer = styled.span`
    border: 1px solid dimgray;
    margin: 5px;
    padding: 5px;
    background-color: ghostwhite;
    min-width: 190px;
`

const ImageContainer = styled.div`
    // border: 1px solid blue;
    img{
        background-color: white;
        border: 1px solid dimgray;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5px;
        max-width: 190px;
        position: relative;
    }
`

const FavoriteButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    position: absolute;
    z-index: 1;
    padding: 5px;
`

const DataContainer = styled.div`
    font-size: 12px;
`

function ListingCard(props) {
    const id = props.id
    const addFavoriteListing = props.createFavoriteListingsCallback
    const removeFavoriteListing = props.removeFavoriteListing

    const [favorite, setFavorite] = useState(false)

    let buttonImage = favorite ? '❤️' : '🤍'
    
    function handleFavoriteChange() {
        if (!favorite) {
            addFavoriteListing(id, 'region_id', 'type', '1,2,3,4,7,8', '9')
        }
        else {
            removeFavoriteListing(id)
        }
        setFavorite(!favorite)
    }

    return (
        <ListingContainer >
            <ImageContainer>
            <FavoriteButton onClick={handleFavoriteChange}>{buttonImage}</FavoriteButton>
                <img src="https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg" alt="example image for listing" />
            </ImageContainer>
            <DataContainer>
                <h2>$Listing Price</h2>
                <p># bds | # ba | # sqft | (house) for (sale)</p>
                <p>Address, City, State</p>
                <p>Realtor</p>
            </DataContainer>
        </ListingContainer>
    )
}

export default ListingCard
