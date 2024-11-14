'use client';
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/Header/NavBar";
import { ArrowRight, ChevronRight, CalendarCheck, Users, Trophy, VideoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-orange-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <NavBar />
        <div className="max-w-screen-xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-extrabold text-orange-600">
                Rwanda Talent Connect
              </h1>
              <h2 className="text-2xl font-bold text-gray-800">
                Discover, Hire, and Celebrate Talent
              </h2>
              <p className="text-gray-600 text-lg">
                Your premier platform for connecting top talent in Rwanda&apos;s entertainment industry with exciting opportunities and events.
              </p>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2">
                    Find Talent <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/events" className="w-full sm:w-auto">
                  <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 gap-2">
                    Explore Events <CalendarCheck className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Content - Illustrations */}
            <div className="hidden lg:flex items-center justify-center relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange-100 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-orange-200 rounded-full opacity-50 blur-2xl"></div>
              <Image 
                src={"/images/companyDefault.jpg"} 
                alt="Rwanda Talent Showcase" 
                width={600} 
                height={400} 
                className="rounded-2xl shadow-2xl z-10 relative"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Empowering talent and connecting opportunities across Rwanda&apos;s entertainment landscape.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Talent Casting */}
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-orange-500" />
                  Talent Casting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Connect with top video vixens, actors, and actresses for your next project.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/talents" className="w-full">
                  <Button variant="outline" className="w-full">
                    Browse Talent
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Events & Voting */}
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <CalendarCheck className="w-8 h-8 text-orange-500" />
                  Events & Voting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Participate in industry events and vote for your favorite talents.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/events" className="w-full">
                  <Button variant="outline" className="w-full">
                    Explore Events
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Talent Competitions */}
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-orange-500" />
                  Talent Competitions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Showcase your skills, win prizes, and get discovered by industry professionals.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/competitions" className="w-full">
                  <Button variant="outline" className="w-full">
                    Join Competitions
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Voting and Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Events Illustration */}
            <div className="hidden md:block">
              <Image 
                src="/images/event&voting2.webp" 
                alt="Events and Voting" 
                width={600} 
                height={400} 
                className="rounded-2xl shadow-lg"
              />
            </div>

            {/* Right - Events Description */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Engage Through Events & Voting
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CalendarCheck className="w-8 h-8 text-orange-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
                    <p className="text-gray-600">
                      Stay updated with the latest industry events, workshops, and networking opportunities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Trophy className="w-8 h-8 text-orange-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Talent Voting</h3>
                    <p className="text-gray-600">
                      Vote for your favorite performers, support emerging talents, and influence industry recognition.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex gap-4">
                <Link href="/events">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                    View Events
                  </Button>
                </Link>
                <Link href="/voting">
                  <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                    Start Voting
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="bg-orange-500 text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Join Rwanda Talent Connect?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a talent seeking opportunities or a client looking to hire, your journey starts here.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                Create Account
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button size="lg" variant="outline" className="border-white text-white bg-orange-500 hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}