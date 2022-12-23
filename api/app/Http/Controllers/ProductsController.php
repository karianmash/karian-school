<?php

namespace App\Http\Controllers;
11
use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductsController extends Controller
{
    public function GetProducts()
    {
        return Products::all();
    }

    public function store(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'price' => 'required',
            'image' => 'required|image',
            'categories_id' => 'required',
            'user_id' => 'required',
        ]);

        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()]);
        } else {
            if ($request->file('image')) {
                $file = $request->file('image');
                $name = $file->hashName();
                $file->move(public_path('uploads'), $name);

                $data = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'price' => $request->price,
                    'image' => $name,
                    'categories_id' => $request->categories_id,
                    'user_id' => $request->user_id
                ];

                Products::create($data);
                return response()->json(['message' => 'Uploaded successfully']);
            }
        }
    }

    public function ViewProduct($product_id)
    {
        return Products::where(['id' => $product_id])->first();
    }

    public function UpdateProduct(Request $request, $product_id)
    {
        $product = Products::where(['id' => $product_id])->first();
        if ($product) {
            if ($request->file('image')) {
                $file = $request->file('image');
                $name = $file->hashName();
                $file->move(public_path('uploads'), $name);

                $updates = [
                    'price' => $request->price,
                    'name' => $request->name,
                    'description' => $request->description,
                    'image' => $name,
                    'categories_id' => $request->categories_id,
                    'user_id' => $request->user_id
                ];
            } else {
                $updates = [
                    'price' => $request->price,
                    'name' => $request->name,
                    'description' => $request->description,
                    'categories_id' => $request->categories_id,
                    'user_id' => $request->user_id
                ];
            }

            $product->update($updates);
            return response()->json(['message' => 'Product updated successfully']);
        }
    }

    public function DropProduct($product_id)
    {
        $product = Products::where(['id' => $product_id])->first();
        $product->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function ViewMyProducts($user_id)
    {
        $mine = Products::where(['user_id' => $user_id])->get();
        return response()->json(['product' => $mine]);
    }
}
