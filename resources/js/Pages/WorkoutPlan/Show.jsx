import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import Layout from "@/Layout/Layout";
import { route } from "ziggy-js";
import React, { useState } from "react";
import CreateModal from "../Exercises/CreateModal";

const Show = ({ workoutPlan }) => {


  const [isCreateExerciseModalOpen, setIsCreateExerciseModalOpen] = useState(false);
  
  const openCreateExerciseModal = () => {
    setIsCreateExerciseModalOpen(true);
  }

  const closeWorkoutPlanModal = () => {
    setIsCreateExerciseModalOpen(false);
  }


  // Ensure workoutPlan exists before trying to access its properties
  if (!workoutPlan) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold text-gray-900">Workout Plan Not Found</h1>
          <p className="text-gray-600 mt-2">The requested workout plan does not exist.</p>
          <Link
            href={route("workout-plans.index")}
            className="text-gray-500 px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Back
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">{workoutPlan.name}</h1>
        <p className="text-gray-600 mt-2">{workoutPlan.description}</p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">Exercises</h2>

          {workoutPlan.exercises && workoutPlan.exercises.length > 0 ? (
            <ul className="mt-4 space-y-3">
              {workoutPlan.exercises.map((exercise) => (
                <li
                  key={exercise.id}
                  className="p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition duration-200 cursor-pointer"
                >
                  <Link href={`/workout-plans/${workoutPlan.id}/exercises/${exercise.id}`} className="block">
                    <span className="font-medium">{exercise.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No exercises yet.</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Button 
            variant="outline" 
            onClick={openCreateExerciseModal}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <span className="mr-1">+</span> Add Exercise
          </Button>

          <CreateModal isOpen={isCreateExerciseModalOpen} onClose={closeWorkoutPlanModal} workoutPlanId={workoutPlan.id}></CreateModal>
          <Link
            href={route("workout-plans.index")}
            className="text-gray-500 px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Back
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Show;
