<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\Stocks;
use App\Models\Produit;
use App\Models\CommandesProduit;
use App\Models\Commande;

class CommandeController extends Controller
{
    public function storeCommande(Request $request)
    {
        $data = $request->validate([
            'rue' => 'required|string|min:2|max:60',
            'code_postal' => 'required|integer|max:99999',
            'ville' => 'required|string|min:2|max:50',
            'pays' => 'required|string|min:2|max:60',
            'numero' => 'required|string|max:10',
            'boite' => 'nullable|string|max:10',
            'user_id' => 'required|exists:users,id',
            'produits' => 'required|array',
            'produits.*.id' => 'required|exists:produits,id',
            'produits.*.quantity' => 'required|integer|min:1'
        ]);

        try {
            $commande = new Commande();
            return response()->json([
                'status' => 'success',
                'message' => 'Commande created successfully',
                'data' => $commande->load('commandesProduits.produit', 'user')
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create commande',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAllCommandes()
    {
        try {
            $commandes = Commande::all();

            return response()->json([
                'status' => 'success',
                'data' => $commandes
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve commandes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getAllUserCommandes($id)
    {
        try {
            $commandes = Commande::where('user_id', $id)
                ->with('commandesProduits.produit')
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $commandes
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve user commandes',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function updateCommandeById(Request $request, $id)
    {
        try {
            $commande = Commande::findOrFail($id);
            $commande->update($request->all());

            return response()->json([
                'status' => 'success',
                'message' => 'Commande updated successfully',
                'data' => $commande
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update commande',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function deleteCommande($id)
    {
        try {
            $product = Commande::findOrFail($id);
            $product->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Product deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete product',
                'error' => $e->getMessage()
            ], 500);
        }
    }

}
