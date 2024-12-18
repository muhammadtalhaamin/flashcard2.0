import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from "lucide-react";

import Header from "./dashboard/_components/Header";
import Link from 'next/link';
import FlashcardAnimation from "@/components/ui/FlashcardAnimation";
import HeroSection from "@/components/HeroSection";

const Feature = ({ title, text }) => (
  <div className="flex flex-col items-center space-y-3">
    <p className="font-bold text-lg text-black">{title}</p>
    <p className="text-center text-gray-600">{text}</p>
  </div>
);

const PriceWrapper = ({ children, isRecommended = false }) => (
  <div className={`relative p-8 shadow-${isRecommended ? "2xl" : "lg"} border border-${isRecommended ? "black" : "gray-200"} rounded-xl bg-white flex flex-col justify-between h-[450px] transform-${isRecommended ? "scale-105" : "none"} z-${isRecommended ? 1 : 0}`}>
    {isRecommended && (
      <div className="absolute top-[-16px] left-1/2 transform-translate-x-[-50%] px-3 py-1 bg-black text-white font-bold text-sm rounded-full">
        Recommended
      </div>
    )}
    {children}
  </div>
);

const TrustedBy = () => {
  const logos = [
    "/berkeley-light.webp",
    "/oxford-light.webp",
    "/princeton-light.webp",
    "/stanford-light.webp",
    "/yale-light.webp"
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-black">Trusted by Top Students and Educators Worldwide</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 grayscale">
          {logos.map((logo, index) => (
            <img 
              key={index} 
              src={logo} 
              alt={`Trusted Institution ${index + 1}`} 
              className="h-16 w-auto hover:opacity-100 transition-opacity duration-300 ml-5"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const WhoCanBenefit = () => {
  const beneficiaries = [
    { title: "Students", description: "Efficiently study and retain complex information across subjects" },
    { title: "Educators", description: "Create interactive learning materials and track student progress" },
    { title: "Researchers", description: "Quickly digest and memorize key research findings" },
    { title: "Professionals", description: "Learn and retain critical information for certifications and training" }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-black">Who Can Benefit?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {beneficiaries.map((group, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{group.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowToGenerate = () => {
  const steps = [
    { title: "Upload Document", description: "Upload any document or text source" },
    { title: "AI Analysis", description: "Our AI extracts key information and concepts" },
    { title: "Generate Flashcards", description: "Instantly create interactive study materials" },
    { title: "Customize & Study", description: "Refine and start learning immediately" }
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-black">How to Generate Flashcards</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="border-2 border-gray-200 hover:border-black transition-colors duration-300">
              <CardHeader className="items-center">
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 hover:shadow-lg transition-shadow duration-300">
                  {index + 1}
                </div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const UserReviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Medical Student",
      text: "FlashCardGPT revolutionized my study routine. Creating flashcards is now a breeze!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      text: "Incredibly efficient tool for learning complex technical concepts quickly.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "High School Teacher",
      text: "A game-changer for creating engaging study materials for my students.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Medical Student",
      text: "FlashCardGPT revolutionized my study routine. Creating flashcards is now a breeze!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      text: "Incredibly efficient tool for learning complex technical concepts quickly.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "High School Teacher",
      text: "A game-changer for creating engaging study materials for my students.",
      rating: 5
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-black">What Our Users Say</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full">
                  <CardContent className="flex flex-col items-center p-6 text-center h-full justify-between">
                    <div className="mb-4">
                      <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                      <div className="flex justify-center mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-500 text-2xl">★</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold">{review.name}</h3>
                      <p className="text-gray-500">{review.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="relative flex flex-col justify-between min-h-screen overflow-hidden">
      <Header />

      <HeroSection/>

      {/* New Sections */}
      <TrustedBy />
      <WhoCanBenefit />
      <HowToGenerate />
      <UserReviews />


      {/* Call to Action */}
      <section className="bg-gray-600 py-20 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl mb-6 font-bold">Start Generating Flashcards Today!</h2>
          <p className="text-xl mb-8 text-white">Upload your documents and transform your study experience with AI-generated flashcards.</p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Button asChild>
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}