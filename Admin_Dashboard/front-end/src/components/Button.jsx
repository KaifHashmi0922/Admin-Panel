import React from "react";
export function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg font-medium transition ${className}`}
    >
      {children}
    </button>
  );
}

export default function RadioGroup({ label, options, value, onChange }) {
  return (
    <div className="space-y-2">

      <p className="font-medium text-gray-700">{label}</p>

      <div className="flex gap-4 flex-wrap">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">

            <input
              type="radio"
              name={label}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="w-4 h-4 accent-indigo-600"
            />

            <span>{opt}</span>
          </label>
        ))}
      </div>

    </div>
  );
}


// export default function CheckboxGroup({ label, options, values, onChange }) {

//   const toggle = (item) => {
//     if (values.includes(item)) {
//       onChange(values.filter(v => v !== item));
//     } else {
//       onChange([...values, item]);
//     }
//   };

//   return (
//     <div className="space-y-2">

//       <p className="font-medium text-gray-700">{label}</p>

//       <div className="flex gap-4 flex-wrap">
//         {options.map(opt => (
//           <label key={opt} className="flex items-center gap-2 cursor-pointer">

//             <input
//               type="checkbox"
//               checked={values.includes(opt)}
//               onChange={() => toggle(opt)}
//               className="w-4 h-4 accent-indigo-600"
//             />

//             <span>{opt}</span>
//           </label>
//         ))}
//       </div>

//     </div>
//   );
// }
