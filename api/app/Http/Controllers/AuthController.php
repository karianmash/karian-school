<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function RegisterUser(Request $request)
    {
        $userdetails = Validator::make($request->all(), [
            'fname' => 'required',
            'lname' => 'required',
            'role' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
        ]);

        if ($userdetails->fails()) {
            return response()->json(['errors' => $userdetails->errors()]);
        } else {
            $data = [
                'first_name' => $request->fname,
                'role' => $request->role,
                'second_name' => $request->lname,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ];
            User::create($data);
            return response()->json(['message' => 'Regisered successfully, Please login']);
        }
    }

    public function LogUserIn(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validate->fails()) {
            return response()->json(['errors' => $validate->errors()]);
        }

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json(['errors' => $validate->errors(), 'message' => 'invalid credentials'], 201);
        }

        $user = $request->user();
        $token = $user->createToken($request->email)->plainTextToken;
        return response()->json(['token' => $token, 'user' => $user], 200);
    }

    public function GetAllUsers()
    {
        $users = DB::select('select * from users');
        return response()->json(['users' => $users]);
    }

    public function GetUsers($user_type)
    {
        $users = User::where(['role' => $user_type])->get();
        return response()->json(['users' => $users]);
    }

    public function GetUser($id)
    {
        $user = User::where(['id' => $id])->first();
        return response()->json(['user' => $user]);
    }

    public function deleteUser($id)
    {
        User::where(['id' => $id])->delete();
        return response()->json(['message' => 'success']);
    }

    public function updateUser(Request $request, $id)
    {
        $data = [
            'first_name' => $request->first_name,
            'second_name' => $request->second_name,
            'email' => $request->email,
        ];
        User::where(['id' => $id])->update($data);
        return response()->json(['message' => 'success']);
    }
}
