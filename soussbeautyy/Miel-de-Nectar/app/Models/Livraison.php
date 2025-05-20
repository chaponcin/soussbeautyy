<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livraison extends Model
{
    use HasFactory;

    protected $table = 'livraisons';

    protected $fillable = [
        'commande_id',
        'address',
        'status',
        'delivery_date',
    ];

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function adresse()
    {
        return $this->belongsTo(Adresse::class, 'id_adresse');
    }
}
