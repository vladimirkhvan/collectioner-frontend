import { gql } from '@apollo/client';

export const CREATE_ITEM = gql`
    mutation CreateItem($input: ItemInput!) {
        createItem(input: $input) {
            id
            name
        }
    }
`;
