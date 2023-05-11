import { useEffect } from 'react';

const useKeyEscClose = (cancel: () => void): void => {
  useEffect(() => {
    const escKeyModalClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        cancel();
      }
    };
    window.addEventListener('keydown', escKeyModalClose);
    return () => window.removeEventListener('keydown', escKeyModalClose);
  });
};

export default useKeyEscClose;
