'use client';

import { useState } from 'react';

interface DropdownProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  position?: keyof typeof positionOptions;
}

export default function Dropdown({ children, trigger, position = 'bottom' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative">
      <button onClick={handleClick}>{trigger}</button>
      {isOpen && (
        <div className={`absolute ${positionOptions[position]} bg-gray-600 rounded p-5`}>
          {children}
        </div>
      )}
    </div>
  );
}

const positionOptions = {
  bottom: 'top-full left-0 mt-2',
  top: 'bottom-full left-0 mb-2',
  left: 'right-full top-0 mr-2',
  right: 'left-full top-0 ml-2',
};
