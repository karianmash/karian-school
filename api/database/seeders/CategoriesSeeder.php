<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'category_name' => 'Fashion',
            ],
            [
                'category_name' => 'Electronics',
            ],
            [
                'category_name' => 'Furniture',
            ],
            [
                'category_name' => 'Beauty',
            ],
            [
                'category_name' => 'Household care',
            ],
        ];

        foreach ($categories as $category) {
            Categories::create([
                'category_name' => $category['category_name'],
            ]);
        }
    }
}
