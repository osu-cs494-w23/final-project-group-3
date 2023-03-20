import styled from "@emotion/styled/macro";

function SearchListingsPage(props) {
  const Container = styled.div({
    display: "flex",
    flexDirection: "column",
    padding: "0px",
    margin: "0px",
  });
  return (
      <Container>
        <SearchFilterBar></SearchFilterBar>
        <SearchResults></SearchResults>
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
  }

  // A horizontal bar with a search box and a search button
  return (
    <Container>
      <form onSubmit={(event) => onSubmit}>
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
  return (
    <p>Search Results</p>
  )
}

export default SearchListingsPage;