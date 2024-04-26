import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
        Interested in expanding your skills?
        </h2>
        <p className='text-gray-500 my-2'>
        Explore these valuable resources to enhance your knowledge.
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl  rounded-bl-none'>
            <a href="https://www.google.com" target='_blank' rel='noopener noreferrel'>Discover More</a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src="https://images.cnbctv18.com/wp-content/uploads/2018/09/2018-09-25T152252Z_1_LYNXNPEE8O1CX_RTROPTP_3_RENAULT-NISSAN-GOOGLE.jpg?im=FitAndFill,width=1200,height=900" alt="" />
      </div>
    </div>
  )
}

export default CallToAction
