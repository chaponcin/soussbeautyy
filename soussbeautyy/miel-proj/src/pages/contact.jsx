import { FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';


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
          className="pl-2 pt-5 pb-5  "
        >
          <div className="flex flex-col gap-3">
            {/* Facebook Contact */}
            <div className="flex items-center">
              <FaFacebook className="text-blue-600 text-[36px] pl-1" />
              <p className="text-lg font-medium px-4">
                <a
                  href="https://www.facebook.com/people/Souss-beautyy/61575769208653/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline hover:text-blue-700"
                >
                  https://www.facebook.com/people/Souss-beautyy/61575769208653/
                </a>
              </p>
            </div>

                      {/* Facebook Contact */}
            <div className="flex items-center">
              <FaInstagram className="text-black text-[36px] pl-1" />
            
              <p className="text-lg font-medium px-4">
                <a
                  href="https://www.instagram.com/soussbeautyy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" underline hover:text-blue-700"
                >
                https://www.instagram.com/soussbeautyy/                </a>
              </p>
            </div>

            {/* Email Contact */}
            <div className="flex items-center">
              <FaEnvelope className="text-[36px] pl-1" />
              <p className="text-lg font-medium px-4">baihkarima@gmail.com</p>
            </div>

            {/* Phone Contact */}
            <div className="flex items-center">
              <FaPhone className="text-[36px] pl-1" />
              <p className="text-lg font-medium px-4">0032477862827</p>
            </div>
          </div>

          
        </motion.div>


      </div>
    </div>
  );
};

export default Contact;
