import React from 'react';
import { Code2, Users, Zap, Github } from 'lucide-react';

const TeamMember = ({ name, role, gradient }) => (
  <div className="flex flex-col items-center gap-3">
    <div className={`w-24 h-24 rounded-full ${gradient} flex items-center justify-center`}>
      <Users className="w-12 h-12 text-white" />
    </div>
    <div className="text-center">
      <p className="text-white font-medium">{name}</p>
      <p className="text-cyan-300 text-sm">{role}</p>
    </div>
  </div>
);

const TechIcon = ({ name, icon: Icon, color }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-16 h-16 rounded-full ${color} flex items-center justify-center`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <p className="text-white text-sm">{name}</p>
  </div>
);

export default function About() {
  const teamMembers = [
    { name: 'Alex Chen', role: 'Lead Developer', gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { name: 'Sarah Lee', role: 'UI/UX Designer', gradient: 'bg-gradient-to-br from-purple-500 to-pink-600' }
  ];

  const techStack = [
    { name: 'React', icon: Code2, color: 'bg-cyan-600' },
    { name: 'Node.js', icon: Zap, color: 'bg-green-600' },
    { name: 'Yjs', icon: Code2, color: 'bg-purple-600' },
    { name: 'Websocket', icon: Zap, color: 'bg-cyan-600' },
    { name: 'Firebase', icon: Zap, color: 'bg-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center py-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            ColabCode - Real-Time Collaborative Code Editor
          </h1>
        </div>

        {/* Short Description */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Short Description</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            Empower your team with the seamless, realtime code collaboration platform.
            Write, edit, and debug together, instantly.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-slate-300 text-lg leading-relaxed">
            To build the most intuitive a powerful collaborative{' '}
            <span className="text-cyan-400 font-semibold">environment</span>, fostering
            innovation aterwork among developers worldwide.
          </p>
        </div>

        {/* Team */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Meet the Team</h2>
          <div className="flex justify-center gap-16">
            {teamMembers.map((member, idx) => (
              <TeamMember key={idx} {...member} />
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8">
          <h2 className="text-2xl font-bold text-white mb-8">Tech Stack</h2>
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