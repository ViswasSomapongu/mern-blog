import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Viswas's Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
            Welcome to Viswas's Blog! This blog was developed as a personal project to test and showcase my skills in web development.
            As a passionate developer, I'm constantly exploring new technologies and honing my coding abilities.
            </p>

            <p>
            Here, you'll discover a collection of articles, tutorials, and projects reflecting my journey in the world of technology.
            From web development insights to software engineering concepts, this blog serves as a platform to share thoughts, ideas, and experiments with fellow enthusiasts like you.
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
