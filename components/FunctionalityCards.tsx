import React from 'react';
import { easeInOut, easeOut, motion, spring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FunctionalityCards = () => {
  const appFunctions = [
    {
      title: "Connect Data & Tools",
      description: "Hook up CRMs, docs, emails and APIs securely",
    },
    {
      title: "Configure Agents",
      description: "Pick a template or compose an agent with no code",
    },
    {
      title: "Deploy & Iterate",
      description: "Ship to production in hours with analytics built-in",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const stepVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut
      }
    }
  };

  const circleVariants = {
    hidden: {
      scale: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        type: spring,
        stiffness: 200,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: easeOut
      }
    }
  };

  const lineVariants = {
    hidden: {
      scaleX: 0,
      opacity: 0
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
        delay: 0.8,
        ease: easeInOut
      }
    }
  };

  const arrowVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        delay: 0.6,
        ease: easeInOut
      }
    }
  };

  return (
    <div className="pt-8 px-8 flex items-center justify-center">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get Started in 3 Steps
          </h2>
          <p className="text-xl text-gray-600">
            Simple workflow to deploy your AI agents
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col md:flex-row mt-6 gap-x-14 gap-y-10 w-fit mx-auto relative"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated connecting line */}
          <motion.hr
            className="invisible md:visible absolute top-1/2 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-orange-200 origin-left"
            variants={lineVariants}
          />

          {appFunctions.map((func, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-y-4 items-center z-40"
              variants={stepVariants}
            >
              <div className="relative w-full flex justify-center items-center">
                {/* Animated number circle */}
                <motion.div
                  className="bg-orange-500 h-12 w-12 rounded-full flex items-center justify-center text-white font-extrabold cursor-pointer"
                  variants={circleVariants}
                  whileHover={{
                    scale: 1.15,
                    boxShadow: "0 10px 25px rgba(249, 115, 22, 0.4)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {index + 1}
                </motion.div>

                {/* Animated arrow */}
                {index + 1 !== appFunctions.length && (
                  <motion.div
                    className="invisible md:visible absolute -right-4 flex items-center gap-x-2"
                    variants={arrowVariants}
                  >
                    <motion.div
                      className="w-10 h-0.5 rounded-2xl bg-orange-500 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.2 + 1.0,
                        ease: "easeOut"
                      }}
                    />
                    <motion.div
                      animate={{
                        x: [0, 3, 0],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2 + 1.4
                      }}
                    >
                      <ArrowRight
                        className="text-orange-500 h-4 w-4"
                        strokeWidth={3}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </div>

              {/* Animated card */}
              <motion.div
                className="p-6 bg-white shadow-lg rounded-lg max-w-[250px] text-center space-y-3 cursor-pointer"
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.h3
                  className="text-md font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  {func.title}
                </motion.h3>
                <motion.p
                  className="text-muted-foreground font-light text-center text-xs leading-7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                >
                  {func.description}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FunctionalityCards;