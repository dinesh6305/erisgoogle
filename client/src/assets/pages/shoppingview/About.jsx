import { motion } from "framer-motion";

const values = [
    {
      title: "Excellence",
      description: "We pursue excellence in everything we do, from the materials we use to the sound we deliver.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      ),
    },
    {
      title: "Innovation",
      description: "We continuously push the boundaries of what's possible in audio technology.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      title: "Sustainability",
      description: "We're committed to minimizing our environmental impact and creating products that last.",
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];
const stats = [
  { label: "Years of Experience", value: "15+" },
  { label: "Countries", value: "75+" },
  { label: "Happy Customers", value: "2M+" },
  { label: "Awards Won", value: "50+" },
];

const team = [
  {
    name: "Alex Thompson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Sarah Kim",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Marketing",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

function Aboutpage() {
  return (
    <div className="page-transition pt-24 pb-20 bg-black overflow-hidden">
      <div className="container mx-auto px-6 text-white">
        {/* About Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
          <p className="text-lg">
            Founded in 2020, Eris has been on a mission to create audio products that elevate the everyday listening experience.
          </p>
        </motion.div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl shadow-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1626387346567-68d0b1ee4f58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Our Vision"
              className="w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold">Our Vision</h2>
            <p className="text-lg">
              We believe that great sound should be accessible to everyone. Our vision is to create audio products that seamlessly integrate into your life, enhancing every moment with exceptional sound quality and thoughtful design.
            </p>
            <p className="text-lg">
              From the beginning, we've focused on three core principles: premium audio quality, elegant design, and user-centered innovation. These principles guide everything we do, from research and development to customer service.
            </p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.6 }}
          className="mb-24 py-16 bg-gray-900 rounded-2xl text-white"
        >
          <div className="bg-gray-900">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={revealVariants}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="mt-2 text-lg">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={revealVariants}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow  bg-gray-900 `}
              >
                <div className={`h-12 w-12 rounded-full bg-gray-900' flex items-center justify-center mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-white">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        

        {/* Team Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={revealVariants}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-w-1 aspect-h-1 mb-4 overflow-hidden rounded-2xl ">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                </div>
                <h3 className="text-xl font-medium">{member.name}</h3>
                <p >{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Aboutpage;