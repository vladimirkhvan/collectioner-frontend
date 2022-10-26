import { gql } from '@apollo/client';

export const CREATE_COLLECTION = gql`
    mutation CreateCollection($input: CollectionInput!) {
        createCollection(input: $input) {
            id
        }
    }
`;
