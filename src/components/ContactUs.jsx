import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Main Heading Section */}
        <section className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            We'd Love to Hear From You
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you have a question about our services, need technical assistance, or want to explore partnership opportunities, our team is ready to help.
          </p>
        </section>

        {/* Contact Form & Info Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Send a Message Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Send Us a Message</h2>
              <p className="mt-2 text-gray-500">We're here to help! Fill out the form below and we'll get back to you promptly.</p>
              <form className="mt-8 space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="fullName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ayur-green focus:border-ayur-green" placeholder="Enter your full name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ayur-green focus:border-ayur-green" placeholder="Enter your email address" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <select id="subject" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ayur-green focus:border-ayur-green">
                    <option>Select a subject</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ayur-green focus:border-ayur-green" placeholder="Type your message here..."></textarea>
                </div>
                <button type="submit" className="w-full py-3 px-4 bg-ayur-green text-white font-bold rounded-lg hover:opacity-90 transition-opacity">
                  Submit Message
                </button>
              </form>
            </div>
            
            {/* Reach Out Directly & Location */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Reach Out Directly</h2>
              <p className="mt-2 text-gray-500">Prefer to speak with us? Here's how you can find us.</p>
              <div className="mt-8 space-y-6 text-gray-600">
                <div className="flex items-start">
                  <span className="text-ayur-green mr-3">📞</span>
                  <div>
                    <span className="font-semibold text-gray-800">Phone</span>
                    <p>+91 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-ayur-green mr-3">📧</span>
                  <div>
                    <span className="font-semibold text-gray-800">Email</span>
                    <p>info@ayursutra.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-ayur-green mr-3">📍</span>
                  <div>
                    <span className="font-semibold text-gray-800">Address</span>
                    <p>AyurSutra Innovations<br />123 Wellness Road, Ayurveda Nagar<br />Bengaluru, Karnataka 560001, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800">Our Location</h2>
                <p className="mt-2 text-gray-500">Find us on the map and plan your visit.</p>
                <div className="relative mt-4 rounded-xl overflow-hidden shadow-xl">
                  <div className="w-full h-48 bg-gray-200" style={{ backgroundImage: "url('/images/location-map.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                  <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white text-ayur-green border border-ayur-green font-bold py-3 px-6 rounded-lg hover:bg-ayur-green/10 transition-colors">
                      View on Google Maps ↗
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center text-gray-800">Frequently Asked Questions</h2>
            <p className="mt-2 text-center text-gray-500">Find quick answers to common questions about AyurSutra.</p>
            <div className="mt-8 max-w-3xl mx-auto space-y-4 text-ayur-green">
              <a href="#" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                What is Panchakarma treatment?
              </a>
              <a href="#" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                How do I schedule an appointment?
              </a>
              <a href="#" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                Is AyurSutra compatible with other health platforms?
              </a>
              <a href="#" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                What are the privacy policies for patient data?
              </a>
              <a href="#" className="block mt-6 text-center text-ayur-green font-semibold">
                View All FAQs ↗
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;