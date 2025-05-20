<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable

{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;
    use HasApiTokens;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'email',
        'role',
        'password',
        'rue',
        'numero',
        'code_postal',
        'ville',
    ];
    public function tokens()
    {
        return $this->hasMany(\Laravel\Passport\Token::class, 'user_id');
    }

    /**
     * Les clients OAuth que l'utilisateur possède (si tu crées des clients personnalisés).
     */
    public function clients()
    {
        return $this->hasMany(\Laravel\Passport\Client::class, 'user_id');
    }

    /**
     * Les codes d'autorisation (rarement utilisés avec password grant).
     */
    public function authCodes()
    {
        return $this->hasMany(\Laravel\Passport\AuthCode::class, 'user_id');
    }
    public function avis()
    {
        return $this->hasMany(Avis::class, 'id_user');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_user');
    }

    public function livraisons()
    {
        return $this->hasMany(Livraison::class, 'id_user');
    }
}

