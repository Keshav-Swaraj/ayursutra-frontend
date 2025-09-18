import React from 'react';
import Header from './Header';
import Footer from './Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Empowering Holistic Health with Modern Panchakarma
              </h1>
              <p className="mt-4 text-gray-600">
                AyurSutra is dedicated to revolutionizing patient management in Panchakarma, blending ancient Ayurvedic wisdom with
                cutting-edge technology. Our platform streamlines the journey for both patients and practitioners, fostering optimal health
                outcomes through personalized care and seamless operations.
              </p>
              <div className="mt-8 flex gap-4">
                <button className="bg-ayur-green text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition-opacity">
                  Get Started
                </button>
                <button className="bg-transparent border border-ayur-green text-ayur-green font-bold py-3 px-6 rounded-lg hover:bg-ayur-green/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-xl" style={{ backgroundImage: "url('/images/about-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
            </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Our Impact</h2>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <span className="text-4xl font-bold text-ayur-green">150K+</span>
                <p className="mt-2 text-gray-500">Patients Served</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-ayur-green">2M+</span>
                <p className="mt-2 text-gray-500">Therapies Administered</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-ayur-green">500+</span>
                <p className="mt-2 text-gray-500">Doctors on Platform</p>
              </div>
              <div>
                <span className="text-4xl font-bold text-ayur-green">95%</span>
                <p className="mt-2 text-gray-500">Success Rate</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Partners Section */}
        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Our Esteemed Partners</h2>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-12">
              {/* Placeholder Partner Logos */}
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">Logo</div>
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">Logo</div>
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">Logo</div>
              <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">Logo</div>
            </div>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Our Vision: A Healthier Future for All
                </h2>
                <p className="mt-4 text-gray-600">
                  We envision a world where traditional healing practices are easily accessible and seamlessly integrated with modern
                  healthcare. AyurSutra strives to be the bridge, fostering a global community of wellness built on trust, efficacy, and innovation in
                  Ayurvedic care. We are committed to continuous research and development to enhance our platform and expand its reach.
                </p>
              </div>
              <div className="md:w-1/2">
                <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-xl" style={{ backgroundImage: "url('/images/about-vision.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;