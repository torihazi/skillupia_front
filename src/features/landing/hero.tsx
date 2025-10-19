import { Button } from "@/components/ui/button";
import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#9CAF88] min-h-[600px] flex items-center justify-center px-6">
      {/* イラストのプレースホルダー */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 bg-white/20 rounded-lg flex items-center justify-center">
          <div className="text-white/60 text-center">
            <div className="w-32 h-32 bg-white/30 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">👨‍💻</span>
            </div>
            <p className="text-sm">Illustration Placeholder</p>
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Track Your Learning Journey with
          <br />
          <span className="text-white">Skillupia</span>
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
          Skillupia helps you manage your learning history, visualize your
          progress, and get AI-powered insights to enhance your learning
          experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
          >
            Sign Up
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white text-black border-white hover:bg-gray-100 px-8 py-3 text-lg"
          >
            Log In
          </Button>
        </div>
      </div>
    </section>
  );
};
