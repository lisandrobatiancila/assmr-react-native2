import React, {createContext, useContext, useState} from 'react';
import {LoadingBarModel} from '../../models/user/UserModel';

const LoadingContext = createContext<LoadingBarModel | null>(null);

type LoadingProps = {
  children: React.ReactNode;
};

const LoadingProvider = ({children}: LoadingProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getValues = (): LoadingBarModel => {
    return {
      isLoading,
      setIsLoading,
    };
  };
  return (
    <LoadingContext.Provider value={getValues()}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (LoadingContext === undefined) {
    throw new Error('No context available');
  }
  return context;
};
export default LoadingProvider;
