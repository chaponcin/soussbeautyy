<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\DB;
class UserController extends Controller
{
    public function getUser()
    {
    }

    public function getUserById($id, Request $request)
    {

        if ($request->user()->id !== (int)$id && !$request->user()->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $id_user = intval($id);
        try {
            $user = DB::table('users')
            ->leftJoin('addresses', 'users.id', '=', 'addresses.user_id')
            ->select('users.*', 'addresses.street', 'addresses.city', 'addresses.state', 'addresses.postal_code', 'addresses.country')
            ->where('users.id', $id_user)
            ->first();
            return response()->json(['status' => true, $user],200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'=> false,
                'message' => $th->getMessage()], 404);
        }
    }

    public function updateUserById(Request $request, $id)
    {
        if ($request->user()->id !== (int)$id && !$request->user()->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $id_user = intval($id);
        try{

        }catch(\Throwable $th){

        }

    }
    public function deleteUserById($id, Request $request)
    {
        if ($request->user()->id !== (int)$id && !$request->user()->is_admin) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $id_user = intval($id);

        try {
            DB::transaction(function () use ($id_user) {
                DB::table('refresh_tokens')->where('id_user', $id_user)->delete();

                DB::table('livraisons')->where('id_user', $id_user)->delete();

                $commandes = DB::table('commandes')->where('id_user', $id_user)->pluck('id_commande');

                DB::table('commande_produits')->whereIn('id_commande', $commandes)->delete();

                DB::table('commandes')->where('id_user', $id_user)->delete();

                DB::table('paiements')->where('id_user', $id_user)->delete();

                DB::table('adresses')->where('id_user', $id_user)->delete();

                DB::table('users')->where('id', $id_user)->delete();
            });

            return response()->json([
                'status' => true,
                'message' => 'User and all related information have been deleted successfully.'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}
