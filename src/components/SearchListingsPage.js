import {useRedfinApiPropertyListingsFromLocation} from "../hooks/useRedfinApi";

function SearchListingsPage(props) {

  return (
      <div>
        <SearchFilterBar></SearchFilterBar>
        <SearchResults></SearchResults>
      </div>
  )
}

function SearchFilterBar(props) {
  return (
    <p>Search Filter Bar</p>
  )
}

function SearchResults(props) {
  return (
    <p>Search Results</p>
  )
}

export default SearchListingsPage;