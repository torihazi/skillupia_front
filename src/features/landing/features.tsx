import { BookOpen, Bot, TrendingUp } from "lucide-react";
import React from "react";

export const Features: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Learning History Management",
      description:
        "Easily log and categorize your learning activities, from online courses to personal projects.",
    },
    {
      icon: TrendingUp,
      title: "Progress Visualization",
      description:
        "Visualize your learning progress over time with interactive charts and reports.",
    },
    {
      icon: Bot,
      title: "AI-Powered Insights",
      description:
        "Get personalized feedback and tag suggestions using our AI integration to optimize your learning path.",
    },
  ];

  return (
    <section id="features" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Explore the core functionalities of Skillupia that make learning
            more effective and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <IconComponent className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
