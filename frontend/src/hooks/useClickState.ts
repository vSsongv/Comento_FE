import { useRef } from 'react';
import { SetterOrUpdater } from 'recoil';

type useClickStateProps = [React.RefObject<HTMLDivElement>, (e: MouseEvent) => void];

const useClickState = (
  setChoosing: SetterOrUpdater<boolean> | React.Dispatch<React.SetStateAction<boolean>>
): useClickStateProps => {
  const searchInputRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (e: MouseEvent): void => {
    if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
      setChoosing(false);
    }
  };

  return [searchInputRef, handleClickOutside];
};

export default useClickState;
