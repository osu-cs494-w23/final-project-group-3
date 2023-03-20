import {useRedfinApiPropertyListingsFromLocation} from "../hooks/useRedfinApi";

function SearchListingsPage(props) {

  return (
      <div>
        <SearchFilterBar></SearchFilterBar>
        <p>Search Listings Page</p>
      </div>
  )
}

function SearchFilterBar(props) {
  return (
    <p>Search Filter Bar</p>
  )
}

export default SearchListingsPage;