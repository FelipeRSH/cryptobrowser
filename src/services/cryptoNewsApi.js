import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
const cryptoNewsApiHeaders =  {
  
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST
}
const createRequest = (url) => ({url,headers:cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery( {baseUrl:process.env.REACT_APP_NEWS_API_URL} ),
    endpoints: (builder) => ({
      getCryptoNews: builder.query({
        query: ({newsCategory,contagem}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&count=${contagem}`),
        
      }),
    }),
  });

export const {
    useGetCryptoNewsQuery,
} = cryptoNewsApi;