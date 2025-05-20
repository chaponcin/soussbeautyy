<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    use HasFactory;

    protected $table = 'ingredients';

    protected $fillable = [
        'name',
        'description',
        'quantity',
        'unit',
    ];

    public function recettes()
    {
        return $this->hasMany(Recette::class, 'id_ingredient');
    }
}
