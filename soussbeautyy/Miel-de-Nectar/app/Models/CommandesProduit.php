<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommandesProduit extends Model
{
    use HasFactory;

    protected $table = 'commandes_produits';

    protected $fillable = [
        'commande_id',
        'produit_id',
        'quantity',
        'price',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }
}
