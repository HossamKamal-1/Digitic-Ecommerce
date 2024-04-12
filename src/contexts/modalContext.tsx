import { ReactNode, createContext, useContext, useState } from 'react';
import {Modal} from '../components';
type ModalContextType = {
  openModal: (content: ReactNode) => void;
};
const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
});

type ModalProviderProps = {
  children: ReactNode;
};
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>('modal content');
  function openModal(content: ReactNode) {
    setContent(content);
    setIsModalOpen(true);
  }
  function onClose() {
    setIsModalOpen(false);
  }
  return (
    <ModalContext.Provider
      value={{
        openModal,
      }}
    >
      <Modal open={isModalOpen} onClose={onClose}>
        {content}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
