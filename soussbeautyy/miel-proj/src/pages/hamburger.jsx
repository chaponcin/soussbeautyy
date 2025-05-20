import { Link, useNavigate } from 'react-router-dom';

function Hamburger() {
    return (
      <div className="text-center">
 
 <Link to="/" className="block pt-[90px] text-2xl py-4">Home</Link>
<Link to="/boutique" className="block text-2xl py-4">Boutique</Link>
<Link to="/recettes" className="block text-2xl py-4">Recettes</Link>
<Link to="/contact" className="block text-2xl py-4">Contact</Link>

<Link to="/pannier" className="block text-2xl py-4">
  <img src="./src/assets/pannier.svg" alt="Panier" className="h-9 mx-auto" />
</Link>

<Link to="/inscription" className="block text-2xl py-4">Inscription</Link>
<Link to="/connexion" className="block text-2xl py-4">Connexion</Link>


      </div>
    );
  }
  
  export default Hamburger;
  