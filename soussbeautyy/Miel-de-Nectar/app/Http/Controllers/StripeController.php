<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Stripe\Stripe;
use Stripe\Checkout\Session;

/**
 * StripeController Class
 *
 * This controller handles Stripe payment integrations for the application.
 */
class StripeController extends Controller
{
    /**
     * Create a Stripe checkout session for payment processing
     *
     * This method initiates a Stripe checkout session with the products from the cart
     * and customer information. It generates a payment URL that redirects users to the
     * Stripe hosted checkout page.
     *
     * @param Request $request Contains user data and products to be purchased
     *                         - user: Array containing at least the email of the customer
     *                         - products: Array of products with name, image, price and quantity
     *
     * @return \Illuminate\Http\JsonResponse JSON response containing the checkout URL
     *
     * @throws \Stripe\Exception\ApiErrorException When Stripe API encounters an error
     */
    public function createCheckoutSession(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SK'));

        $user = $request->input('user');
        $products = $request->input('products');

        $lineItems = collect($products)->map(function ($product) {
            return [
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => [
                        'name' => $product['name'],
                        'images' => [$product['image']],
                    ],
                    'unit_amount' => $product['price'],
                ],
                'quantity' => $product['quantity'],
            ];
        });

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems->toArray(),
            'mode' => 'payment',
            'customer_email' => $user['email'],
            'success_url' => 'http://localhost:8000/payement/success',
            'cancel_url' => 'http://localhost:8000/payement/cancel',
        ]);

        return response()->json(['url' => $session->url]);
    }
}
