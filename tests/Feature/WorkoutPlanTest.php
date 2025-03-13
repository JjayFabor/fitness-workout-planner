<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\WorkoutPlan;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\delete;
use Inertia\Testing\AssertableInertia as Assert;


uses(RefreshDatabase::class);

test('it displays a list of workout plans', function () {
    WorkoutPlan::factory()->count(3)->create();

    get(route('workout-plans.index'))
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => 
            $page->component('WorkoutPlan/Index')
                ->has('workoutPlans', 3) // Ensure only 3 records exist
        );
});


test('it can create a workout plan', function () {
    $data = [
        'name' => 'Full Body Strength',
        'description' => 'A workout for strength building.',
    ];

    post(route('workout-plans.store'), $data)
        ->assertRedirect(route('workout-plans.index')); // Redirect to index after storing

    assertDatabaseHas('workout_plans', ['name' => 'Full Body Strength']);
});


test('it shows a specific workout plan', function () {
    $plan = WorkoutPlan::factory()->create();

    get(route('workout-plans.show', $plan))
        ->assertStatus(200)
        ->assertInertia(fn ($page) =>
            $page->component('WorkoutPlan/Show')
                ->where('workoutPlan.id', $plan->id)
        );
});

test('it delete specific workout plan', function () {
    $plan = WorkoutPlan::factory()->create();  

    delete(route('workout-plans.destroy', $plan))
        ->assertStatus(302)
        ->assertRedirect(route('workout-plans.index'));
});