import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
    query GetItems($collection_id: String) {
        getItems(collection_id: $collection_id) {
            id
            name
        }
    }
`;
