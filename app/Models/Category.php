<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Task;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'color_code',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
}
