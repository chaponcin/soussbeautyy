<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\Recette;



class RecetteController extends Controller
{
    public function storeRecette(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:users',
            'instructions' => 'required|string|',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        $imageName = time().'.'.$request->image->extension();
        $request->image->move(public_path('images'), $imageName);
        $data['image'] = 'images/'.$imageName;
        $data['instructions'] = htmlspecialchars($request->instructions);
        $data['name'] = htmlspecialchars($request->name);
        Recette::create($data);
        return response()->json([
            "message" => "La recette a bien été crée"
        ]);
    }

    public function getRecetteById($id){
        $data = Recette::find($id);
        if(!$data) return response()->json(["message" => "Recette non trouvée"]);
        $recettes = [];
        foreach ($data as $recette) {
            $recettes[] = ['id' => $recette['id'], 'image' => $recette['image'], 'name' => $recette['name']];
        }
        return response()->json([
            "data" => $recettes
        ]);
    }

    public function getAllRecettes(){
        $data = Recette::all();
        $recettes = [];
        foreach ($data as $recette) {
            $recettes[] = [$recette['id'], $recette['image'], $recette['name']];
        }
        return response()->json([
            "data" => $recette
        ]);
    }

    public function updateRecetteById(Request $request, $id)
    {
        $request->validate([
            'name' => 'string|unique:users',
            'instructions' => 'string|',
            'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        if(!empty($request->image)){
            $imageName = time().'.'.$request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $data['image'] = 'images/'.$imageName;
        }
        else{$data['image'] = null;}
        try {
            $recette = Recette::find($id);
            if(!$recette) return response()->json(["message" => "Recette non trouvée"], 404);

            if(isset($data['name'])) $recette->name = $data['name'];
            if(isset($data['instructions'])) $recette->instructions = $data['instructions'];
            if(isset($data['image'])) $recette->image = $data['image'];
            $recette->save();

            return response()->json([
                "message" => "La recette a bien été update"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to update product',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function deleteRecetteById($id)
    {
        try {
            $product = Recette::findOrFail($id);
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
