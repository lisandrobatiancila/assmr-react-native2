import React, {useContext} from 'react';
import {createContext, useState} from 'react';
import {SearchContextModel} from '../../models/search/SearchModel';

type SearchProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<SearchContextModel | null>(null);

const SearchProvider = ({children}: SearchProviderProps) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const getSearchContextValues = (): SearchContextModel => {
    return {
      openSearch,
      setOpenSearch,
    };
  };

  return (
    <SearchContext.Provider value={getSearchContextValues()}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (SearchContext === undefined) {
    throw new Error('No context available');
  }
  return context;
};

export default SearchProvider;
