<?php

use App\Http\Controllers\AdvertisementsController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ClubsController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::post('auth/register', [AuthController::class, 'RegisterUser']);
Route::post('auth/login', [AuthController::class, 'LogUserIn']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // return $request->user();
    return Auth::user();
});

Route::controller(AuthController::class)->group(function () {
    Route::get('/users/{type}', 'GetUsers');
    Route::get('/user/{id}', 'GetUser');
    Route::post('user/update/{user_id}', 'updateUser');
    Route::delete('user/delete/{user_id}', 'deleteUser');
});

Route::controller(ProductsController::class)->group(function () {
    Route::post('product', 'store');
    Route::get('product/{id}', 'EditAdvert');
    Route::get('product/user/{user_id}', 'ViewMyProducts');
    Route::get('products', 'GetProducts');
    Route::post('product/{id}', 'UpdateProduct');
    Route::delete('product/{id}', 'DropProduct');
});

Route::controller(AdvertisementsController::class)->group(function () {
    Route::post('advert', 'SaveAdvert');
    Route::get('advert/{id}', 'ViewProduct');
    Route::get('adverts', 'GetallAdverts');
    Route::post('advert/{id}', 'UpdateAdvert');
    Route::delete('advert/{id}', 'DeleteAdvert');
    Route::get('advert/user/{user_id}', 'MyAdverts');
});

Route::controller(ClubsController::class)->group(function () {
    Route::post('club', 'StoreClub');
    Route::get('club/{id}', 'ViewClub');
    Route::get('clubs', 'GetClubs');
    Route::post('club/{id}', 'UpdateClub');
    Route::delete('club/{id}', 'DeleteClub');
    Route::get('club/{user_id}', 'GetMyClubs');
});

Route::controller(OrdersController::class)->group(function () {
    Route::post('order', 'AdOrder');
    Route::get('order/{transaction_id}', 'GetCart');
    Route::get('completed/{user_id}', 'GetMyAds');
    Route::post('checkout/{transaction_id}', 'checkout');
    Route::delete('order/{product_id}/{created_date}', 'deleteCart');
});

Route::controller(ChatController::class)->group(function () {
    Route::get('chat/{user_id}', 'AllUsers');
});
Auth::routes();
