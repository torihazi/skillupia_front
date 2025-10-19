import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 px-[10%] border-t border-gray-200">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <nav className="flex flex-wrap justify-center md:justify-start space-x-6">
            <a
              href="#privacy"
              className="text-black hover:text-gray-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#terms"
              className="text-black hover:text-gray-600 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#contact"
              className="text-black hover:text-gray-600 transition-colors"
            >
              Contact Us
            </a>
          </nav>

          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600">
              © 2024 Skillupia. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
