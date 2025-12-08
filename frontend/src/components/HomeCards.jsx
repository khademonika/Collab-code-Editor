import React from 'react'

const HomeCards = ({text,  desc, icon}) => {
  return (
  
           <div className=" join card backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
            <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{text}</h3>
            <p className="text-gray-400">{desc}</p>
          </div>
  
  )
}

export default HomeCards
