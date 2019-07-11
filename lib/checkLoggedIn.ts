import gql from "graphql-tag";

export default apolloClient =>
  apolloClient
    .query({
      query: gql`
        query {
          me {
            id
            email
            firstName
            lastName
            permissions
          }
        }
      `,
    })
    .then(({ data }) => ({ loggedInUser: data }))
    .catch(() =>
      // Fail gracefully
      ({ loggedInUser: {} })
    );
