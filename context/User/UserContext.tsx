import { createContext, useContext, useState } from 'react';
import { ActiveUserInformation } from '../../models/user/UserModel';


const UserContext = createContext<ActiveUserInformation | null>(null);

type ProviderProps = {
    children: React.ReactNode
};

const UserProvider = ({ children }: ProviderProps) => {
    const [userId, setUserId] = useState<number>(0);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('');
    const [middlename, setMiddlename] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    const getValues = (): ActiveUserInformation => {
        return {
            userId,
            setUserId,
            email, 
            setEmail,
            firstname, 
            setFirstname,
            middlename, 
            setMiddlename,
            lastname, 
            setLastname,
            address, 
            setAddress
        }
    }

    return (
        <UserContext.Provider value={ getValues() }>
            {
                children
            }
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (UserContext === undefined) {
        throw new Error("No context availabel.")
    }
    return context;
}

export default UserProvider;