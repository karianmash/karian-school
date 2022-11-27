<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Orders extends Model
{
    use HasFactory;
    protected $fillable = [
        'transaction_id',
        'user_id',
        'amount',
        'products_id',
    ];

    /**
     * Get all of the product for the Orders
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function product(): HasMany
    {
        return $this->hasMany(Products::class, 'id', 'products_id');
    }
}
