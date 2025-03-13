<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->foreignId('workout_plan_id')->constrained()->onDelete('cascade'); // Link to Workout Plan
            $table->string('name'); // Exercise name
            $table->string('description')->nullable(); // Exercise description
            // $table->integer('sets');
            // $table->integer('reps');
            // $table->integer('rest_time'); // Rest time in seconds
            // $table->date('start_date'); // Start Date
            // $table->date('end_date'); // End Date
            // $table->enum('frequency', ['daily', 'twice_a_week', 'once_a_week']); // Frequency of Exercise
            // $table->enum('status', ['pending', 'in_progress', 'completed'])->default('pending'); // Status
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};
