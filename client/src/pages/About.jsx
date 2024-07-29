import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <p>
              I'm Viswas, a passionate software engineer from India, currently
              navigating my final year at CBIT Hyderabad. My expertise lies in
              Fullstack development, and I’m driven by a relentless curiosity
              and a desire to continuously improve my skills.
            </p>
            <p>
              This blog is my personal space to experiment with new technologies
              and share insights from my journey in the tech world.
            </p>
            <p>
              Your feedback, comments, and interactions are highly encouraged as
              they help us grow and learn together.
            </p>
            <p>
              Thank you for visiting, and I hope you find something inspiring
              and informative here!
            </p>
            <p>
              Read more <Link
              to="/search"
              className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
            >
              About me
            </Link>
            </p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
