
function Footer() {

  return (
<footer className="bg-black text-white py-4 px-8  bg-no-repeat flex items-center">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm">

        <div className="flex space-x-4">
          <a href="/mentions-legales" className="hover:underline">Mentions légales</a>
          <a href="/politique-confidentialite" className="hover:underline">Confidentialité</a>
          <a href="/livraison" className="hover:underline">Livraison</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;