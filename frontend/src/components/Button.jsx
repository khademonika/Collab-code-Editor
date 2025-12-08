import React from 'react'

const Button = ({handlefun, disabledfun, icon, state,trueVal,falseval}) => {
  return (
    <div>
           <button
            onClick={handlefun}
            disabled={disabledfun}
            className={`w-full py-3 text-lg flex items-center mt-5 justify-center gap-2 rounded-lg transition ${state
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            {icon}
            {state ? trueVal: falseval}
          </button>
    </div>
  )
}

export default Button
