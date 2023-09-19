import { createContext, useState } from 'react';

const LoadingContext = createContext<any>(null);

type LoadingProps = {
    children: React.ReactNode
};

const LoadingProvider = ({ children }: LoadingProps) => {
    const [isLoading, setIsLoading] = useState<boolean> (true);

    const getValues = () => {
        return {
            isLoading,
            setIsLoading
        }
    }
    return (
        <LoadingContext.Provider value={getValues()}>
            {
                children
            }
        </LoadingContext.Provider>
    )
}

export { LoadingProvider, LoadingContext }