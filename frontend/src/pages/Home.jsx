

import { Code2, Play, Menu, Star, Users, Zap, ArrowRight, ChevronDown, Globe, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
export default function CollabIDELanding() {
  const [activeRoom, setActiveRoom] = useState(0);
  const [openFaqId, setOpenFaqId] = useState(null);
  const { isLogin, login } = useAuth()

  const rooms = [
    {
      name: "Frontend Team",
      members: 5,
      language: "React",
      color: "from-neon-cyan to-neon-blue",
    },
    {
      name: "Backend API",
      members: 3,
      language: "Node.js",
      color: "from-neon-purple to-neon-pink",
    },
    {
      name: "DevOps Pipeline",
      members: 2,
      language: "Python",
      color: "from-neon-blue to-neon-cyan",
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };
  const faqs = [
    {
      id: "security",
      question: "Is my code secure in CollabIDE?",
      answer:
        "Absolutely. We use end-to-end encryption for all code transfers, SOC 2 Type II compliance, and regular security audits. Your code is protected with the highest industry standards.",
    },
    {
      id: "realtime",
      question: "How does real-time editing work?",
      answer:
        "Our proprietary real-time sync engine uses operational transformation to merge changes from multiple users simultaneously. You'll see changes as they happen with near-zero latency.",
    },
    {
      id: "pricing",
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, absolutely. Cancel anytime with no hidden fees or long-term commitments. Your data remains accessible even after cancellation.",
    },
    {
      id: "limits",
      question: "Are there workspace limits?",
      answer:
        "Starter plan includes 3 rooms. Professional and Enterprise plans offer unlimited rooms. Each room supports unlimited collaborators.",
    },
    {
      id: "integration",
      question: "What languages does CollabIDE support?",
      answer:
        "We support 40+ programming languages including JavaScript, Python, Java, C++, Go, Rust, and more. New languages are added regularly.",
    },
    {
      id: "offline",
      question: "Does CollabIDE work offline?",
      answer:
        "Yes. Your local changes are synced when you reconnect. We also support offline-first development workflows with conflict resolution.",
    },
  ];

  return (
    <div className="min-h-screen home ">

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20 text-center join">
        <div className="my-6">
          <span className="inline-block px-4 py-2 bg-blue-900/50 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
            ✨ Welcome to the future of collaboration
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
          Collaborate. Code.<br />Sync.
        </h1>

        <p className="text-xl home text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Real-time collaborative editing, shared workspaces, and instant synchronization for seamless teamwork among developers worldwide.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <button className="group neon-button px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg shadow-purple-500/30">
            {
              login ? (<Link to="/create-room">Create a room</Link>) : "Start coding free"
            }
          </button>
<button
  className="px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-2"
  style={{
    background: "var(--btn-bg)",
    border: "1px solid var(--btn-border)",
    color: "var(--btn-text)",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--btn-hover)")}
  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--btn-bg)")}
>
  <Play className="w-5 h-5" />
  Watch Demo
</button>

        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 join gap-8 mt-20">
          <div className=" join backdrop-blur-sm border border-blue-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
            <div className="w-14 h-14 bg-cyan-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Users className="w-7 h-7 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Real-time Collaboration</h3>
            <p className="text-gray-400">Work together with your team in real-time with live cursors and instant updates.</p>
          </div>

          <div className=" backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-500/50 transition-all">
            <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Zap className="w-7 h-7 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
            <p className="text-gray-400">Optimized performance with instant synchronization across all connected users.</p>
          </div>

          <div className=" backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <Globe className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3">Global Access</h3>
            <p className="text-gray-400">Access your projects from anywhere in the world with cloud-based infrastructure.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-20 border-t border-white/10">
          {[
            { value: "50K+", label: "Active Users", glow: "shadow-cyan-500/30" },
            { value: "100K+", label: "Projects", glow: "shadow-purple-500/30" },
            { value: "99.9%", label: "Uptime", glow: "shadow-blue-500/30" },
            { value: "24/7", label: "Support", glow: "shadow-pink-500/30" },
          ].map((stat, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 
      hover:border-white/20 hover:bg-white/10 transition-all duration-300 
      shadow-lg hover:${stat.glow}`}
            >
              <div className="text-3xl font-bold mb-3 tracking-tight">
                {stat.value}
              </div>
              <div className="text-gray-300 text-lg group-hover:text-gray-700 transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </main>
      {/* Create room section */}
      <section
        id="rooms"
        className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Create & Join Rooms
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Instantly create collaborative spaces and invite your team
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              {rooms.map((room, index) => (
                <button
                  key={index}
                  onClick={() => setActiveRoom(index)}
                  className={`w-full p-6 rounded-2xl border transition-all duration-300 text-left group ${activeRoom === index
                      ? "glass-effect border-neon-cyan/50 bg-neon-cyan/5 shadow-lg shadow-neon-cyan/30"
                      : "glass-effect border-white/10 hover:border-neon-cyan/30 hover:bg-white/5"
                    }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-neon-cyan transition-colors">
                      {room.name}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${room.color} text-background`}
                    >
                      {room.language}
                    </span>
                  </div>
                  <p className="text-foreground/60 text-sm">
                    {room.members} members active
                  </p>
                </button>
              ))}
            </div>

            <div className="relative">
              <div className="p-8 rounded-2xl glass-effect border border-neon-cyan/30 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl shadow-neon-cyan/20 hover:shadow-neon-cyan/30 transition-all duration-300">
                <div className="space-y-4">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-full animate-shine" />
                  </div>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-3 bg-white/5 rounded animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-neon-cyan/30 animate-pulse" />
                      <div className="flex-1 h-2 bg-white/5 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-neon-purple rounded-full blur-2xl opacity-30 animate-float-slow" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-foreground/60">
              Everything you need to know about CollabIDE
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="group glass-effect border border-white/10 rounded-2xl transition-all duration-300 hover:border-white/20 backdrop-blur-xl"
                >
                  {/* Button */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-8 py-6 flex items-center justify-between transition-colors duration-300"
                  >
                    <h3 className="text-lg font-semibold text-foreground text-left group-hover:text-neon-cyan transition-colors">
                      {faq.question}
                    </h3>

                    {/* Icon animation */}
                    <div
                      className={`text-neon-cyan ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </div>
                  </button>

                  {/* Smooth Animated Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="px-8 py-6 border-t border-white/10 bg-white/5">
                      <p className="text-foreground/80 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-neon-purple rounded-full blur-3xl animate-float-slow" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to transform your coding?
          </h2>
          <p className="text-xl text-foreground/80 mb-8">
            Join thousands of developers collaborating in real-time today.
          </p>
          <button className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-blue text-background font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-neon-cyan/50 hover:scale-105">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Link to="/login">Start Free</Link>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

//   );
// }