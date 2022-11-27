<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertisements extends Model
{
    use HasFactory;
    protected $fillable = [
        'image', 'detail', 'title', 'status', 'user_id',
    ];
}
