'use client'

import { motion } from 'framer-motion'

export default function WorkingHours() {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
  }

  return (
    <section
      id="working-hours"
      className="py-16 bg-gray-900 text-white"
      aria-label="Space Bowling Greece Working Hours and Location"
    >
      <div className="container mx-auto flex flex-col lg:flex-row-reverse items-center gap-12 px-6">
        {/* Working Hours Card */}
        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          aria-label="Working Hours"
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 h-full flex flex-col transform transition-transform duration-300 hover:scale-[1.02] border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-cyan-300">
              Working Hours
            </h2>
            <p className="text-lg text-center mb-8 text-gray-300 italic">
              Closed Until Summer 2026
            </p>
            <span className="sr-only">
              Space Bowling Greece - Open daily 18:00 to 03:00, currently closed until Summer 2026
            </span>
            <div className="space-y-4 flex-1">
              <ul className="space-y-4" aria-label="Weekly working hours">
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day,index) => (
                  <motion.li
                    key={day}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={listItemVariants}
                    className="flex justify-between items-center bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    <span className="text-xl font-semibold text-white">{day}</span>
                    <span className="text-lg text-gray-300 font-medium">CLOSED</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Google Maps Card */}
        <motion.div
          className="w-full lg:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardVariants}
          aria-label="Location Map"
        >
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 h-[682px] flex flex-col transform transition-transform duration-300 hover:scale-[1.02] border border-cyan-500/30 hover:border-cyan-500 transition-colors duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-cyan-300">
              You Can Find Us Here
            </h2>
            <div className="overflow-hidden rounded-lg flex-1 relative">
              <iframe
                className="w-full h-full rounded-lg"
                style={{ filter: 'invert(0.9) hue-rotate(180deg)' }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3053.474560001897!2d23.4511781!3d40.0648254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a62a4ae12c08d3%3A0xeb9fcf264ca5f322!2sSpace%20Bowling!5e0!3m2!1sen!2sgr!4v1741849295332!5m2!1sen!2sgr"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Space Bowling location map in Greece tourist district"
                aria-label="Google Map showing Space Bowling Greece location"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none rounded-lg"></div>
            </div>
            <span className="sr-only">
              Space Bowling Greece location: Kalithea, Halkidiki, Greece. Find us on Google Maps.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
