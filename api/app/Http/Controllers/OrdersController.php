<?php

namespace App\Http\Controllers;
1111
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class OrdersController extends Controller
{
    public function generateOrderId($orderId)
    {
        if ($orderId == "TRANS") {
            // Available alpha caracters
            $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            // generate a pin based on 2 * 7 digits + a random character
            $pin = mt_rand(1000, 9999)
                . mt_rand(1000, 9999)
                . $characters[rand(0, strlen($characters) - 1)];

            // shuffle the result
            $string = str_shuffle($pin);
            return $string;
        } else {
            return $orderId;
        }
    }

    public function AdOrder(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'transaction_id' => 'required',
            'user_id' => 'required',
            'amount' => 'required',
            'product_id' => 'required',
        ]);
        $order = [
            'transaction_id' => $request->transaction_id,
            'user_id' => $request->user_id,
            'amount' => $request->amount,
            'products_id' => $request->product_id,
        ];

        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()]);
        } else {
            $ordered = Orders::create($order);
            return response()->json(['message' => 'Success', 'product' => $ordered]);
        }
    }

    public function GetMyAds($user_id)
    {
        return Orders::where(['status' => 'completed', 'user_id' => $user_id])->with(['product:id,name,description,image,price'])->get();
    }

    public function GetCart($transaction_id)
    {
        $total = Orders::where(['transaction_id' => $transaction_id, 'status' => 'pending'])->sum('amount');
        $cart = Orders::where(['transaction_id' => $transaction_id, 'status' => 'pending'])->with(['product:id,name,description,image,price'])->get();
        return response()->json(['cart' => $cart, 'amount' => $total]);
    }

    public function checkout($transaction_id)
    {
        $carts = Orders::where(['transaction_id' => $transaction_id])->update(['status' => 'completed']);
        return response()->json(['message' => 'Purchase made successfully']);
    }

    public function deleteCart($product_id, $created_at)
    {
        Orders::where(['id' => $product_id, 'created_at' => $created_at])->delete();
        return response()->json(['message' => 'Delete made successfully']);
    }
}
