"use client";

import { motion } from "framer-motion";
import { Upload, Brain, BookOpen, Zap } from "lucide-react";

export default function FlashcardAnimation() {
  const cardVariants = {
    initial: { 
      scale: 0.8, 
      opacity: 0, 
      y: 20,
      rotateX: -20,
      boxShadow: "0 0 0 rgba(0,0,0,0)" // Initial boxShadow
    },
    animate: (i) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      rotateX: 0,
      boxShadow: "0 0 0 rgba(0,0,0,0)", // Initial boxShadow
      transition: {
        delay: i * 0.3,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)", // Hover boxShadow
      transition: { duration: 0.3 }
    }
  };

  const cards = [
    {
      icon: Upload,
      title: "Upload",
      description: "Import any document",
      color: "bg-white-100",
      iconColor: "text-gray-600"
    },
    {
      icon: Brain,
      title: "Analyze",
      description: "AI extracts key concepts",
      color: "bg-white-100",
      iconColor: "text-gray-600"
    },
    {
      icon: BookOpen,
      title: "Generate",
      description: "Create interactive cards",
      color: "bg-white-100",
      iconColor: "text-gray-600"
    },
    {
      icon: Zap,
      title: "Learn",
      description: "Study efficiently",
      color: "bg-white-100",
      iconColor: "text-gray-600"
    }
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[400px] flex items-center justify-center">
      <div className="relative w-full h-full">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial="initial"
            animate="animate"
            variants={cardVariants}
            custom={index}
            whileHover="hover"
            className={`absolute w-64 h-48 ${card.color} rounded-2xl shadow-lg p-6 flex flex-col justify-between 
              ${index === 0 ? 'top-0 left-0' : 
                index === 1 ? 'top-0 right-0' : 
                index === 2 ? 'bottom-0 left-0' : 
                'bottom-0 right-0'}`}
            style={{
              transformOrigin: 'center center',
              perspective: '1000px'
            }}
          >
            <div className={`w-14 h-14 rounded-full ${card.color} shadow-md flex items-center justify-center`}>
              <card.icon className={`w-8 h-8 ${card.iconColor}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}