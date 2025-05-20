<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;


class AuthController extends Controller
{

    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => 'required|string|min:2|max:60',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6'
        ]);
        $data['email_verified_at'] = now();
        $data['password'] = bcrypt($data['password']);
        $data['code_postal'] = null;
        $data['ville'] = null;
        $data['pays'] = null;
        $data['numero'] = null;
        $data['boite'] = null;
        $data['role'] = 0;
        $user = User::create($data);
        try {
            $tokenRequest = Request::create('/oauth/token', 'POST', [
                        'grant_type' => 'password',
                        'client_id' => env('PASSPORT_PASSWORD_CLIENT_ID'),
                        'client_secret' => env('PASSPORT_PASSWORD_SECRET'),
                        'username' => $data['email'],
                        'password' => $request->password,
                        'scope' => '',
                    ]);

            $tokenResponse = app()->handle($tokenRequest);
            $tokenData['token'] = json_decode($tokenResponse->getContent(), true);
            $tokenData['user'] = [
                'id' => $user->id,
                'role' => $user->role,
            ];

            return response()->json([
                'success' => true,
                'statusCode' => 201,
                'message' => 'User has been registered successfully.',
                'data' => $tokenData,
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()],
                500
            );
        }
    }

    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6'
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'The provided credentials are incorrect.'
            ], 401);
        }

        try {
            $tokenRequest = Request::create('/oauth/token', 'POST', [
                'grant_type' => 'password',
                'client_id' => env('PASSPORT_PASSWORD_CLIENT_ID'),
                'client_secret' => env('PASSPORT_PASSWORD_SECRET'),
                'username' => $data['email'],
                'password' => $request->password,
                'scope' => '',
            ]);

            $tokenResponse = app()->handle($tokenRequest);
            $tokenData['token'] = json_decode($tokenResponse->getContent(), true);
            $tokenData['user'] = [
                'id' => $user->id,
                'role' => $user->role,
            ];

            return response()->json([
                'success' => true,
                'statusCode' => 200,
                'message' => 'User has been logged successfully.',
                'data' => $tokenData,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()],
                500
            );
        }
    }

/**
     * Logout
     */
    public function logout(): JsonResponse
    {
        Auth::user()->token()->delete();

        return response()->json([
            'success' => true,
            'statusCode' => 204,
            'message' => 'Logged out successfully.',
        ], 204);
    }

/**
     * refresh token
     *
     * @return json
     */
    public function refreshToken(Request $request): JsonResponse
    {
        try {
            $tokenRequest = Request::create('/oauth/token', 'POST', [
                'grant_type' => 'refresh_token',
                'refresh_token' => $request->refresh_token,
                'client_id' => env('PASSPORT_PASSWORD_CLIENT_ID'),
                'client_secret' => env('PASSPORT_PASSWORD_SECRET'),
                'scope' => '',
            ]);

            $tokenResponse = app()->handle($tokenRequest);
            $tokenData = json_decode($tokenResponse->getContent(), true);

            return response()->json([
                'success' => true,
                'statusCode' => 200,
                'message' => 'Refreshed token.',
                'data' => $tokenData,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }
}



