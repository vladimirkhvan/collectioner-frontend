import { useOutletContext } from "react-router-dom";

type UserContext = {
    setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export function useUser() {
    return useOutletContext<UserContext>();
}
