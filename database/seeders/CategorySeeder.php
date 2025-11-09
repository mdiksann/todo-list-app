<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\Category::create(['name' => 'Work', 'color_code' => '#007bff']);
        \App\Models\Category::create(['name' => 'Personal', 'color_code' => '#28a745']);
        \App\Models\Category::create(['name' => 'Shopping', 'color_code' => '#ffc107']);
    }
}
