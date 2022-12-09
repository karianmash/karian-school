<?php
111
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function AllUsers($user)
    {
        $users = User::where('id', '!=', $user)->get();
        return response()->json(['users' => $users]);
    }
}
