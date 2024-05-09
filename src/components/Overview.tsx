import { ScenarioType } from '@/models';
import { createScenario } from '@/remotes/scenario';
import { memo, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const Overview = memo(function Overview() {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<ScenarioType>();
  const [isOpen, setIsOpen] = useState(false);

  // const handlePreview = async () => {
  //   const result = await trigger(['title', 'description']);
  //   if (result) {
  //     setIsOpen(true);
  //   }
  // };

  const handlePreview = () => {
    setIsOpen(true);
  };

  console.log('isOpen!', isOpen);

  const handleClick = handleSubmit(async formData => {
    const response = await createScenario(formData);
    console.log(response);
  });

  return (
    <div className="flex flex-col gap-10">
      <h1>오버뷰</h1>
      {!isOpen ? (
        <div>
          <h3>타이틀</h3>
          <input type="text" {...register('title', { required: true })} />
          {errors.title && <p>{errors.title.message}</p>}
          <h3>시나리오 설명</h3>
          <textarea className="text-black" {...register('description', { required: true })} />
          {errors.description && <p>{errors.description.message}</p>}
          <button onClick={handlePreview}>미리보기</button>
        </div>
      ) : (
        <Preview formData={getValues()} onClick={handleClick} />
      )}
    </div>
  );
});

interface PreviewProps {
  formData: ScenarioType;
  onClick: () => void;
}
function Preview({ formData, onClick }: PreviewProps) {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h3>{formData.title}</h3>
        <h3>{formData.genre}</h3>
        <h3>{formData.background}</h3>
        <h3>{formData.prologue}</h3>
        <h3>{formData.description}</h3>
      </div>
      <button onClick={onClick}>생성</button>
    </div>
  );
}

export default Overview;
// import { ScenarioType } from '@/models';
// import { createScenario } from '@/remotes/scenario';
// import { useEffect, useMemo, useState } from 'react';
// import { useFormContext } from 'react-hook-form';

// export default function Overview() {
//   const {
//     register,
//     handleSubmit,
//     getValues,
//     trigger,
//     formState: { errors },
//   } = useFormContext<ScenarioType>();
//   const [isOpen, setIsOpen] = useState(false);

//   const handlePreview = async () => {
//     const result = await trigger(['title', 'description']);
//     if (result) {
//       setIsOpen(true);
//     }
//   };

//   // console.log('isOpen!', isOpen);

//   const handleClick = handleSubmit(async formData => {
//     const response = await createScenario(formData);
//     console.log(response);
//   });

//   return (
//     <div className="flex flex-col gap-10">
//       <h1>오버뷰</h1>
//       {!isOpen ? (
//         <div>
//           <h3>타이틀</h3>
//           <input type="text" {...register('title', { required: true })} />
//           {errors.title && <p>{errors.title.message}</p>}
//           <h3>시나리오 설명</h3>
//           <textarea className="text-black" {...register('description', { required: true })} />
//           {errors.description && <p>{errors.description.message}</p>}
//           <button onClick={handlePreview}>미리보기</button>
//         </div>
//       ) : (
//         <Preview formData={getValues()} onClick={handleClick} />
//       )}
//     </div>
//   );
// }

// interface PreviewProps {
//   formData: ScenarioType;
//   onClick: () => void;
// }
// function Preview({ formData, onClick }: PreviewProps) {
//   return (
//     <div className="flex flex-col gap-10">
//       <div>
//         <h3>{formData.title}</h3>
//         <h3>{formData.genre}</h3>
//         <h3>{formData.background}</h3>
//         <h3>{formData.prologue}</h3>
//         <h3>{formData.description}</h3>
//       </div>
//       <button onClick={onClick}>생성</button>
//     </div>
//   );
// }
