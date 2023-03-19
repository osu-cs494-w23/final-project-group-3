import React from "react";
import {
  useRedfinApiPropertyListingsFromLocation,
} from "../hooks/useRedfinApi";

const preCodeStyle = {
  textAlign: 'left',
  padding: '2rem',
  // backgroundColor:'black',
  fontSize: '12px',
  fontFamily: 'sans-serif'
}

function RedfinTest(props) {
  const regionName = 'san francisco';
  //const locationName = 'sf';
  // const locationName = '97402';
  const searchFilters = {
    'min_price': '75000',
    'num_homes': '1',
  }

  const [listingsFromLocation] = useRedfinApiPropertyListingsFromLocation(regionName,  searchFilters, true, 1);
  return (
    <div style={{overflowY: 'auto', height: '100%', width:'100%', flexWrap: 'wrap'}}>
      <p>Redfin Test</p>
      <h2>Getting property listings from a region</h2>
      <div style={{padding:'1rem', wordWrap:'break-word'}}>
        {listingsFromLocation.isLoading && !listingsFromLocation.isError ? (<p>Loading...</p>) : (
            <pre style={preCodeStyle}>
              {JSON.stringify(listingsFromLocation.data,null,2.5)}
            </pre>)}
        {listingsFromLocation.isError && <p>Something went wrong ...</p>}
      </div>
    </div>
  );
}

export default RedfinTest;
