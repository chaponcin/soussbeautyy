function Achete() {
  return (
    <div className="flex flex-col justify-start  px-8 space-y-4 pt-[150px]">
      <p className="text-[#D1B840] text-center font-bold">Merci de votre achat !</p>
      <p className="text-center pt-[20px]">Votre numéro de commande est le 1.</p>
      
      <div
  className="w-60 mx-auto p-6 bg-white mt-[35px] "

>
  <p className="font-semibold mb-4">Commande :</p>
  <div className="flex justify-between">
    <p>Miel artisanal 250g</p>
    <p>x1</p>
  </div>
</div>





      <p className="font-bold text-center pt-[25px]">Vous avez reçu un e-mail<br></br>
      (N'oubliez pas de vérifier vos spams si ce n'est déjà fait).</p>
      <p className="text-center pt-[15px]">Pour toute question concernant cette commande, contactez-nous.</p>
    </div>
  );
}

export default Achete;
