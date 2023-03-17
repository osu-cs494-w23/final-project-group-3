import styled from '@emotion/styled/macro'

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
    }
`

const DataContainer = styled.div`
    font-size: 12px;
`

function ListingCard(props) {
    return (
        <ListingContainer >
            <ImageContainer>
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
