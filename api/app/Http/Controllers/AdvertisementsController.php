<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use App\Models\Advertisements;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdvertisementsController extends Controller
{
    public function GetallAdverts()
    {
        return Advertisements::all();
    }

    public function SaveAdvert(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'image' => 'required|image',
            'detail' => 'required',
            'title' => 'required',
            'user_id' => 'required',
        ]);

        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()]);
        } else {
            if ($request->file('image')) {
                $file = $request->file('image');
                $name = $file->hashName();
                $file->move(public_path('uploads'), $name);

                $advert = [
                    'title' => $request->title,
                    'detail' => $request->detail,
                    'image' => $name,
                    'status' => 1,
                    'user_id' => $request->user_id,
                ];

                Advertisements::create($advert);
                return response()->json(['message' => 'Advert added successfully']);
            }
        }
    }

    public function EditAdvert($advert_id)
    {
        return Advertisements::where(['id' => $advert_id])->first();
    }

    public function BuyAdvert(Request $request)
    {
        $user_id = $request->user_id;
        $ad_id = $request->ad_id;

        Advertisements::where('id', $ad_id)->update(['user_id' => $user_id]);

        return response()->json(
            ['message' => 'Bought add successfully!']
        );
    }

    public function UpdateAdvert(Request $request, $ad_id)
    {
        $advert = Advertisements::where(['id' => $ad_id])->first();
        $valid = Validator::make($request->all(), [
            'detail' => 'required',
            'title' => 'required'
        ]);

        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()]);
        } else {
            if ($request->file('image')) {
                $file = $request->file('image');
                $name = $file->hashName();
                $file->move(public_path('uploads'), $name);

                $data = [
                    'title' => $request->title,
                    'detail' => $request->detail,
                    'image' => $name,
                ];
            } else {
                $data = [
                    'title' => $request->title,
                    'detail' => $request->detail,
                ];
            }
            $advert->update($data);
            return response()->json(['message' => 'Advert added successfully']);
        }
    }

    public function MyAdverts($user_id)
    {
        return Advertisements::where(['user_id' => $user_id])->get();
    }

    public function DeleteAdvert($id)
    {
        $ad = Advertisements::where(['id' => $id])->first();
        if ($ad) {
            $ad->delete();
            return response()->json(['message' => 'Deleted sucessfully']);
        } else {
            return response()->json(['message' => 'Could not find the product']);
        }
    }
}
