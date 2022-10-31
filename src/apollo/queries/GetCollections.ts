import { gql } from '@apollo/client';

export const GET_COLLECTIONS = gql`
    query {
        getCollections {
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
