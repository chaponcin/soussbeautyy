<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Adresse;
use Illuminate\Http\JsonResponse;

/**
 *  Voir si on fait adresse de facturation et de livraison
 */
class AddresseController extends Controller
{
    public function storeAddresse($id_user, Request $request):JsonResponse
    {
        $data = $request->validate([
            'rue' => 'required|string|min:2|max:60',
            'code_postal' => 'required|int|max:10',
            'ville' => 'required|string|min:2|max:50',
            'pays' => 'required|string|min:2|max:60',
            'numero' => 'required|string|max:10',
            'boite' => 'nullable|string|max:10'
        ]);

        try {

            $data['rue'] = $data['rue'];
            $data['code_postal'] = $data['code_postal'];
            $data['ville'] = $data['ville'];
            $data['pays'] = $data['pays'];
            $data['numero'] =$data['numero'];
            $data['id_user'] =$id_user;

            if (isset($data['boite'])) $data['boite'] = $data['boite'];

            $address = Adresse::create($data);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'false',
                'message' => $th->getMessage()
                ], 500);
        }

        return response()->json([
            'status' => 'true',
            'message' => 'The addresse has been add'
        ], 201);
    }

    public function getUserAddresses($id_user, Request $request)
    {

    }
    public function deleteAddresse($id)
    {
        try {
            $product = Adresse::findOrFail($id);
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

    public function updateAddresse(Request $request)
    {

    }

}
