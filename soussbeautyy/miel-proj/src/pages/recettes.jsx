import { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import poulet from '../assets/poulet.png';
import bienetre from '../assets/bienetre.png';
import bienetre1 from '../assets/bienetre1.png';
import bienetre2 from '../assets/bienetre2.png';
import bienetre3 from '../assets/bienetre3.png';
import bienetre4 from '../assets/bienetre4.png';
import bienetre5 from '../assets/bienetre5.png';
import bienetre6 from '../assets/bienetre6.png';
import bienetre7 from '../assets/bienetre7.png';
import bienetre8 from '../assets/bienetre8.png';
import bienetre9 from '../assets/bienetre9.png';
import bienetre10 from '../assets/bienetre10.png';
import rec2 from '../assets/rec2.png';
import rec3 from '../assets/rec3.png';
import rec4 from '../assets/rec4.png';
import rec5 from '../assets/rec5.png';
import rec6 from '../assets/rec6.png';
import rec7 from '../assets/rec7.png';
import rec8 from '../assets/rec8.png';
import rec9 from '../assets/rec9.png';

const recipes = [
  {
    img: poulet,
    title: "Poulet au Miel et à la Moutarde",
    ingredients: [
      "4 poitrines de poulet",
      "3 cuillères à soupe de miel",
      "2 cuillères à soupe de moutarde",
      "1 cuillère à soupe d'huile d'olive",
      "Sel et poivre au goût",
    ],
    instructions: [
      "Préchauffez le four à 200°C.",
      "Assaisonnez les poitrines de poulet avec du sel et du poivre.",
      "Dans un bol, mélangez le miel, la moutarde et l'huile d'olive.",
      "Badigeonnez les poitrines de poulet de ce mélange.",
      "Faites cuire au four pendant 25-30 minutes, en arrosant le poulet de sauce toutes les 10 minutes.",
    ],
  },
  {
    img: rec2,
    title: "Vinaigrette au Miel et à la Moutarde",
    ingredients: [
      "3 cuillères à soupe de miel",
      "2 cuillères à soupe de moutarde",
      "2 cuillères à soupe de vinaigre balsamique",
      "4 cuillères à soupe d'huile d'olive",
      "Sel et poivre au goût",
    ],
    instructions: [
      "Dans un bol, mélangez le miel, la moutarde et le vinaigre balsamique.",
      "Incorporez lentement l'huile d'olive en fouettant constamment pour émulsionner la vinaigrette.",
      "Assaisonnez avec du sel et du poivre selon vos préférences.",
      "Utilisez cette vinaigrette pour assaisonner vos salades préférées.",
    ],
  },
  {
    img: rec3,
    title: "Lait Doré au Curcuma et au Miel",
    ingredients: [
      "1 tasse de lait (végétal ou ordinaire)",
      "1 cuillère à café de curcuma en poudre",
      "1 cuillère à soupe de miel",
      "1 pincée de poivre noir",
    ],
    instructions: [
      "Dans une petite casserole, chauffez le lait à feu doux.",
      "Ajoutez le curcuma en poudre et le poivre noir. Mélangez bien.",
      "Laissez mijoter pendant 5 minutes.",
      "Retirez du feu et ajoutez le miel. Remuez jusqu'à ce qu'il soit bien incorporé.",
      "Servez chaud et savourez cette boisson réconfortante.",
    ],
  },
  {
    img: rec4,
    title: "Tarte aux Pommes au Miel",
    ingredients: [
      "1 pâte brisée",
      "4 pommes, pelées, épépinées et tranchées",
      "3 cuillères à soupe de miel",
      "1 cuillère à café de cannelle",
      "2 cuillères à soupe de beurre",
    ],
    instructions: [
      "Préchauffez le four à 180°C.",
      "Abaissez la pâte brisée dans un moule à tarte.",
      "Disposez les tranches de pommes sur la pâte.",
      "Dans une petite casserole, faites fondre le beurre et le miel à feu doux.",
      "Ajoutez la cannelle et mélangez.",
      "Versez ce mélange sur les pommes dans le moule à tarte, en veillant à bien les enrober.",
      "Pliez les bords de la pâte sur les pommes pour former une bordure rustique.",
      "Enfournez la tarte dans le four préchauffé et faites cuire pendant environ 30 à 35 minutes.",
    ],
  },
  {
    img: rec5,
    title: "Salade de Chèvre Chaud au Miel",
    ingredients: [
      "4 tranches de fromage de chèvre",
      "4 cuillères à soupe de miel",
      "4 poignées de salade verte mélangée",
      "1/2 tasse de noix grillées",
      "2 cuillères à soupe d'huile d'olive",
      "2 cuillères à soupe de vinaigre balsamique",
      "Sel et poivre noir moulu, au goût",
    ],
    instructions: [
      "Préchauffez le four à 180°C.",
      "Disposez une tranche de fromage de chèvre sur chaque tranche de pain.",
      "Badigeonnez le fromage avec du miel et faites-les cuire au four pendant 5 à 7 minutes.",
      "Pendant ce temps, préparez la salade avec les autres ingrédients.",
      "Ajoutez le fromage chaud sur la salade et servez immédiatement.",
    ],
  },
  {
    img: rec6,
    title: "Saumon au Miel et à l'Orange",
    ingredients: [
      "4 filets de saumon",
      "Jus et zeste de 2 oranges",
      "1/4 de tasse de miel",
      "2 cuillères à soupe de sauce soja",
      "2 gousses d'ail hachées",
      "Sel et poivre noir moulu, au goût",
    ],
    instructions: [
      "Préchauffez le four à 200°C.",
      "Mélangez tous les ingrédients de la sauce.",
      "Versez sur les filets de saumon dans un plat et enfournez 15 à 20 minutes.",
    ],
  },
  {
    img: rec7,
    title: "Brochettes de Fruits au Miel et à la Cannelle",
    ingredients: [
      "Assortiment de fruits (ananas, fraises, bananes, etc.)",
      "1/4 de tasse de miel",
      "1 cuillère à café de cannelle en poudre",
    ],
    instructions: [
      "Coupez les fruits, enfilez-les sur des brochettes.",
      "Badigeonnez avec le mélange miel + cannelle.",
      "Grillez légèrement jusqu’à caramélisation.",
    ],
  },
  {
    img: rec8,
    title: "Muffins au Miel et aux Amandes",
    ingredients: [
      "2 tasses de farine",
      "1/2 tasse de miel",
      "1/2 tasse d'amandes hachées",
      "1/2 tasse de lait",
      "1/4 de tasse de beurre fondu",
      "2 œufs",
      "1 cuillère à café de levure chimique",
      "1 cuillère à café d'extrait de vanille",
    ],
    instructions: [
      "Mélangez tous les ingrédients, remplissez les moules à muffins.",
      "Faites cuire à 180°C pendant 20-25 min.",
    ],
  },
  {
    img: rec9,
    title: "Tartines au Fromage de Chèvre, au Miel et aux Figues",
    ingredients: [
      "4 tranches de pain de campagne",
      "1/2 tasse de fromage de chèvre frais",
      "4 cuillères à soupe de miel",
      "4 figues fraîches ou séchées, tranchées",
      "Quelques feuilles de roquette",
      "Sel et poivre au goût",
    ],
    instructions: [
      "Grillez le pain, étalez le fromage, ajoutez les figues et le miel.",
      "Ajoutez la roquette et servez.",
    ],
  },
];

const images = [
  bienetre, bienetre1, bienetre2, bienetre3, bienetre4,
  bienetre5, bienetre6, bienetre7, bienetre8, bienetre9, bienetre10
];

function Recettes() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showArrow, setShowArrow] = useState(true);



  const handleScrollEvent = (e) => {
    e.stopPropagation();
  };

  const bookPages = [
    {
      type: "cover",
      content: (
        <div className="flex items-center justify-center h-full bg-yellow-300 relative">
          <h1 className="text-5xl font-playfair font-bold text-amber-900 text-center">Livre de Recettes</h1>
          {showArrow && (
            <div className="absolute bottom-5 right-5 animate-bounce text-amber-900 text-xl">
              <span className="text-4xl">➤</span> <span className="ml-1">Tournez la page</span>
            </div>
          )}
        </div>
      ),
    },
    {
      type: "blank",
      content: <div className="h-full bg-cream" />,
    },
    ...recipes.flatMap((recipe, index) => [
      {
        type: "image",
        content: (
          <div className="h-full">
            <img
              src={images[index % images.length]}
              alt={`bienetre${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ),
      },
      {
        type: "recipe",
        content: (
          <div
            className="p-6 bg-cream h-full flex flex-col overflow-y-auto"
            onMouseDown={handleScrollEvent}
            onTouchStart={handleScrollEvent}
          >
            <h2 className="text-xl md:text-2xl font-playfair font-semibold text-amber-900 mb-3">{recipe.title}</h2>
            <img src={recipe.img} alt={recipe.title} className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-lg mx-auto mb-3" />
            <h3 className="text-base md:text-lg font-roboto font-medium text-gray-800 mb-2">Ingrédients :</h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-600 font-roboto mb-3">
              {recipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <h3 className="text-base md:text-lg font-roboto font-medium text-gray-800 mb-2">Instructions :</h3>
            <ol className="list-decimal list-inside text-sm md:text-base text-gray-600 font-roboto">
              {recipe.instructions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
        ),
      },
    ]),
    {
      type: "blank",
      content: <div className="h-full bg-cream" />,
    },
  ];

  const handlePageFlip = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-cream flex flex-col items-center justify-center pt-24 pb-12 px-4">
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-amber-900 mb-8">Nos Recettes</h1>
      <div className="relative w-full max-w-4xl">
        <HTMLFlipBook
          width={400}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={600}
          minHeight={400}
          maxHeight={800}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handlePageFlip}
          disableFlipByClick
        >
          {bookPages.map((page, index) => (
            <div key={index} className="bg-white">
              {page.content}
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
}
// Styles pour le livre

export default Recettes;
