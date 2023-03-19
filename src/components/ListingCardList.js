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

    return (
        <>
            <h1>Recomended listings in {region}</h1>
            <ListingList>
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
                <ListingCard />
            </ListingList>
        </>
    )
}

export default ListingCardList
