import { gql } from '@apollo/client';

export const GET_ONE_COLLECTION = gql`
    query GetOneCollection($id: String) {
        getOneCollection(id: $id) {
            id
            name
            authorId
            description
            theme
            image
            user{
                name
            }
        }
    }
`;
