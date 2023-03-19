// noinspection JSCheckFunctionSignatures

import {useState, useEffect, useReducer} from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://unofficial-redfin.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Host': 'unofficial-redfin.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_REDFIN_KEY,
    'Content-Type': 'application/json'
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
const useRedfinListingsApi = (initialParams, verbose = false) => {
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
        const result = await getPropertyListingsData(requestParams, verbose);
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
  }, [requestParams, verbose]);

  return [state, setRequestParams];
}

async function getPropertyListingsData(params, verbose = false) {
  const [reqInterceptor, responseInterceptor] = verboseAxiosInterceptor('getPropertyListingsData', verbose);
  const result = await axiosInstance.get('/properties/list', {
    params: params
  });
  axiosInstance.interceptors.request.eject(reqInterceptor);
  axiosInstance.interceptors.response.eject(responseInterceptor);
  return result.data;
}

/*
  * The location parameter can be many things, such as a zip code, city, etc...
  * https://rapidapi.com/apidojo/api/unofficial-redfin
 */
const useRedfinAutoCompleteApi = (initialLocation, verbose = false) => {
  const [locationParam, setLocationParam] = useState(initialLocation);
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
        const result = await getAutoCompleteApi(locationParam, verbose);
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
  }, [locationParam, verbose]);

  return [state, setLocationParam];
}

async function getAutoCompleteApi(location, verbose = false) {
  const [reqInterceptor, responseInterceptor] = verboseAxiosInterceptor('useAutoCompleteApi', verbose);
  const result = await axiosInstance.get('/auto-complete', {
    params: {
      location: location
    }
  });
  axiosInstance.interceptors.request.eject(reqInterceptor);
  axiosInstance.interceptors.response.eject(responseInterceptor);
  return result.data;
}

const useRedfinApiPropertyListingsFromLocation = (initialParams, verbose = false) => {
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
        const result = await getRedfinPropertyListingsFromLocation(requestParams, verbose);
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
  }, [requestParams, verbose]);

  return [state, setRequestParams];
}

/**
 * Retrieves property details within a provided location.
 *
 * Example: I want to search for properties in Eugene OR with 3 beds, 2 baths, and a price range of 300k to 500k:
 * * useRedfinPropertyDetailsApi('97401', {min_beds: 3, min_baths: 2, min_price: 300000, max_price: 500000}, false)
 * * useRedfinPropertyDetailsApi('Eugene OR', {min_beds: 3, min_baths: 2, min_price: 300000, max_price: 500000}, false)
 *
 * @param location - a zip code, city, etc...
 * @param searchFilters - check the documentation for the list of available filters: https://rapidapi.com/apidojo/api/unofficial-redfin
 * @param verbose - if true, will log the request and response headers and data
 */
const getRedfinPropertyListingsFromLocation = async (location, searchFilters, verbose = false) => {
  const [autoComplete] = createDeepDictionary(await getAutoCompleteApi(location, verbose));
  // This will return an array of places (each containing the data we want) that match the location parameter, e.g. 'Downtown Eugene', 'Eugene', 'North Eugene'
  const places = autoComplete['payload']['sections'].filter((section) => section['name'] === 'Places')['rows'];
  const listingsQueryInfo = places.map((place) => {
    return {
      'region_id': place['id'],
      'region_type': place['type'],
      'uipt': '1,2,3,4,7,8', // Comma separated string of property types.
      'status': '9'
    }
  });
  const listings = [];
  for (const queryInfo of listingsQueryInfo) {
    const params = {
      'num_homes': '20',
      ...queryInfo,
      ...searchFilters
    };
    listings.push(await getPropertyListingsData(params, verbose));
  }
  return listings;
}

function createDeepDictionary(obj) {
  const result = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'object') {
        const deepResult = createDeepDictionary(value);
        deepResult.forEach((deepValue) => {
          result.push([key, deepValue].join('.'));
        });
      } else {
        result.push([key, value].join('.'));
      }
    }
  }
  return result;
}

function verboseAxiosInterceptor(functionName, verbose = false) {
  const reqInterceptor = axiosInstance.interceptors.request.use(res => {
    if (verbose) {
      console.log(functionName + ': request header:', res.headers);
      console.log(functionName + ': request data:', res.data);
    }
    return res;
  }, error => Promise.reject(error));
  const responseInterceptor = axiosInstance.interceptors.response.use(res => {
    if (verbose) {
      console.log(functionName + ': response header:', res.headers);
      console.log(functionName + ': response data:', res.data);
    }
    return res;
  }, error => Promise.reject(error));
  return [reqInterceptor, responseInterceptor];
}

export {useRedfinListingsApi, useRedfinAutoCompleteApi};
