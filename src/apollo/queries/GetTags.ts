import { gql } from '@apollo/client';

export const GET_TAGS = gql`
    query Query {
        getTags {
            id
            title
        }
    }
`;
