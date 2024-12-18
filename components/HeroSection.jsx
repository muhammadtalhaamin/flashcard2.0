import { Button } from "@/components/ui/button";
import Link from 'next/link';
import FlashcardAnimation from "@/components/ui/FlashcardAnimation";
import { Sparkles, BookOpen, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Content Column */}
        <div className="space-y-6">
          <div className="inline-flex items-center bg-white border-gray-600 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="mr-2 h-5 w-5 text-gray-600" />
            AI-Powered Learning Revolution
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Transform Documents into 
            <span className="block text-gray-600 text-animate">Smart Flashcards</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-xl">
            Instantly convert any document into interactive, AI-generated flashcards. Learn faster, retain more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-black hover:bg-gray-600 transition-colors"
            >
              <Link href="/dashboard" className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Get Started Free
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center space-x-4">
            <div className="flex -space-x-2">
              <img 
                src="/avatar1.jpeg" 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img 
                src="/avatar2.jpeg" 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img 
                src="/avatar3.jpeg" 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-600">500+</span> Students Studying Daily
              </p>
            </div>
          </div>
        </div>

        {/* Animation Column */}
        <div className="hidden md:block">
          <FlashcardAnimation />
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-200 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}