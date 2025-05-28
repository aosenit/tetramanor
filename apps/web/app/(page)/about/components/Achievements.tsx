import React from 'react'
import Image from 'next/image';
import icon1 from '../../../../public/about/book.png'
import icon2 from '../../../../public/about/house.png'
import icon3 from '../../../../public/about/forex.png'
import highh from '../../../../public/about/highh.png'
import about from '../../../../public/about/about.png'
import burrow from '../../../../public/portfolio/burrows.jpg'
import queenmary from '../../../../public/portfolio/queenmary.png'
import meadows from '../../../../public/portfolio/meadows.jpg'

const achievements = [
    {
      image: icon1,
      title: 'Rental Disbursements',
      description:
        'In 2024, we disbursed over ₦22m in rental payments to homeowners who subscribed to our property management services.',
    },
    {
      image: icon2,
      title: '100+ Families Housed',
      description:
        'We’ve helped over 100 families find modern, high-value homes that offer both comfort and long-term potential.',
    },
    {
      image: icon3,
      title: 'TM Gardens: 120% growth in 2 years.',
      description:
        'TM Gardens, initially priced at ₦55M, is now valued at ₦120M in two years. Every home we build is crafted to offer both comfort and tangible returns.',
    },
];

const properties = [
    {
      title: 'TM Highgardens',
      type: '3-bedroom mansion',
      launchValue: '$250,000',
      currentValue: '$450,000',
      image: about, // Use different images if needed
    },
    {
      title: 'Comfy Burrows',
      type: '3-bedroom mansion',
      launchValue: '$180,000',
      currentValue: '$320,000',
      image: burrow,
    },
    {
      title: 'Queen Mary',
      type: '3-bedroom mansion',
      launchValue: '$400,000',
      currentValue: '$700,000',
      image: queenmary,
    },
    {
      title: 'TM Meadows',
      type: '3-bedroom mansion',
      launchValue: '$120,000',
      currentValue: '$210,000',
      image: meadows,
    },
  ];

export default function Achievements() {
  return (
    <div  className="container mx-auto px-4 md:px-8 lg:px-16 py-12">
          <div className='max-w-2xl text-center mx-auto'>
              <h2 className="text-3xl text-black font-semibold">Our Achievements to Date</h2>
              <p className='mt-4 text-gray-700 text-sm'>We don’t just build homes — we create long-term value. From strong capital growth to rental returns, our milestones reflect our commitment to building wealth for our clients.</p>
          </div>
          <div className="grid mt-6 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((item, index) => (
        <div key={index} className=" p-6 bg-[#f5f5f5] rounded-lg ">
          <Image src={item.image} alt={item.title} width={40} height={40} />
          <h4 className="mt-4 text-black text-lg font-semibold">{item.title}</h4>
          <p className="mt-2 text-sm text-gray-700">{item.description}</p>
        </div>
      ))}
          </div>
          <div className='mt-12 p-6 bg-[#f5f5f5] rounded-lg'>
              <div className='flex items-center justify-between'>
                  <div>
                      <h3 className='text-lg text-black font-semibold'>Proven Capital Appreciation</h3>
                      <p className='mt-2 text-sm text-gray-700'>
                      We've also seen impressive capital growth across our projects.
                      </p>
                  </div>
                  <Image src={highh} alt="icon" width={40} height={40} />
              </div>
              <div className="grid gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-4">
      {properties.map((property, index) => (
        <div
          key={index}
          className="relative rounded-xl overflow-hidden max-w-sm text-white"
        >
          <Image
            src={property.image}
            alt={property.title}
            layout="responsive"
            width={578}
            height={766}
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 flex flex-col justify-end">
            <div className="absolute top-4 left-4 bg-slate-700/60 px-3 py-1 rounded-full text-sm font-medium">
              {property.type}
            </div>
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <ul className="text-sm space-y-1">
              <li>
                • Launch Value: <span className="font-semibold">{property.launchValue}</span>
              </li>
              <li>
                • Current Value: <span className="font-semibold">{property.currentValue}</span>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
          </div>
    </div>
  )
}
