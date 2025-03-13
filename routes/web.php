<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::resource('workout-plans', App\Http\Controllers\WorkoutPlanController::class);
Route::resource('workout-plans.exercises', App\Http\Controllers\ExerciseController::class);
