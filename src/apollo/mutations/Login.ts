import { gql } from '@apollo/client';

interface loginProps {
    email: string,
    password: string,
}

export const LOGIN = ({email, password}: loginProps) => {
    return gql`
        mutation {
            login(input: { email: "${email}", password: "${password}" }) {
                id
            }
        }
    `;
};
