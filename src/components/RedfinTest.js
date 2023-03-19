import React from "react";
import {useRedfinListingsApi, useRedfinAutoCompleteApi} from "../hooks/useRedfinApi";

function RedfinTest(props) {
  const [listings] = useRedfinListingsApi({
    region_id: '30749',
    region_type: '6',
    uipt: '1,2,3,4,7,8',
    status: '9',
    sf: '1,2,3,5,6,7',
    num_homes: '10',
  }, false);

  const preCodeStyle = {
    textAlign: 'left',
    padding: '2rem',
    // backgroundColor:'black',
    fontSize: '12px',
    fontFamily: 'sans-serif'
  }

  const [autoComplete] = useRedfinAutoCompleteApi('san francisco', false);
  return (
    <div style={{overflowY: 'auto', height: '100%', width:'100%', flexWrap: 'wrap'}}>
      <p>Redfin Test</p>
      <h1>AutoComplete endpoint</h1>
      <div style={{wordWrap:'break-word'}}>
        {autoComplete.isLoading && !autoComplete.isError ? ( <p>Loading...</p> ) : (
            <pre style={preCodeStyle}>
              {JSON.stringify(autoComplete.data,null,2.5)}
            </pre>)}
        {autoComplete.isError && <p>Something went wrong ...</p>}
      </div>
      <br></br>
      <h1>Listings endpoint</h1>
      <div style={{padding:'1rem', wordWrap:'break-word'}}>
        {listings.isLoading && !listings.isError ? (<p>Loading...</p>) : (
            <pre style={preCodeStyle}>
              {JSON.stringify(listings.data,null,2.5)}
            </pre>)}
        {listings.isError && <p>Something went wrong ...</p>}
      </div>
    </div>
  );
}

export default RedfinTest;
