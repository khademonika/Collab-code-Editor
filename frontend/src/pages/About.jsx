
import React from 'react';
import { Code2, Users, Zap, Github } from 'lucide-react';

const TeamMember = ({ name, role, gradient }) => (
  <div className="flex flex-col  items-center gap-3">
    <div className={`w-24 h-24 rounded-full ${gradient} flex items-center justify-center`}>
      <Users className="w-12 h-12 text-white" />
    </div>
    <div className="text-center">
      <p className=" font-medium">{name}</p>
      <p className=" text-sm" style={{ color: "var(--name-colr)" }}>{role}</p>
    </div>
  </div>
);

const TechIcon = ({ name, icon: Icon, color }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <p className=" text-sm" style={{color:"var(--name-colr)"}}>{name}</p>
  </div>
);

export default function About() {
  const teamMembers = [
    { name: 'Ayush Paliwal', role: 'Frontend Developer & Designer', gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { name: 'Monika Khade', role: 'Backend Developer & Architect', gradient: 'bg-gradient-to-br from-purple-500 to-pink-600' }
  ];

  const techStack = [
    { name: 'React', icon: Code2, color: 'bg-cyan-600' },
    { name: 'Node.js', icon: Zap, color: 'bg-green-600' },
    { name: 'Yjs', icon: Code2, color: 'bg-purple-600' },
    { name: 'WebSocket', icon: Zap, color: 'bg-cyan-600' },
    { name: 'Firebase', icon: Zap, color: 'bg-orange-600' }
  ];

  const features = [
    "Real-time collaborative editing with conflict-free merging",
    "Built-in debugging and syntax highlighting",
    "Seamless team communication with presence indicators",
    "Also has a compiler for multiple programming languages",
    "Live cursor tracking for all participants",
    "Scalable architecture for large teams"
  ];

  return (
    <div className="min-h-screen pt-24 join">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center  py-8 join card backdrop-blur-sm rounded-2xl border border-slate-700">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            CollabIDE - Real-Time Collaborative Code Editor
          </h1>
          <p className=" mt-2">Created by Ayush Paliwal & Monika Khade</p>
        </div>

        {/* Short Description */}
        <div className=" card  backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold mb-4">About CollabIDE</h2>
          <p className=" text-lg leading-relaxed">
            CollabIDE empowers developers to code together in real-time. 
            Whether you're building, debugging, or brainstorming, our platform 
            ensures seamless collaboration across teams and projects.
          </p>
        </div>

        {/* Features */}
        <div className=" backdrop-blur-sm card join rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc list-inside space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="leading-relaxed">{feature}</li>
            ))}
          </ul>
        </div>

        {/* Mission */}
        <div className=" backdrop-blur-sm card rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            To build the most intuitive and powerful collaborative 
            <span className="text-cyan-400 font-semibold"> coding environment</span>, 
            fostering innovation and teamwork among developers worldwide.
          </p>
        </div>

        {/* Team */}
        <div className=" backdrop-blur-sm card rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold  mb-8">Meet the Team</h2>
          <div className="flex justify-center  gap-16 flex-wrap">
            {teamMembers.map((member, idx) => (
              <TeamMember key={idx} {...member} />
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className=" backdrop-blur-sm card rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold  mb-8">Tech Stack</h2>
          <div className="flex justify-center gap-8 flex-wrap">
            {techStack.map((tech, idx) => (
              <TechIcon key={idx} {...tech} />
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-20 left-10 text-cyan-500/20 text-6xl font-mono pointer-events-none">
          {'</>'}
        </div>
        <div className="fixed bottom-20 right-10 text-purple-500/20 text-6xl font-mono pointer-events-none">
          {'{}'}
        </div>
      </div>
    </div>
  );
}