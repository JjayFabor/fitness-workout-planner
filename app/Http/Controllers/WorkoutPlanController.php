<?php

namespace App\Http\Controllers;

use App\Models\WorkoutPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkoutPlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workoutPlans = WorkoutPlan::all();

        return Inertia::render(
            'WorkoutPlan/Index',
            ['workoutPlans' => $workoutPlans]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        WorkoutPlan::create($request->all());

        return redirect()->route('workout-plans.store');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workoutPlan = WorkoutPlan::find($id);
        $workoutPlan->load('exercises');
        
        return Inertia::render(
            'WorkoutPlan/Show',
            ['workoutPlan' => $workoutPlan]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $workoutPlan = WorkoutPlan::find($id);

        return Inertia::render(
            'WorkoutPlan/Edit',
            ['workoutPlan' => $workoutPlan]
        );        
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
        $workoutPlan = WorkoutPlan::findorFail($id);
        $workoutPlan->delete();
        
        return Inertia::location(route('workout-plans.index'));
    }
}
