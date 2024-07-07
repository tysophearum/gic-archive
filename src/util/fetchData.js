import { GraphQLClient } from 'graphql-request';

const fetchData = async (endpoint, query, variable, header) => {
  const graphQLClient = new GraphQLClient(endpoint, {headers: header});
  let data = null;
  let error = null;
  try {
    const response = await graphQLClient.request(query, variable);
    data = response;
  } catch (err) {
    error = err;
    console.log(err);
  }
  return [data, error]
};

export default fetchData;