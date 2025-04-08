import React from "react";
import { ArrowRight, Repeat, Users, Wrench } from "lucide-react";

const Aboutus = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-16">
        <Repeat className="h-16 w-16 text-blue-700 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About BarterBridge</h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Connecting people to exchange goods and skills without money, building a more sustainable community.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            At BarterBridge, we believe in creating a sustainable economy where people can exchange goods and services directly.
          </p>
          <p className="text-lg mb-6">
            Founded in 2023, our platform aims to revive the bartering system using digital technology.
          </p>
          
        </div>
       
      </section>

      {/* How It Works */}
      <section className="mb-20 text-center">
        <h2 className="text-3xl font-bold mb-12">How BarterBridge Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["List Your Items", "Find Matches", "Make the Exchange"].map((title, i) => (
            <div key={i} className="bg-white shadow p-6 rounded-lg">
              <div className="h-12 w-12 mb-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto font-bold text-lg">
                {i + 1}
              </div>
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">
                {i === 0 && "List your goods or services clearly and with images."}
                {i === 1 && "Use our smart matching to find perfect barter partners."}
                {i === 2 && "Agree on terms and complete your barter safely."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Workshop Section */}
      <section className="mb-20 rounded-xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Wrench className="mr-3 h-6 w-6 text-blue-700" />
              Workshop Section
            </h2>
            <p className="text-lg mb-4">
              Our Workshop feature lets users share and learn skills alongside bartering.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Host or attend community skill-sharing events</li>
              <li>Trade expertise for skills or products</li>
              <li>Build your profile and reputation</li>
              <li>Grow by learning from others</li>
            </ul>
            <a href="/Workshop" className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-lg">
              Explore Workshops
            </a>
          </div>
          
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          We're a passionate group building a sustainable, connected world through bartering.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {["Diago Mendonca", "Gaurav Sahani", "Francisco",].map((name, i) => (
            <div key={i} className="bg-white shadow p-6 rounded-lg text-center">
              <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <Users className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="font-semibold text-xl">{name}</h3>
              
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-blue-50 rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Bartering?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Join thousands already trading goods and skills. Sign up and explore a better way to exchange.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/Signup" className="inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-lg">
            Create Account
          </a>
          <a href="/" className="inline-flex items-center justify-center border border-gray-300 px-6 py-3 rounded-lg text-lg">
            Browse Listings
          </a>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
