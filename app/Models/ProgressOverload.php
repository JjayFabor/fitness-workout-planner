<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressOverload extends Model
{
    use HasFactory;

    protected $fillable = [
        'exercise_id',
        'sets',
        'reps',
        'rest_time',
        'weight',
    ];

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}
