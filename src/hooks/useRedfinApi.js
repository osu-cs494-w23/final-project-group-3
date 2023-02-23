// noinspection JSCheckFunctionSignatures

import {useState, useEffect, useReducer} from "react";
import axios from "axios";

const redfinListingsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
}

const useRedfinListingsApi = () => {
  const [options, setOptions] = useState({
    method: 'GET',
    url: 'https://unofficial-redfin.p.rapidapi.com/properties/list',
    params: {
      region_id: '30749',
      region_type: '6',
      uipt: '1,2,3,4,7,8',
      status: '9',
      sf: '1,2,3,5,6,7',
      num_homes: '10'
    },
    headers: {
      'X-RapidAPI-Host': 'unofficial-redfin.p.rapidapi.com',
      'X-RapidAPI-Key': process.env.REACT_APP_REDFIN_KEY
    }
  });

  const [state, dispatch] = useReducer(redfinListingsReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(options);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    }
  }, [options]);

  return [state, setOptions];
}

export default useRedfinListingsApi;