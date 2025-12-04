import React from 'react'

const InputCompo = ({ fun, value, placeholder }) => {
    return (
        <div className=''>
            <input
                type="text"
                value={value}
                onChange={fun}
                placeholder={placeholder}
                className="px-10 text-gray-700 placeholder:text-gray-500  py-3 border border-gray-300 w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

        </div>
    )
}

export default InputCompo
