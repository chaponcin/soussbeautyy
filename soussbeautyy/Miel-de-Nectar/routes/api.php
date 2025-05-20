<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\RecetteController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\StripeController;

/** Authentication Routes */
Route::post('inscription', [AuthController::class, 'register']);
Route::post('connexion', [AuthController::class, 'login']);
Route::post('refresh', [AuthController::class, 'refreshToken']);
/** Public Routes */
Route::get('produits', [ProduitController::class, 'getAllProduct']);
Route::get('produits/{id}', [ProduitController::class, 'getProductById']);

/** Protected Routes */
Route::group(["middleware" => ["auth:api"]],function () {

    Route::post('logout', [AuthController::class, 'logout']);

    Route::put('produits/{id}', [ProduitController::class, 'updatetProductById']);
    Route::delete('produits/{id}', [ProduitController::class, 'deleteProductById']);
    Route::post('produits/{id}', [ProduitController::class, 'storeProduct']);
    // User Routes
    Route::get('/users/{id}', [UserController::class, 'getUserById']);
    Route::delete('/users/{id}', [UserController::class, 'deleteUserById']);
    Route::put('/users/{id}', [UserController::class, 'updateUserById']);

    // Commande Routes
    Route::post('/commande', [CommandeController::class, 'storeCommande']);
    Route::put('/commandes/{id}/list', [CommandeController::class, 'getAllCommandes']);
    Route::put('/commandes/{id}/list', [CommandeController::class, 'updateCommande']);
    Route::delete('/commandes/{id}', [CommandeController::class, 'deleteCommande']);

    // Avis Routes
    Route::post('/avis', [AvisController::class, 'storeAvis']);
    Route::get('/avis/{id}', [AvisController::class, 'getAvisById']);
    Route::put('/avis/{id}/reponse', [AvisController::class, 'respondToAvis']);

    // Recette Routes
    Route::post('/recettes/{id}', [RecetteController::class, 'storeRecetteById']);
    Route::put('/recettes/{id}', [RecetteController::class, 'updateRecetteById']);
    Route::delete('/recettes/{id}', [RecetteController::class, 'deleteRecetteById']);

    // Paiement Routes
    Route::get('/paiements/{id}', [PaiementController::class, 'getPaiementById']);
    Route::post('/paiements', [PaiementController::class, 'storePaiement']);

    //Payement avec Stripe
    Route::post('/create-checkout-session', [StripeController::class, 'createCheckoutSession']);
});
