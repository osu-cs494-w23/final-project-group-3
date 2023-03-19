import styled from '@emotion/styled/macro'

import ListingCard from './ListingCard'

const ListingList = styled.ul`
    // border: 1px solid dimgray;
    display: flex;
    justify-content: center;
    padding: 0;
`

function ListingCardList(props) {
    const region = props.region ? props.region : "your area"
    const favorites = []
    const listings = [
        <ListingCard favorites={favorites}/>,
        <ListingCard favorites={favorites}/>,
        <ListingCard favorites={favorites}/>,
        <ListingCard favorites={favorites}/>,
        <ListingCard favorites={favorites}/>
    ]

    return (
        <>
            <h1>Recomended listings in {region}</h1>
            <ListingList>
                {listings}
            </ListingList>
            {console.log("favorites:", favorites)}
        </>
    )
}

export default ListingCardList
