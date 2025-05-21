import React from 'react'
import { FaInbox, FaMapPin } from 'react-icons/fa'
import { FaMessage, FaPhone } from 'react-icons/fa6'
import { IoMdMail } from 'react-icons/io'

function ContactForm() {
  return (
      <div className='container mx-auto px-4 lg:px-16 py-12'>
          <section className="">
    <div className=" grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2 bg-white rounded-lg ">
                      <h2 className="text-2xl font-semibold text-[#151515] rounded-sm p-6 border mb-6">Send us a message</h2>
                      
                      <form className="p-6">
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div className='flex flex-col space-y-2'>
                     <label className='text-xs font-semibold text-[#313131]' htmlFor="name">Name</label>         
          <input
            type="text"
            className="border bg-[#fbfbfb] p-3 rounded-sm col-span-1"
          />
                          </div>
                          <div
          className="flex flex-col space-y-2"
        >
          <label className='text-xs font-semibold text-[#313131]'  htmlFor="phone">Phone Number</label>   
          <input
            type="text"
            className="border bg-[#fbfbfb] p-3 rounded-sm col-span-1"
                              />
                          </div>
                          </div>
                          <div className='space-y-4 mt-3'>
                          <div
          className="flex flex-col space-y-2"
        >
          <label className='text-xs font-semibold text-[#313131]'  htmlFor="email">Email</label>
          <input
            type="email"
            className="border bg-[#fbfbfb] p-3 rounded-sm md:col-span-2"
                              />
                          </div>
                          <div
          className="flex flex-col space-y-2"
        >
          <label className='text-xs font-semibold text-[#313131]'  htmlFor="message">Message</label>
          <textarea
            className="border bg-[#fbfbfb] p-3 rounded-sm md:col-span-2 min-h-[100px]"
                              />
                          </div>
                          </div>
          <button
            type="submit"
            className="bg-green-700  text-white font-semibold py-3 rounded mt-10 w-full md:col-span-2"
          >
            Send message
          </button>
        </form>
      </div>
      <div className="rounded-lg  flex flex-col gap-8">
                      <div className="bg-white" >
                          <div>
          <h3 className="text-2xl font-semibold text-[#151515] rounded-sm p-6 border mb-6">Contact Information</h3> 
                          </div>
          <div className="space-y-2 p-6 text-sm">
            <p className="flex items-center gap-2">
              <span className="text-green-700"><FaPhone/></span> +234 812 345 67
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-700"><IoMdMail/></span> tetramanor@mail.com
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-700"><FaMapPin/></span> tetramanor address
            </p>
          </div>
        </div>
        <div className='mt-4 bg-white'>
          <h3 className="text-2xl font-semibold text-[#151515] rounded-sm p-6 border mb-6">Business Hours</h3>
          <div className="text-sm space-y-2 p-6">
            <p className='font-semibold text-xs text-[#0B0A0A]'>
              MONDAY – FRIDAY
           
                              </p>
                              <p className='text-[#0B0A0A]'>
                              09:00am - 08:00pm               
</p>
            <p className="mt-2 font-semibold text-xs text-[#0B0A0A]">
              SATURDAY – SUNDAY
                              </p>
                              <p  className='text-[#0B0A0A]'>
                              09:00am - 08:00pm
                              </p>
          </div>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default ContactForm