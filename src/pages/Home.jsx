import React, { useEffect } from "react";
import {
  ArrowRight,
  Shield,
  CreditCard,
  Calendar,
  MapPin,
  Star,
  Users,
  HouseIcon,
} from "lucide-react";
import { useApartments } from "../context/ApartmentsContext";
import StatsSection from "../components/StatsSection";
import AOS from "aos";
import "aos/dist/aos.css";

const ApartmentCard = ({ apartment, delay }) => (
  <div
    className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 transform"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="relative w-full h-60 sm:h-72 md:h-80 lg:h-96">
      <img
        src={apartment.imageUrl}
        alt={apartment.name}
        className="w-full h-full object-cover"
      />
      <div
        className={`absolute top-3 right-3 px-2 py-1 rounded-full font-medium text-white text-xs ${
          apartment.available ? "bg-emerald-500" : "bg-red-500"
        }`}
      >
        {apartment.available ? "Available" : "Unavailable"}
      </div>
    </div>
    <div className="p-4 md:p-6">
      <h3 className="mb-2 font-bold text-gray-800 text-lg md:text-xl">
        {apartment.name}
      </h3>
      <div className="flex items-center mb-3 text-gray-600 text-sm md:text-base">
        <MapPin className="mr-2 w-4 h-4" />
        <span>{apartment.location}</span>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-bold text-emerald-600 text-xl md:text-2xl">
          ₦{apartment.price.toLocaleString()}
          <span className="font-normal text-gray-500 text-xs md:text-sm">
            /month
          </span>
        </div>
        <div className="flex items-center text-yellow-500">
          <Star className="fill-current w-4 h-4" />
          <span className="ml-1 text-gray-600 text-xs md:text-sm">
            {apartment.rating || "4.8"}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { apartments } = useApartments();
  const featuredApartmentIds = [1, 2, 3];
  const featuredApartments = apartments.filter((apt) =>
    featuredApartmentIds.includes(apt.id)
  );

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen text-sm sm:text-base">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-emerald-900 overflow-hidden text-white"
        data-aos="fade-down"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="z-10 relative mx-auto px-4 py-10 sm:py-24 lg:py-32 container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-2">
              <span className="inline-flex items-center gap-2 bg-emerald-500/20 mb-4 px-4 py-2 border border-emerald-500/30 rounded-full font-medium text-emerald-300 text-sm sm:text-base">
                <HouseIcon className="w-5 h-5" /> Welcome to StayNest
              </span>
            </div>
            <h1 className="mb-2 font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight">
              Find Your Perfect
              <span className="block bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 text-transparent">
                Dream Home
              </span>
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-gray-300 sm:text-md text-base md:text-lg leading-relaxed">
              Discover affordable, secure, and modern apartments in Lagos. Your
              perfect home is just a click away.
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <a
                href="/apartments"
                className="group inline-flex justify-center items-center bg-gradient-to-r from-emerald-500 hover:from-emerald-600 to-teal-600 hover:to-teal-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-200"
              >
                Browse Listings
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="inline-flex justify-center items-center backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 hover:border-white/40 rounded-xl font-semibold text-white transition-all duration-200"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div data-aos="fade-up" data-aos-delay="100">
        <StatsSection />
      </div>

      {/* Featured Apartments */}
      <section className="bg-gray-50 py-5 sm:py-20" data-aos="fade-up" data-aos-delay="200">
        <div className="mx-auto px-4 max-w-6xl container">
          <div className="mb-12 text-center">
            <h2 className="mb-2 font-bold text-gray-800 text-2xl sm:text-4xl">
              Featured Apartments
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-base sm:text-lg">
              Handpicked properties that offer the best value and comfort in
              Lagos
            </p>
          </div>
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {featuredApartments.map((apt, i) => (
              <ApartmentCard key={apt.id} apartment={apt} delay={i * 150 + 100} />
            ))}
          </div>
          <div className="mt-12 text-center" data-aos="fade-up" data-aos-delay="300">
            <a
              href="/apartments"
              className="group inline-flex justify-center items-center hover:bg-emerald-500 px-6 py-3 border-2 border-emerald-500 rounded-xl font-semibold text-emerald-600 hover:text-white transition-all duration-200"
            >
              View All Listings
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="features" className="bg-white py-20" data-aos="fade-up" data-aos-delay="200">
        <div className="mx-auto px-4 max-w-6xl container">
          <div className="mb-12 text-center">
            <h2 className="mb-2 font-bold text-gray-800 text-2xl sm:text-4xl">
              Why Choose StayNest?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-base sm:text-lg">
              We simplify renting with cutting-edge technology and personalized
              service
            </p>
          </div>
          <div className="gap-8 grid grid-cols-1 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Verified Listings",
                desc: "Every property is thoroughly verified for quality, authenticity, and accuracy before going live on our platform.",
              },
              {
                icon: CreditCard,
                title: "Secure Payments",
                desc: "We support trusted payment gateways like Paystack & Interswitch for safe and secure transactions.",
              },
              {
                icon: Calendar,
                title: "Instant Booking",
                desc: "Book available apartments instantly with our real-time calendar system and smart booking technology.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-lg p-6 sm:p-8 border border-emerald-100 rounded-2xl transition-all duration-300"
                data-aos="zoom-in"
                data-aos-delay={i * 200 + 100}
              >
                <div className="flex justify-center items-center bg-gradient-to-br from-emerald-500 to-teal-600 mb-6 rounded-2xl w-14 sm:w-16 h-14 sm:h-16 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                </div>
                <h3 className="mb-3 font-bold text-gray-800 text-lg sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bg-gradient-to-r from-emerald-600 to-teal-700 py-16 sm:py-20 text-white"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="mx-auto px-4 text-center container">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 font-bold text-2xl sm:text-4xl">
              Ready to Find Your Dream Home?
            </h2>
            <p className="mb-8 text-emerald-100 text-base sm:text-lg">
              Join thousands of happy tenants who found their perfect home with
              StayNest
            </p>
            <div className="flex sm:flex-row flex-col justify-center gap-4">
              <a
                href="/apartments"
                className="inline-flex justify-center items-center bg-white hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-emerald-600 hover:scale-105 transition-all duration-200"
              >
                Start Your Search
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a
                href="/contact"
                className="inline-flex justify-center items-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 hover:border-white/40 rounded-xl font-semibold text-white transition-all duration-200"
              >
                <Users className="mr-2 w-5 h-5" />
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
