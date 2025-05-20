<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use App\Models\Avis;

/**
 *  Voir si on fait adresse de facturation et de livraison
 */
class AvisController extends Controller

{
    public function storeAvis(Request $request, $id_user, $id_article)
    {

    }

    public function getAvisById(Request $request)
    {

    }

    public function respondToAvis(Request $request)
    {

    }
    public function deleteAvisById($id)
    {
        try {
            $product = Avis::findOrFail($id);
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
