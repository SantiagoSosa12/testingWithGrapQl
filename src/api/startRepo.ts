import { gql } from '@apollo/client';

export const STAR_REPO = gql`
  mutation ($repoId: ID!) {
    addStar(input: { starrableId: $repoId }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`;

export const UNSTAR_REPO = gql`
  mutation ($repoId: ID!) {
    removeStar(input: { starrableId: $repoId }) {
      starrable {
        stargazers {
          totalCount
        }
      }
    }
  }
`;
