import React from "react";
import useRedfinListingsApi from "../hooks/useRedfinApi";

function RedfinTest(props) {
  const [{ data, loading, isError }] = useRedfinListingsApi({
    region_id: '30749',
    region_type: '6',
    uipt: '1,2,3,4,7,8',
    status: '9',
    sf: '1,2,3,5,6,7',
    num_homes: '10',
  });
  return (
    <div>
      <p>Redfin Test</p>
      <p>You know things are working if you see json all over the screen</p>
      {loading ? ( <div>Loading...</div> ) : ( <div>{JSON.stringify(data)}</div> )}
      {isError && <div>Something went wrong ...</div>}
    </div>
  );
}

export default RedfinTest;