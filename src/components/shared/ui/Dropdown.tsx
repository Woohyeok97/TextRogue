'use client';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  position?: keyof typeof positionOptions;
}

export default function Dropdown({ children, trigger, position = 'bottom' }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  // 드롭다운 핸들러
  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  // 드롭다운 바깥영역 클릭 이벤트 처리
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        console.log('close');
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const dropdownAnimation = isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95';

  return (
    <div className="relative">
      <button onClick={handleClick} ref={dropdownRef}>
        {trigger}
      </button>
      <div
        className={`
        absolute ${positionOptions[position]} min-w-[100px] bg-gray-600 rounded p-2 border border-gray-400
        transition-all duration-300 ease-in-out transform ${dropdownAnimation}
        `}
      >
        {children}
      </div>
    </div>
  );
}

const positionOptions = {
  bottom: 'top-full left-0 mt-2',
  top: 'bottom-full left-0 mb-2',
  left: 'right-full top-0 mr-2',
  right: 'left-full top-0 ml-2',
};

// 'use client';
// import { useEffect, useRef, useState } from 'react';

// interface DropdownProps {
//   children: React.ReactNode;
//   trigger: React.ReactNode;
//   position?: keyof typeof positionOptions;
// }

// export default function Dropdown({ children, trigger, position = 'bottom' }: DropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // 드롭다운 핸들러
//   const handleClick = () => {
//     setIsOpen(prev => !prev);
//   };

//   // 드롭다운 바깥영역 클릭 이벤트 처리
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target as Node;
//       if (dropdownRef.current && !dropdownRef.current.contains(target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button onClick={handleClick}>{trigger}</button>
//       {isOpen && (
//         <div
//           className={`absolute ${positionOptions[position]} min-w-[100px] bg-gray-600 rounded p-2 border border-gray-400`}
//         >
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// const positionOptions = {
//   bottom: 'top-full left-0 mt-2',
//   top: 'bottom-full left-0 mb-2',
//   left: 'right-full top-0 mr-2',
//   right: 'left-full top-0 ml-2',
// };
