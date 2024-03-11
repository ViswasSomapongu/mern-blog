import { Button } from 'flowbite-react'
import React from 'react'

const CallToAction = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
            Want to learn more about javascript?
        </h2>
        <p className='text-gray-500 my-2'>
            Checkout these resources with 100 JavaScript projects
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl  rounded-bl-none'>
            <a href="https://www.google.com" target='_blank' rel='noopener noreferrel'>100 JavaScript projects</a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src="https://cyberhoot.com/wp-content/uploads/2020/07/Free-Courses-to-learn-JavaScript.jpg" alt="" />
      </div>
    </div>
  )
}

export default CallToAction
