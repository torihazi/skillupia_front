import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 mb-10">
      <Logo />

      <nav className="hidden md:flex items-center space-x-8">
        <a
          href="#features"
          className="text-black hover:text-gray-600 transition-colors"
        >
          Features
        </a>
        <a
          href="#support"
          className="text-black hover:text-gray-600 transition-colors"
        >
          Support
        </a>
      </nav>

      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          className="bg-white text-black border-black hover:bg-gray-50"
        >
          Log In
        </Button>
        <Button className="bg-black text-white hover:bg-gray-800">
          Sign Up
        </Button>
      </div>
    </header>
  );
};
