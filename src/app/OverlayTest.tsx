'use client';
import BottomSheet from '@/components/shared/ui/Bottomsheet';
import useOverlay from '@/hooks/useOverlay';
import Content from './Content';
import { useState } from 'react';
import { Button } from '@/components/shared/ui/Button';

export default function OverlayTest() {
  const { open, close } = useOverlay();
  const [parent, setParent] = useState('Parent ');
  console.log('부모 리렌더링!');

  return (
    <div className="mb-8">
      <h1>부모 상태는?: {parent}</h1>
      <button onClick={() => setParent(prev => prev + 'change ')}>부모 상태바꾸기</button>
      <div className="mt-8">
        <Button
          onClick={() =>
            open(
              <BottomSheet>
                <Content parent={parent} close={close} />
              </BottomSheet>
            )
          }
        >
          Open!
        </Button>
      </div>
    </div>
  );
}

// 'use client';

// import BottomSheet from '@/components/shared/ui/Bottomsheet';
// import { Text } from '@/components/shared/ui/Text';
// import useOverlay from '@/hooks/useOverlay';
// import Content from './Content';
// import { useState } from 'react';
// import { Button } from '@/components/shared/ui/Button';

// export default function OverlayTest() {
//   const { open } = useOverlay();
//   const [parent, setParent] = useState('Parent ');
//   console.log('부모 리렌더링!');

//   return (
//     <div className="mb-8">
//       <h1>부모 상태는?: {parent}</h1>
//       <button onClick={() => setParent(prev => prev + 'change ')}>부모 상태바꾸기</button>
//       <div className="mt-8">
//         <Button
//           onClick={() =>
//             open(close => (
//               <BottomSheet>
//                 <Content parent={parent} close={close} />
//               </BottomSheet>
//             ))
//           }
//         >
//           Open!
//         </Button>
//       </div>
//     </div>
//   );
// }
