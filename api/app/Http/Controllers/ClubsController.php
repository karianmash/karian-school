<?php

namespace App\Http\Controllers;
11
use App\Models\Clubs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClubsController extends Controller
{
    public function GetClubs()
    {
        return Clubs::all();
    }

    public function StoreClub(Request $request)
    {
        $valid = Validator::make($request->all(), [
            'name' => 'required',
            'detail' => 'required',
            'image' => 'required|image',
            'user_id' => 'required',
        ]);

        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()]);
        } else {
            if ($request->file('image')) {
                $file = $request->file('image');
                $name = $file->hashName();
                $file->move(public_path('uploads'), $name);

                $club = [
                    'name' => $request->name,
                    'detail' => $request->detail,
                    'image' => $name,
                    'user_id' => $request->user_id,
                ];

                Clubs::create($club);
                return response()->json(['message' => 'Club added successfully']);
            }
        }
    }

    public function ViewClub($clubId)
    {
        return Clubs::where(['id' => $clubId])->first();
    }

    public function UpdateClub(Request $request, $club_id)
    {
        $valid = Validator::make($request->all(), [
            'name' => 'required',
            'detail' => 'required',
        ]);

        if ($valid->fails()) {
            return response()->json(['errors' => $valid->errors()]);
        } else {
            if ($request->file('image')) {
                $file = $request->file('image');
                $name = $file->hashName();
                $file->move(public_path('uploads'), $name);
                $club = [
                    'name' => $request->name,
                    'detail' => $request->detail,
                    'image' => $name,
                ];
            } else {
                $club = [
                    'name' => $request->name,
                    'detail' => $request->detail,
                ];
            }
            Clubs::where(['id' => $club_id])->update($club);
            return response()->json(['message' => 'Club added successfully']);
        }
    }

    public function DeleteClub($club_id)
    {
        Clubs::where(['id' => $club_id])->delete();
        return ['message' => 'Club deleted successfully'];
    }
    public function GetMyClubs($user_id)
    {
        return Clubs::where(['user_id' => $user_id])->get();
    }
}
