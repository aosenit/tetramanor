import React from 'react'
import Image from 'next/image'
import eight from '../../../../public/about/eight.png'
import seven from '../../../../public/about/seven.png'
import icon1 from '../../../../public/about/one.png'
import icon2 from '../../../../public/about/two.png'
import icon3 from '../../../../public/about/three.png'
import icon4 from '../../../../public/about/four.png'
import icon5 from '../../../../public/about/five.png'

const features = [
    {
      icon: icon1,
      label: 'Reasonable prices',
    },
    {
      icon: icon2,
      label: 'Flexible payment',
    },
    {
      icon: icon3,
      label: 'Verified listings',
    },
    {
      icon: icon4,
      label: '24/7 support',
    },
    {
      icon: icon5,
      label: 'Seamless onboarding',
    },
  ];
function TetramoreCode() {
  return (
      <div  className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div>
              <h1 className='text-3xl text-[#CD6115] font-semibold'>The Tetramanor Code</h1>
              <p className='mt-4 text-gray-700 text-sm'>This is the promise we make to our clients:</p>
          </div>
          <div className='mt-10 space-y-6'>
              <Image
                  src={eight}
                  alt="icon"
                  className='text-black'
                  width={700}
                  height={700}
              />  
              <p className='text-sm text-[#202020]'>We will not compromise our standards for any reason whatsoever.</p>
              <p className='text-sm text-[#202020]'>We will not extort our clients to make a profit.</p>
              <p className='text-sm text-[#202020]'>We will not sell to our clients spaces we are not willing to live  in ourselves.</p>
              <Image
                  src={seven}  
                  alt="icon"
                  className='mr-10'
                  width={700}
                  height={700}
              />
          </div>
          
          <div className="flex flex-wrap gap-4 mt-6">
      {features.map((item, index) => (
        <button
          key={index}
          className="flex text-sm font-medium items-center gap-2 px-4 py-2 bg-[#f5f5f5] rounded-sm"
        >
          <Image src={item.icon} alt="icon" width={30} height={30} />
          {item.label}
        </button>
      ))}
    </div>
    </div>
  )
}

export default TetramoreCode