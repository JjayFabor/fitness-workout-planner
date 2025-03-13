<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Exercise/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Exercises/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required|string',
            'description' => 'nullable|string',
        ]);

        Exercise::create($request->all());

        return redirect()->route('workout-plans.show', ['workout_plan' => $request->workout_plan_id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $workoutPlanId, string $exerciseId)
    {
        $exercise = Exercise::where('id', $exerciseId)
                        ->where('workout_plan_id', $workoutPlanId)
                        ->with('progressiveOverloads')
                        ->firstOrFail();
        

        return Inertia::render('Exercises/Show', ['exercise' => $exercise]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
