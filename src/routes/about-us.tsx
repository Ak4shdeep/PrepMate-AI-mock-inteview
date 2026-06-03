import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="px-6 py-10 max-w-4xl mx-auto text-gray-800">
      <h2 className="text-3xl font-bold mb-6">About Us</h2>
      <p className="mb-4">
        Welcome to <span className="font-semibold">Text-Based AI Mock Interview</span>, a cutting-edge platform designed to revolutionize interview preparation through the power of artificial intelligence. Our mission is to help candidates gain confidence, improve their communication skills, and master domain-specific knowledge by simulating realistic interview experiences—anytime, anywhere.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-2">What We Do</h3>
      <p className="mb-4">
        We’ve developed an intelligent and interactive system that mimics real-life skill-based interviews. The platform uses advanced AI to generate <span className="font-medium">domain-specific interview questions</span> across fields such as software development, data science, marketing, finance, and more.
      </p>
      <p className="mb-4">
        Our approach combines <span className="font-medium">text-based AI-driven questioning</span> with <span className="font-medium">verbal response input</span> and <span className="font-medium">camera-based interaction</span> to closely simulate the atmosphere of an actual interview. Each question is answered once to reflect real-world pressure and pacing.
      </p>

      <h3 className="text-2xl font-semibold mt-8 mb-2">Key Features</h3>
      <ul className="list-disc list-inside space-y-2 mb-4">
        <li><span className="font-medium">AI-Generated Questions:</span> Tailored to each user’s selected domain.</li>
        <li><span className="font-medium">Realistic Simulation:</span> Users respond verbally with their camera on.</li>
        <li><span className="font-medium">One-Time Response:</span> Each question allows only one attempt.</li>
        <li><span className="font-medium">Automated Evaluation:</span> Responses are scored based on relevance, structure, and clarity.</li>
        <li>
          <span className="font-medium">Comprehensive Feedback:</span> Includes:
          <ul className="list-disc list-inside ml-6 mt-1">
            <li>Individual question scores</li>
            <li>Personalized improvement tips</li>
            <li>Model or correct answers</li>
          </ul>
        </li>
        <li><span className="font-medium">Progress Tracking:</span> Users can monitor growth over time.</li>
      </ul>

      <h3 className="text-2xl font-semibold mt-8 mb-2">Our Vision</h3>
      <p className="mb-4">
        We believe interview preparation should be <span className="font-medium">accessible, personalized, and effective</span>. Our AI-powered platform offers a <span className="font-medium">realistic, low-pressure environment</span> where users can develop the confidence and skills needed to succeed in actual interviews.
      </p>
      <p>
        Whether you're a student, a working professional, or someone returning to the job market, <span className="font-semibold">Text-Based AI Mock Interview</span> is your personalized guide to interview success.
      </p>
    </section>
  );
};

export default AboutUs;
