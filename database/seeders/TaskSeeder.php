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
            'title' => 'Selesaikan Dokumentasi API',
            'description' => 'Dokumentasikan semua endpoint CRUD untuk Aplikasi ToDo.',
            'is_completed' => false,
            'priority' => 'High',
            'due_date' => now()->addDays(2),
        ]);
        \App\Models\Task::create([
            'category_id' => $workCategory->id,
            'title' => 'Rapat Tim',
            'description' => 'Pertemuan mingguan dengan tim pengembangan.',
            'is_completed' => false,
            'priority' => 'Medium',
            'due_date' => now()->addDays(1),
        ]);
        \App\Models\Task::create([
            'category_id' => $workCategory->id,
            'title' => 'Review Code Pull Request',
            'description' => 'Tinjau dan berikan feedback untuk PR dari anggota tim.',
            'is_completed' => false,
            'priority' => 'High',
            'due_date' => now()->addDays(0),
        ]);
        \App\Models\Task::create([
            'category_id' => $workCategory->id,
            'title' => 'Update Database Schema',
            'description' => 'Perbarui skema database untuk fitur baru.',
            'is_completed' => true,
            'priority' => 'Medium',
            'due_date' => now()->subDays(1),
        ]);

        $personalCategory = \App\Models\Category::where('name', 'Personal')->first();
        \App\Models\Task::create([
            'category_id' => $personalCategory->id,
            'title' => 'Belanja Bulanan',
            'description' => 'Beli bahan makanan untuk keperluan minggu ini.',
            'is_completed' => false,
            'priority' => 'Low',
            'due_date' => now()->addDays(3),
        ]);
        \App\Models\Task::create([
            'category_id' => $personalCategory->id,
            'title' => 'Olahraga Pagi',
            'description' => 'Jogging di taman selama 30 menit.',
            'is_completed' => true,
            'priority' => 'Medium',
            'due_date' => now()->addDays(0),
        ]);
        \App\Models\Task::create([
            'category_id' => $personalCategory->id,
            'title' => 'Bayar Tagihan Listrik',
            'description' => 'Bayar tagihan listrik bulan ini sebelum jatuh tempo.',
            'is_completed' => false,
            'priority' => 'High',
            'due_date' => now()->addDays(5),
        ]);
        \App\Models\Task::create([
            'category_id' => $personalCategory->id,
            'title' => 'Baca Buku',
            'description' => 'Lanjutkan membaca buku "Atomic Habits" minimal 2 bab.',
            'is_completed' => false,
            'priority' => 'Low',
            'due_date' => now()->addDays(7),
        ]);

        $studyCategory = \App\Models\Category::where('name', 'Study')->first();
        if ($studyCategory) {
            \App\Models\Task::create([
                'category_id' => $studyCategory->id,
                'title' => 'Belajar React Hooks',
                'description' => 'Pelajari useState, useEffect, dan custom hooks.',
                'is_completed' => false,
                'priority' => 'High',
                'due_date' => now()->addDays(4),
            ]);
            \App\Models\Task::create([
                'category_id' => $studyCategory->id,
                'title' => 'Kerjakan Tugas Laravel',
                'description' => 'Selesaikan assignment tentang Eloquent Relationships.',
                'is_completed' => false,
                'priority' => 'High',
                'due_date' => now()->addDays(2),
            ]);
            \App\Models\Task::create([
                'category_id' => $studyCategory->id,
                'title' => 'Tonton Tutorial Database',
                'description' => 'Tonton video tentang optimasi query database.',
                'is_completed' => true,
                'priority' => 'Medium',
                'due_date' => now()->subDays(2),
            ]);
        }
    }
}
