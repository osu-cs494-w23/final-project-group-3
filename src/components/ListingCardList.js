import styled from '@emotion/styled/macro'

import {useRedfinListingsApi, useRedfinAutoCompleteApi} from "../hooks/useRedfinApi";
import ListingCard from './ListingCard'

const ListingList = styled.ul`
    // border: 1px solid dimgray;
    display: flex;
    justify-content: center;
    padding: 0;
`

function ListingCardList(props) {
    const region = props.region ? props.region : "your area"
    const [ autoComplete ] = useRedfinAutoCompleteApi(props.region, false)
    const id = autoComplete.data.exactMatch ? autoComplete.data.payload.exactMatch.id : null
    console.log(autoComplete.data.payload)
    const [listings] = useRedfinListingsApi({
        region_id: '30749',
        region_type: '6',
        uipt: '1,2,3,4,7,8',
        status: '9',
        sf: '1,2,3,5,6,7',
        num_homes: '10',
      }, false);
    console.log(listings)

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
