import { ArrowRight, Users, Recycle, Shield, Mail, MapPin, Phone } from "lucide-react"

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section with Background Image */}
      <div className="relative rounded-xl overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/60 z-10"></div>
        {/* <img src="https://placehold.co/1200x400" alt="People trading items" className="w-full h-[400px] object-cover" /> */}
        <div className="relative z-20 text-center py-24 px-4">
          <h1 className="text-5xl font-bold text-white mb-4">About BarterBridge</h1>
          <p className="text-2xl text-gray-100 mb-8">Connecting Communities Through Modern Bartering</p>
          <div className="flex justify-center space-x-4">
            <a
              href="/trade"
              className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300 flex items-center"
            >
              Start Trading <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#how-it-works"
              className="bg-transparent text-white border border-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              BarterBridge was born from a simple idea: in a world dominated by monetary transactions, we wanted to
              revive the ancient practice of bartering with modern technology.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded in 2023, our platform has quickly grown into a thriving community of traders who share our vision
              of sustainable commerce and community building through direct exchange.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-800">
              <p className="italic text-gray-700">
                "We believe that every item has value beyond its price tag, and every exchange creates a connection
                between people."
              </p>
              <p className="font-medium text-gray-900 mt-2">— Sarah Johnson, Founder</p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gray-100 rounded-lg z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gray-200 rounded-lg z-0"></div>
            <div className="relative z-10">
              <img
                src="https://placehold.co/500x600"
                alt="People trading items"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="text-center mb-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed mb-8">
          BarterBridge is revolutionizing the way people exchange goods and services. We believe in creating a
          sustainable, community-driven marketplace where value isn't just measured in currency, but in mutual benefit
          and shared resources.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-gray-800" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Community First</h3>
            <p className="text-gray-600">
              Building strong local networks through trusted exchanges and fostering meaningful connections between
              traders.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Recycle className="h-8 w-8 text-gray-800" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainable Trading</h3>
            <p className="text-gray-600">
              Promoting resource efficiency through direct item exchanges, reducing waste and extending the lifecycle of
              goods.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-gray-800" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Secure Platform</h3>
            <p className="text-gray-600">
              Advanced security measures to ensure safe transactions with user verification and secure messaging
              systems.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-20" id="how-it-works">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">How BarterBridge Works</h2>
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">List Your Items</h3>
              <p className="text-gray-600 mb-4">
                Take photos and create detailed listings of items you're willing to trade.
              </p>
              <img src="https://placehold.co/200x150" alt="Listing items" className="rounded-md mx-auto" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Find Matches</h3>
              <p className="text-gray-600 mb-4">
                Browse listings or get matched with users who have what you want and want what you have.
              </p>
              <img src="https://placehold.co/200x150" alt="Finding matches" className="rounded-md mx-auto" />
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center border border-gray-100">
              <div className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Make the Exchange</h3>
              <p className="text-gray-600 mb-4">
                Communicate through our secure messaging system and arrange your trade.
              </p>
              <img src="https://placehold.co/200x150" alt="Making exchange" className="rounded-md mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-20 bg-gray-50 py-16 px-4 rounded-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Michael Chen",
              location: "Portland, OR",
              quote:
                "BarterBridge helped me trade my unused camera equipment for gardening tools. The process was smooth and I met some great people in my community!",
              image: "https://placehold.co/100x100",
            },
            {
              name: "Emma Rodriguez",
              location: "Austin, TX",
              quote:
                "I've been using BarterBridge for 6 months and have completed over 20 trades. It's changed how I think about consumption and waste.",
              image: "https://placehold.co/100x100",
            },
            {
              name: "David Williams",
              location: "Chicago, IL",
              quote:
                "As someone who values sustainability, this platform aligns perfectly with my values. I've found items I couldn't find anywhere else.",
              image: "https://placehold.co/100x100",
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-[60px] h-[60px] rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              bio: "Former sustainability consultant with a passion for community building.",
              image: "https://placehold.co/300x300",
            },
            {
              name: "James Wilson",
              role: "CTO",
              bio: "Tech innovator with 15+ years experience in marketplace platforms.",
              image: "https://placehold.co/300x300",
            },
            {
              name: "Aisha Patel",
              role: "Head of Community",
              bio: "Community organizer focused on creating meaningful connections.",
              image: "https://placehold.co/300x300",
            },
            {
              name: "Marcus Lee",
              role: "Lead Developer",
              bio: "Full-stack developer passionate about creating intuitive user experiences.",
              image: "https://placehold.co/300x300",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-4 mx-auto w-48 h-48 overflow-hidden rounded-full">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
      {/* FAQ Section */}
      <section className="mt-20 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              question: "Is BarterBridge completely free to use?",
              answer:
                "Yes, basic trading on BarterBridge is completely free. We offer premium features for power users who need additional tools and visibility.",
            },
            {
              question: "How do you ensure trades are fair?",
              answer:
                "We provide a rating system and verification process. Users can also use our optional value estimation tool to help determine fair exchanges.",
            },
            {
              question: "Can I trade services as well as goods?",
              answer: "Many of our users trade professional services, skills, and time alongside physical items.",
            },
            {
              question: "Is there a mobile app available?",
              answer:
                "Yes, we have both iOS and Android apps available for download, offering the full functionality of our web platform.",
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-800 text-white rounded-xl text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Have questions about how BarterBridge works? Want to partner with us? We'd love to hear from you! Our team is
          ready to assist you.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-10">
          <div className="flex flex-col items-center">
            <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-gray-300">hello@barterbridge.com</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-gray-300">(555) 123-4567</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-300">123 Barter St, Portland, OR</p>
          </div>
        </div>

        <a
          href="/contact"
          className="inline-block bg-white text-gray-800 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors duration-300"
        >
          Contact Us
        </a>
      </section>

    </div>
  )
}

export default AboutUs

