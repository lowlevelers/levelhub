export const GET_REPOSITORY_ISSUES_QUERY = (owner: string, name: string) => {
  return `{
   repository(owner: "${owner}", name: "${name}") {
     issues(first: 100) {
       edges {
         node {
           id
           activeLockReason
           state
           stateReason
           closedAt
           isPinned
           labels {
              __typename
            }
           labels {
             totalCount
             nodes {
               name
               color
               createdAt
               isDefault
             }
           }
           lastEditedAt
           body
           comments(first: 100) {
             nodes {
               reactions {
                 viewerHasReacted
                 totalCount
               }
               publishedAt
             }
           }
           author {
             avatarUrl
             login
           }
           assignees(first: 100) {
            nodes {
              name
              login
            }
             pageInfo {
               startCursor
               endCursor
               hasNextPage
             }
             totalCount
           }
         }
       }
     }
   }
 }`;
};
