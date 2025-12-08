import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";
import React from "react";
export default function Footer() {
  return (
    <footer className="relative glass-effect border-t border-white/10 mt-32 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple rounded-full blur-3xl animate-float-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Branding */}
          <div className="animate-slide-in-from-bottom" style={{ animationDelay: "0s" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-background font-bold">
                C
              </div>
              <h3 className="text-foreground font-bold text-lg">CollabIDE</h3>
            </div>
            <p className="text-foreground/60 text-sm leading-relaxed">
              Real-time collaborative code editing for seamless teamwork among developers worldwide.
            </p>
          </div>

          {/* Product Links */}
          <div className="animate-slide-in-from-bottom" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-foreground/60 hover:text-neon-cyan transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    {item.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="animate-slide-in-from-bottom" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Privacy Policy", href: "#privacy" },
                { label: "Terms of Service", href: "#terms" },
                { label: "Cookie Policy", href: "#cookies" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-foreground/60 hover:text-neon-cyan transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    {item.label}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div className="animate-slide-in-from-bottom" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:text-neon-cyan" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-neon-blue" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-neon-purple" },
                { icon: Mail, href: "mailto:hello@collabide.dev", label: "Email", color: "hover:text-neon-pink" },
              ].map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-foreground/60 ${social.color} transition-all duration-300 p-3 glass-effect rounded-xl hover:bg-white/10 group`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-foreground/50 text-sm">
              © 2025 CollabIDE. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-foreground/60">
              <a href="#privacy" className="hover:text-neon-cyan transition-colors duration-300">Privacy</a>
              <span className="text-foreground/30">•</span>
              <a href="#terms" className="hover:text-neon-cyan transition-colors duration-300">Terms</a>
              <span className="text-foreground/30">•</span>
              <a href="#status" className="hover:text-neon-cyan transition-colors duration-300">Status</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}