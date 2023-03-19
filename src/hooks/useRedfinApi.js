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
  return result;
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
  return result;
}

const useRedfinApiPropertyListingsFromLocation = (initialParams, searchFilters, verbose = false, maxRegions = 1) => {
  const [requestParams, setRequestParams] = useState(initialParams);
  const [requestFilters, setRequestFilters] = useState(searchFilters);
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
        const result = await getRedfinPropertyListingsFromLocation(requestParams, requestFilters, verbose, maxRegions);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result });
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
  }, [requestParams, requestFilters, verbose, maxRegions]);

  return [state, setRequestParams];
}
/**
 * Retrieves property details within a provided location.
 *
 * Example: I want to search for properties in Eugene OR with 3 beds, 2 baths, and a price range of 300k to 500k:
 * * useRedfinPropertyDetailsApi('97401', {min_beds: 3, min_baths: 2, min_price: 300000, max_price: 500000})
 * * useRedfinPropertyDetailsApi('Eugene OR', {min_beds: 3, min_baths: 2, min_price: 300000, max_price: 500000})
 *
 * @param location - a zip code, city, etc...
 * @param searchFilters - check the documentation for the list of available filters: https://rapidapi.com/apidojo/api/unofficial-redfin
 * @param verbose - if true, will log the request and response headers and data
 * @param maxSubRegions - the maximum number of subregions to search within the provided location. If the location is 'Eugene OR', then the subregions would be 'Downtown Eugene', 'Eugene', 'North Eugene', etc...
 */
async function getRedfinPropertyListingsFromLocation(location, searchFilters, verbose = false, maxSubRegions = 1) {
  const autoComplete = (await getAutoCompleteApi(location, verbose))['data'];
  // This will return an array of places (each containing the data we want) that match the location parameter, e.g. 'Downtown Eugene', 'Eugene', 'North Eugene'
  const places = autoComplete['payload'];
  const sections = places['sections'];
  const placesSections = sections.filter((section) => section['name'] === 'Places');
  const rows = placesSections[0]['rows'].slice(0, maxSubRegions);
  const listingsQueryInfo = rows.map((place) => {
      const queryInfo = {
        // The required parameters to search a property listing. Override them with the searchFilters parameter at your own risk.
        'region_id': place['id'].split('_')[1],
        'region_type': urlToRegionType(place['url']),
        'uipt': '1,2,3,4,7,8',
        'status': '9',
      }
      const regionInfo = {
        'name': place['name'],
        'url': place['url'],
        'subName': place['subName'],
        'countryCode': place['countryCode'],
        'type': place['type'],
        'id': place['id'],
      }
      return { 'query_info': queryInfo, 'region_info': regionInfo}

  });
  const listings = [];
  for (const listingQueryInfo of listingsQueryInfo) {
    const params = {
      'num_homes': '1', // the number of homes will be multiplied by the number of places returned by the autocomplete api. Increase this value from searchFilters if you want more results.
      'sf': '1,2,3,5,6,7', // MLS listings included
      ...listingQueryInfo['query_info'],
      ...searchFilters
    };
    if (verbose) {
      console.log('getRedfinPropertyListingsFromLocation: params:', params);
    }
    const propertyListingsData = await getPropertyListingsData(params, verbose);
    listings.push({
      'region_info': listingQueryInfo['region_info'],
      'homes': propertyListingsData.data.homes,
    });
    listings.push(await getPropertyListingsData(params, verbose));
  }
  if (verbose) {
    console.log('getRedfinPropertyListingsFromLocation: listings:', listings);
  }
  return listings;
}

function urlToRegionType(url) {
  /*
  One of the following : -1:Unknowns|1:Neighborhood|2:Zip Code|4:State|5:County|6:City|7:School|8:School District|9:Service Region|10:Minor Civil Division|11:Country|30:CA Postal Code|31:CA Province|32:CA Provincial Division|33:CA Municipality|34:CA Forward Sortation Area
  You need to use regex to examine the value of url field returned in …/auto-complete for suitable value. Ex : '/city/30749/…', it is city so it is 6 in this case.
  */
  const regex = /\/(\w+)\/\d+\//;
  const match = regex.exec(url);
  if (match) {
    const regionType = match[1];
    switch (regionType) {
      case 'neighborhood':
        return 1;
      case 'zip':
        return 2;
      case 'state':
        return 4;
      case 'county':
        return 5;
      case 'city':
        return 6;
      case 'school':
        return 7;
      case 'school-district':
        return 8;
      case 'service-region':
        return 9;
      case 'minor-civil-division':
        return 10;
      case 'country':
        return 11;
      case 'ca-postal-code':
        return 30;
      case 'ca-province':
        return 31;
      case 'ca-provincial-division':
        return 32;
      case 'ca-municipality':
        return 33;
      case 'ca-forward-sortation-area':
        return 34;
      default:
        return -1;
    }
  }
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

export {useRedfinListingsApi, useRedfinAutoCompleteApi, useRedfinApiPropertyListingsFromLocation};
