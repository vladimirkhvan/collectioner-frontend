import { gql } from '@apollo/client';

export const CREATE_THEME = gql`
    mutation CreateTheme($input: ThemeInput!) {
        createTheme(input: $input) {
            id
        }
    }
`;
