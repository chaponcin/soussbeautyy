import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBackground from '../assets/appi.jpg';
import aboutBackground from '../assets/app.png';
import productsBackground from '../assets/photo3.jpg';
import contactBackground from '../assets/appi.jpg';

const sectionVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i % 2 === 0 ? -100 : 100,
  }),
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 1.5,
      ease: 'easeOut',
    },
  }),
};

const Section = ({ children, background, custom }) => (
  <motion.section
    className="relative flex flex-col items-center justify-center text-center p-8 overflow-hidden my-4 min-h-screen rounded-xl"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    custom={custom}
    variants={sectionVariants}
  >
    {/* Image de fond */}
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    />
    
    {/* Dégradé pour fondus doux sur les bords */}
<div className="absolute top-0 left-0 w-full h-full z-0 bg-black/30 pointer-events-none" />

    {/* Contenu */}
    <div className="z-10 max-w-4xl">
      {children}
    </div>
  </motion.section>
);

const Home = () => {
  return (
    <div className="flex flex-col rounded-t-2xl overflow-hidden">
      <Section background={heroBackground} custom={0}>
        <h1 className="text-5xl font-bold mb-4 text-yellow-400 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
          Bienvenue sur Notre Site
        </h1>
        <p className="text-lg text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.7)]">
          Goûtez à l’authenticité d’un miel local, naturel et respectueux des abeilles.
        </p>
      </Section>

      <Section background={aboutBackground} custom={1}>
        <h2 className="text-4xl font-semibold mb-6 text-white drop-shadow">À propos de nous</h2>
        <p className="text-white text-lg">
          Nous pratiquons une apiculture raisonnée, sans pesticides, sans nourrissement artificiel, pour préserver la santé des abeilles et la qualité du miel.
        </p>
      </Section>

      <Section background={productsBackground} custom={2}>
        <h2 className="text-4xl font-semibold mb-6 text-white drop-shadow">Notre Produit</h2>
        <p className="text-white text-lg">
          Un miel local, issu d’une apiculture douce, à savourer au quotidien.
        </p>
      </Section>

      <motion.section
        className="relative flex flex-col md:flex-row items-center justify-center gap-8 text-left p-8 overflow-hidden my-8 min-h-screen rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
        variants={sectionVariants}
      >
        {/* Image visible à gauche */}
        <motion.div
          className="w-full md:w-1/2 h-64 md:h-[500px] bg-cover bg-center rounded-xl shadow-lg"
          style={{
            backgroundImage: `url(${contactBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Texte à droite */}
        <motion.div
          className="w-full md:w-1/2 z-10 md:pl-6 mt-6 md:mt-0"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h2 className="text-4xl font-semibold mb-6 text-black drop-shadow">Contactez-nous</h2>
          <p className="text-black text-lg mb-4">
            Une question ? Nous sommes toujours ravis de vous lire.
          </p>
          <button className="bg-black text-white hover:bg-yellow-600 hover:text-white font-bold py-3 px-6 rounded-full transition duration-300">
            <Link to="/contact">Nous Contacter</Link>
          </button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Home;