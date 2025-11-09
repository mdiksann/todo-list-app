<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $workCategory = \App\Models\Category::where('name', 'Work')->first();
        \App\Models\Task::create([
            'category_id' => $workCategory->id,
            'title' => 'Finish API Documentation',
            'description' => 'Document all CRUD endpoints for the ToDo App.',
            'is_completed' => false,
            'priority' => 'High',
            'due_date' => now()->addDays(2), 
        ]);
        \App\Models\Task::create([
            'category_id' => $workCategory->id,
            'title' => 'Team Meeting',
            'description' => 'Weekly sync-up with the development team.',
            'is_completed' => false,
            'priority' => 'Medium',
            'due_date' => now()->addDays(1), 
        ]);

        $personalCategory = \App\Models\Category::where('name', 'Personal')->first();
        \App\Models\Task::create([
            'category_id' => $personalCategory->id,
            'title' => 'Grocery Shopping',
            'description' => 'Buy ingredients for the weekend dinner.',
            'is_completed' => false,
            'priority' => 'Low',
            'due_date' => now()->addDays(3), 
        ]);
    }
}
