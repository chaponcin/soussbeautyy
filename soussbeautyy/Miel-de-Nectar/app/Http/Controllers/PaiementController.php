<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\Paiement;


class PaiementController extends Controller
{
    public function storePaiement(Request $request){
        $data = $request->validate([
            'rue' => 'required|string|min:2|max:60',
            'code_postal' => 'required|int|max:10',
        ]);
    }
    public function getPaiementById($id){}
}
