import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: <MapPin className="h-6 w-6 text-gray-500 mt-0.5" />,
    title: "Our Location",
    description: "123 Design Street, San Francisco, CA 94107",
  },
  {
    icon: <Phone className="h-6 w-6 text-gray-500 mt-0.5" />,
    title: "Phone Number",
    description: "+1 (555) 123-4567",
  },
  {
    icon: <Mail className="h-6 w-6 text-gray-500 mt-0.5" />,
    title: "Email Address",
    description: "support@soundwave.com",
  },
];

const operatingHours = [
  { day: "Monday - Friday", hours: "9AM - 6PM (PST)" },
  { day: "Saturday", hours: "10AM - 4PM (PST)" },
  { day: "Sunday", hours: "Closed" },
];

const socialLinks = [
  {
    href: "#",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    href: "#",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    href: "#",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="page-transition pt-24 pb-20 bg-black text-white">
      <div className="container mx-auto px-6">
        {/* Contact Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-white">
            Have questions about our products or need support? We're here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  p-9">
          {/* Contact Information */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold">Contact Information</h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  {info.icon}
                  <div>
                    <h3 className="font-medium">{info.title}</h3>
                    <p className="text-white">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6">
              <h3 className="text-lg font-medium mb-3">Operating Hours</h3>
              <div className="space-y-2 text-white">
                {operatingHours.map((hour, index) => (
                  <p key={index}>{hour.day}: {hour.hours}</p>
                ))}
              </div>
            </div>
            
            <div className="pt-6">
              <h3 className="text-lg font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.href} className="h-10 w-10 rounded-full border flex items-center justify-center transition-colors hover:bg-gray-900">
                    {link.svg}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900 rounded-2xl p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
                <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                    placeholder="Ex:-Amit"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                    placeholder="Ex:-Amit@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-white focus:border-white transition-all outline-none bg-gray-900 text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="product-inquiry">Product Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition-all outline-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg cursor-pointer  bg-purple-700 hover:bg-purple-800 text-white font-medium transition-all ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold mb-6">Location</h2>
          <div className="h-96 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0628107562363!2d-122.40177768475017!3d37.78662231957269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085a67a3e27%3A0x4cbd9e97b52a6e8c!2sSan%20Francisco%2C%20CA%2094107!5e0!3m2!1sen!2sus!4v1652291753098!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;