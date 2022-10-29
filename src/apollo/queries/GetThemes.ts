import { gql } from '@apollo/client';

export const GET_THEMES = gql`
    query {
        getThemes {
            id
            label
        }
    }
`;
