import { Mic, Brain } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Our Service</h1>
      <p className="text-gray-600 mb-10">
        We provide an AI-powered Interview Preparation service tailored to your job role, experience level, and tech stack.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
        <div className="flex items-center gap-4 mb-4">
          <Brain size={32} className="text-indigo-600" />
          <h2 className="text-2xl font-semibold">Interview Preparation</h2>
        </div>
        <p className="text-gray-700 mb-4">
          Our tool helps you practice technical and behavioral interview questions based on:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
          <li>Job Description and Role</li>
          <li>Years of Experience</li>
          <li>Relevant Tech Stacks</li>
        </ul>
        <p className="text-gray-700 mb-4">
          You can record your answers using your microphone or write them as text. Our system analyzes your responses and provides:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mb-4">
          <li>Instant Feedback</li>
          <li>Score out of 10</li>
          <li>Suggestions to Improve</li>
        </ul>
        <Link
          to="/generate"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <Mic size={18} /> Start Practicing
        </Link>
      </div>
    </div>
  );
};

export default Services;
