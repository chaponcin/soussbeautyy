import { FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-3xl font-bold mb-6 p-5"
      >
        Contact
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-[100px] mt-5 w-full px-4">
        {/* Left side - Contact info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="pl-2 pt-5 pb-5 bg-white shadow-md rounded-md"
        >
          <div className="flex flex-col gap-3">
            {/* Facebook Contact */}
            <div className="flex items-center">
              <FaFacebook className="text-blue-600 text-[36px] pl-1" />
              <p className="text-lg font-medium px-4">
                <a
                  href="https://www.facebook.com/Rucher-de-Stoqueu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-700"
                >
                  Rucher de Stoqueu
                </a>
              </p>
            </div>

            {/* Email Contact */}
            <div className="flex items-center">
              <FaEnvelope className="text-[36px] pl-1" />
              <p className="text-lg font-medium px-4">philippeneo@gmail.com</p>
            </div>

            {/* Phone Contact */}
            <div className="flex items-center">
              <FaPhone className="text-[36px] pl-1" />
              <p className="text-lg font-medium px-4">0032475685201</p>
            </div>
          </div>
        </motion.div>

        {/* Right side - Google Maps */}
        <div className="p-0">
          <iframe
            title="Google Maps - Rucher de Stoqueu"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2539.87985837091!2d5.6933848771683015!3d50.4619618715945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c05e812920fd95%3A0xf7575e96b00fff24!2sHam.%20de%20Stoqueu%2045%2C%204920%20Aywaille!5e0!3m2!1sfr!2sbe!4v1744625863109!5m2!1sfr!2sbe"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-[200px] shadow-lg w-[150px] h-[150px] border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
