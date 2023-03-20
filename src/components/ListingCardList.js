import styled from '@emotion/styled/macro'
import { useState } from 'react'
import { useOutletContext } from "react-router-dom";

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

    const listings = [
        <ListingCard context={useOutletContext} id={++id}/>,
        <ListingCard context={useOutletContext} id={++id}/>,
        <ListingCard context={useOutletContext} id={++id}/>,
        <ListingCard context={useOutletContext} id={++id}/>,
        <ListingCard context={useOutletContext} id={++id}/>
    ]

    return (
        <>
            <h1>Recomended listings in {region}</h1>
            <ListingList>
                {listings}
            </ListingList>
        </>
    )
}

export default ListingCardList
