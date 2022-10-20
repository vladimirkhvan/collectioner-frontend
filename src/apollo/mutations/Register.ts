import { gql } from '@apollo/client';

export const REGISTER = gql`
    mutation CreateUser($input: UserInput!) {
        createUser( input: $input ){
            id
        }
    }
`;
