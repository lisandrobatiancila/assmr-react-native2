import React, {createContext, useContext, useState} from 'react';
import {ModalModel} from '../../models/modal/Modal';

type ModalProviderProps = {
  children: React.ReactNode;
};

const ModalContext = createContext<ModalModel | null>(null);

export const ModalProvider = ({children}: ModalProviderProps) => {
  const [isOpenedModal, setIsOpenedModal] = useState<boolean>(false);

  const getModalValues = (): ModalModel => {
    return {
      isOpenedModal,
      setIsOpenedModal,
    };
  };

  return (
    <ModalContext.Provider value={getModalValues()}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (ModalContext === undefined) {
    throw new Error('No modal context');
  }
  return context;
};
