<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adresse extends Model
{
    use HasFactory;

    protected $table = 'adresses';

    protected $fillable = [
        'rue',
        'code_postal',
        'ville',
        'pays',
        'numéro',
        'boite',
        'id_user',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function livraisons()
    {
        return $this->hasMany(Livraison::class, 'id_adresse');
    }
}
