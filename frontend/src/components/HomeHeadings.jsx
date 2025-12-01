import React from 'react'

const HomeHeadings = ({heading,desc}) => {
  return (
    <>
       <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {heading}
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
           {desc}
          </p>
    </>
  )
}

export default HomeHeadings
