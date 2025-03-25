
const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">About BarterBridge</h1>
        <p className="text-2xl text-gray-600">Connecting Communities Through Modern Bartering</p>
      </div>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
          BarterBridge is revolutionizing the way people exchange goods and services. 
          We believe in creating a sustainable, community-driven marketplace where value 
          isn't just measured in currency, but in mutual benefit and shared resources.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Community First</h3>
          <p className="text-gray-600">Building strong local networks through trusted exchanges</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Sustainable Trading</h3>
          <p className="text-gray-600">Promoting resource efficiency through direct item exchanges</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Secure Platform</h3>
          <p className="text-gray-600">Advanced security measures to ensure safe transactions</p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">How BarterBridge Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">List Your Items</h3>
            <p className="text-gray-600">Share what you have to offer</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Find Matches</h3>
            <p className="text-gray-600">Discover items you want to trade for</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Make the Exchange</h3>
            <p className="text-gray-600">Connect and complete your trade</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 rounded-lg text-center py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">Have questions? We'd love to hear from you!</p>
        <button className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-gray-700 transition-colors duration-300">
          Contact Us
        </button>
      </section>
    </div>
  );
};

export default AboutUs;