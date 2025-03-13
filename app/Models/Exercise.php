<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'workout_plan_id',
        'name',
        'description',
    ];

    public function workoutPlan() {
        return $this->belongsTo(WorkoutPlan::class);
    }

    public function progressiveOverloads()
    {
        return $this->hasMany(ProgressOverload::class);
    }
}
