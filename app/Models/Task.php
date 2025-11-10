<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use app\Models\Category;

class Task extends Model
{
    use HasFactory;
    protected $table = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'is_completed',
        'category_id',
        'priority',
        'due_date',
    ];
    protected $casts = [
        'is_completed' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
