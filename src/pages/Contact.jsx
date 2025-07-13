import React, { useState, useRef, useEffect } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (success !== null) {
      const timer = setTimeout(() => setSuccess(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          form.current.reset();
        },
        () => {
          setLoading(false);
          setSuccess(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="bg-gray-900 px-4 py-16 sm:py-20 text-white"
      data-aos="fade-down"
      data-aos-duration="1000"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 font-bold text-3xl sm:text-4xl text-center">
          <span className="bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 text-transparent">
            Contact StayNest
          </span>
        </h2>

        <div className="gap-12 grid md:grid-cols-2">
          {/* Contact Info */}
          <div>
            <h3 className="mb-6 font-semibold text-xl sm:text-2xl">
              Questions? We're here to help
            </h3>
            <p className="mb-8 text-gray-300 text-base sm:text-lg leading-relaxed">
              Need help finding the perfect apartment, booking a visit, or
              resolving an issue? Reach out and we'll respond promptly.
            </p>

            <div className="space-y-5 text-sm sm:text-base">
              <div className="flex items-center gap-3">
                <Mail className="text-emerald-400" size={20} />
                <a href="mailto:contact@samadolalekan15@gmail.com" >
                  contact@samadolalekan15@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Github className="text-emerald-400" size={20} />
                <a
                  href="https://github.com/Abdulsamad25"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  github.com/Abdulsamad25
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="text-emerald-400" size={20} />
                <a
                  href="https://www.linkedin.com/in/abdulsamad-yahaya-b68228323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  
                >
                  linkedin.com/in/abdulsamad-yahaya
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Full Name
              </label>
              <input
                type="text"
                name="from_name"
                required
                className="bg-gray-800 px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm sm:text-base placeholder-gray-400"
                placeholder="e.g., John Doe"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Email Address
              </label>
              <input
                type="email"
                name="from_email"
                required
                className="bg-gray-800 px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm sm:text-base placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-sm sm:text-base">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="bg-gray-800 px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full text-sm sm:text-base resize-none placeholder-gray-400"
                placeholder="Ask us about availability, bookings, or anything else..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-3 rounded-lg w-full font-semibold text-white hover:scale-102 transition-all duration-200 cursor-pointer"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success === true && (
              <p className="mt-4 text-green-500 text-center">
                Your message was sent successfully!
              </p>
            )}
            {success === false && (
              <p className="mt-4 text-red-500 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
