'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    setIsLoading(true);
    setIsPressed(true);

    emailjs
      .sendForm(
        "spacebowling2025",
        "template_n8t7g95",
        form,
        "cBkZDu2g-J9pScX_S"
      )
      .then(
        () => {
          setFormStatus("success");
          form.reset();
        },
        () => {
          setFormStatus("error");
        }
      )
      .finally(() => {
        setIsLoading(false);
        setIsPressed(false);
      });
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" } }),
  };

  const statusVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    idle: { scale: 1 },
    pressed: { scale: 0.95 },
  };

  return (
    <section id="contact" className="py-16 bg-gray-900 text-white" aria-label="Contact Space Bowling Greece">
      <motion.div
        className="container mx-auto text-center mb-12 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cyan-300 drop-shadow-md">
          Contact Us
        </h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 italic">
          Have any questions? We would love to hear from you!
        </p>
        <span className="sr-only">
          Space Bowling Greece contact form for questions, booking, and feedback. Bowling bar in Halkidiki, Kalithea.
        </span>
      </motion.div>

      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={formVariants}
      >
        <div className="max-w-2xl mx-auto w-full bg-gray-800 p-8 rounded-xl shadow-2xl border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-label="Contact form"
          >
            {[
              { id: "name", name: "user_name", label: "Your Name", type: "text", placeholder: "John Doe", autoComplete: "name" },
              { id: "email", name: "email_from", label: "Your Email", type: "email", placeholder: "youremail@example.com", autoComplete: "email" },
              { id: "message", name: "message", label: "Your Message", type: "textarea", placeholder: "Write your message here...", autoComplete: "off" },
            ].map((field, index) => (
              <motion.div
                key={field.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={inputVariants}
                className="flex flex-col"
              >
                <label htmlFor={field.id} className="text-lg font-medium text-gray-300 mb-2">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    name={field.name}
                    className="p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition h-40 resize-y"
                    placeholder={field.placeholder}
                    required
                    aria-label={field.label}
                    autoComplete={field.autoComplete}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    className="p-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder={field.placeholder}
                    required
                    aria-label={field.label}
                    autoComplete={field.autoComplete}
                  />
                )}
              </motion.div>
            ))}

            {formStatus && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={statusVariants}
                className={`text-center py-2 px-4 rounded-lg mt-4 ${
                  formStatus === "success" ? "bg-green-600" : "bg-red-600"
                } text-white font-medium`}
                role="status"
                aria-live="polite"
              >
                {formStatus === "success"
                  ? "Your message has been sent successfully!"
                  : "Oops! Something went wrong, please try again."}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="relative w-full bg-gradient-to-b from-gray-800 to-gray-900 text-cyan-300 rounded-md font-semibold text-lg shadow-lg border border-cyan-300/40 overflow-hidden"
              variants={buttonVariants}
              initial="idle"
              animate={isLoading || isPressed ? "pressed" : "idle"}
              disabled={isLoading}
              aria-label="Send message"
              title="Send message to Space Bowling Greece"
            >
              <span className="relative z-10 flex items-center justify-center w-full py-3 px-6">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-cyan-300"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </span>
              <span
                className={`absolute inset-0 bg-cyan-300/30 rounded-md transition-all duration-600 ${
                  isPressed || isLoading ? "opacity-100 scale-150" : "opacity-0 scale-0"
                }`}
              />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm;