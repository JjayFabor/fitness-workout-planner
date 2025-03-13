<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkoutPlan extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description'];

    public function exercises()
    {
        return $this->hasMany(Exercise::class);
    }
}
