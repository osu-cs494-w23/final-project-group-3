import styled from '@emotion/styled/macro'
import { useOutletContext } from "react-router-dom";

const ListingContainer = styled.span`
    border: 1px solid dimgray;
    margin: 5px;
    padding: 5px;
    background-color: ghostwhite;
    min-width: 10vw;
`

const FavoriteButton = styled.button`
    border: none;
    background: none;
    padding: 5px;
`

const DataContainer = styled.div`
    font-size: 12px;
`

const ArticleContainer = styled.article`
  background-color: white;
  border: 1px solid dimgray;
  display: block;
  margin-bottom: 5px;
  width: 15vw;
  height: 20vh;
  background-image: url("https://i.pinimg.com/originals/2e/dc/4b/2edc4b5f7279d8d9bfbae04a75e104a8.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

function ListingCard(props) {
    const id = props.id
    const { getFavoriteListings, addFavoriteListing, removeFavoriteListing } = useOutletContext()
    const favorites = getFavoriteListings()

    let buttonImage = favorites[id] ? '❤️' : '🤍'

    function handleFavoriteChange() {
        if (!favorites[id]) {
            addFavoriteListing(id, 'region_id', 'type', '1,2,3,4,7,8', '9')
        }
        else {
            removeFavoriteListing(id)
        }
    }

    return (
        <ListingContainer >
          <ArticleContainer>
            <FavoriteButton onClick={handleFavoriteChange}>{buttonImage}</FavoriteButton>
          </ArticleContainer>
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
