import styled from "@emotion/styled/macro";
import { useState } from "react";
import { useRedfinApiPropertyListingsFromLocation} from "../hooks/useRedfinApi";
import ListingCard from "./ListingCard";

function SearchListingsPage(props) {
  const Container = styled.div({
    display: "flex",
    flexDirection: "column",
    padding: "0px",
    margin: "0px",
  });

  const [searchData, setSearchData] = useState({
    location: "Corvallis Oregon",
    searchFilters: {
      'num_homes': '40',
    }
  });

  const [searchResults] = useRedfinApiPropertyListingsFromLocation(searchData.location, searchData.searchFilters, true, 1);

  return (
      <Container>
        <SearchFilterBar setSearchData={setSearchData}></SearchFilterBar>
        <SearchResults searchResults={searchResults}></SearchResults>
      </Container>
  )
}

function SearchFilterBar(props) {
  const Container = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  });
  const Input = styled.input({
    width: "120px",
    height: "20px",
    margin: "5px",
  });
  const Button = styled.button({
    width: "100px",
    height: "25px",
    margin: "5px",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    const location = document.getElementById("location-form").value;
    const minPrice = document.getElementById("min-price-form").value;
    const maxPrice = document.getElementById("max-price-form").value;
    const minBeds = document.getElementById("min-beds-form").value;
    const minBaths = document.getElementById("min-baths-form").value;
    const searchFilters = {
      'min_price': Math.min(minPrice, maxPrice),
      'max_price': Math.max(minPrice, maxPrice),
      'min_beds': minBeds,
      'min_baths': minBaths,
    };
    const searchData = {
      'location': location,
      'searchFilters': searchFilters,
    }
    props.setSearchData(searchData);
  }

  // A horizontal bar with a search box and a search button
  return (
    <Container>
      <form onSubmit={(event) => onSubmit(event)}>
        <Input type="text" placeholder="City, ZIP, Address" required />
        <Input id={"min-price-form"} type="number" placeholder="Min Price" min={0}  />
        <Input id={"max-price-form"} type="number" placeholder="Max Price" min={0} />
        <Input id={"min-beds-form"} type="number" placeholder="Min Beds" min={0} />
        <Input id={"min-baths-form"} type="number" placeholder="Min Baths" min={0} />
        <Button type="submit">Search</Button>
      </form>
    </Container>
  )
}

function SearchResults(props) {
  const Container = styled.div({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  });

  const HeadingContainer = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  });

  const ResultsContainer = styled.div({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  });

  const Heading = styled.h1({
    margin: "0px",
    padding: "0px",
  });

  const searchResults = props.searchResults;

  console.log(searchResults);
  return (
      <Container>
        <HeadingContainer>
          <Heading>Search Results</Heading>
        </HeadingContainer>
        { (!searchResults.isError) && (!searchResults.isLoading) && searchResults.data.map((searchResult) => {
          const regionName = searchResult['region_info']['name'];
          const regionId = searchResult['region_info']['id'];
          const propertyListings = searchResult['homes'];
          return (
              <Container id={regionId}>
                <HeadingContainer>
                  <Heading>{regionName}</Heading>
                </HeadingContainer>
                <ResultsContainer>
                  {propertyListings.map((propertyListing) => {

                    const homeData = propertyListing['homeData'];
                    const propertyId = homeData['propertyId'];

                    return(
                        <ListingCard id={propertyId} homeData={homeData}></ListingCard>
                    );
                  })}
                </ResultsContainer>
              </Container>
          );
        })}
      </Container>
  );
}

export default SearchListingsPage;
