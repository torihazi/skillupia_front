import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[700px] min-w-[1000px] flex items-center justify-center">
      {/* 背景イラスト */}
      <div className="absolute inset-0 rounded-2xl">
        <Image
          src="/a-man-sitting.svg"
          alt="A man sitting with laptop learning"
          fill
          objectFit="cover"
          priority
        />
      </div>

      {/* テキストコンテンツ */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Track Your Learning Journey with Skillupia
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
