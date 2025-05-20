<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    protected $table = 'commandes';

    protected $fillable = [
        'user_id',
        'status',
        'total_price',
        'created_at',
        'updated_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function produits()
    {
        return $this->hasMany(CommandesProduit::class, 'id_commande');
    }

    public function livraison()
    {
        return $this->hasOne(Livraison::class, 'id_commande');
    }

    public function paiement()
    {
        return $this->hasOne(Paiment::class, 'id_commande');
    }
}
