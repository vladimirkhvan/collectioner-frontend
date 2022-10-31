import { gql } from '@apollo/client';

export const GET_CUSTOM_FIELDS = gql`
    query GetCustomFields($collection_id: String) {
        getCustomFields(collection_id: $collection_id) {
            id
            attribute
            attribute_type
        }
    }
`;
