// noinspection JSCheckFunctionSignatures

import {useState, useEffect, useReducer} from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://unofficial-redfin.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Host': 'unofficial-redfin.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_REDFIN_KEY
  }
});


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

/*
  * @initialParams is injected into the GET request as seen in the
  * documentation property/list: https://rapidapi.com/apidojo/api/unofficial-redfin
 */
const useRedfinListingsApi = (initialParams) => {
  const [requestParams, setRequestParams] = useState(initialParams);
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
        const result = await axiosInstance.get('/properties/list', {
          params: requestParams
        });
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
  }, [requestParams]);

  return [state, setRequestParams];
}

/*
  * The location parameter can be many things, such as a zip code, city, etc...
  * https://rapidapi.com/apidojo/api/unofficial-redfin
 */
const useRedfinAutoCompleteApi = (initialLocation) => {
  const [requestParams, setRequestParams] = useState(initialLocation);
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
        const result = await axiosInstance.get('/auto-complete', {
          params: {
            location: requestParams
          }
        });
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
  }, [requestParams]);

  return [state, setRequestParams];
}

export {useRedfinListingsApi, useRedfinAutoCompleteApi};