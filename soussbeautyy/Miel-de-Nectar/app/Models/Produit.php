<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
    ];

    public function avis()
    {
        return $this->hasMany(Avis::class, 'id_produit');
    }

    public function categorie()
    {
        return $this->belongsTo(Categorie::class, 'id_categorie');
    }

    public function stocks()
    {
        return $this->hasMany(Stock::class, 'id_produit');
    }

    public function commandesProduits()
    {
        return $this->hasMany(CommandesProduit::class, 'id_produit');
    }
}
