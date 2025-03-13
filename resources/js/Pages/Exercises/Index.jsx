import { Button } from "@/components/ui/button"
import Layout from "@/Layout/Layout"
import React, { useState } from "react";
import AddWorkoutPlanModal from "./components/AddWorkoutPlanModal";
import { router } from "@inertiajs/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const Index = ({ workoutPlans }) => {
  const [isAddWorkoutPlanModalOpen, setIsAddWorkoutPlanModalOpen] = useState(false);

  const openWorkoutPlanModal = () => {
    setIsAddWorkoutPlanModalOpen(true);
  }

  const closeWorkoutPlanModal = () => {
    setIsAddWorkoutPlanModalOpen(false);
  }

  const handleView = (id) => {
    router.get(`/workout-plans/${id}`);
  }

  const handleDelete = (id) => {
    router.delete(`/workout-plans/${id}`);
  }

  return (
    <Layout>    
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-4xl flex justify-between items-center my-8">
          <h2 className="text-2xl font-semibold text-gray-800">Exercises</h2>
          <Button 
            variant="outline" 
            onClick={openWorkoutPlanModal}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <span className="mr-1">+</span> + Add Exercise
          </Button>

          <AddWorkoutPlanModal isOpen={isAddWorkoutPlanModalOpen} onClose={closeWorkoutPlanModal} />
        </div>

        <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm overflow-hidden justify-between text-center">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader>
              <TableRow className="bg-gray-50 justify-between">
                <TableHead className="w-[250px] px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Workout Plan Name
                </TableHead>
                <TableHead className="px-6 py-3text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Description
                </TableHead>
                <TableHead className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center ">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-100">
              {workoutPlans.length > 0 ? (
                workoutPlans.map((plan) => (
                  <TableRow 
                    key={plan.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {plan.name}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-normal text-sm text-gray-500 line-clamp-2">
                      {plan.description}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-sm">
                      <Button 
                        variant="outline" 
                        className="text-xs bg-indigo-500 text-white hover:bg-indigo-600 hover:text-white mr-2"
                        onClick={() => handleView(plan.id)}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-xs bg-red-500 text-white hover:bg-red-600 hover:text-white"
                        onClick={() => handleDelete(plan.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="2" className="px-6 py-10 text-center text-sm text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <p>No workout plans found.</p>
                      <Button 
                        variant="outline" 
                        onClick={openWorkoutPlanModal}
                        className="mt-2 text-xs"
                      >
                        Create your first plan
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="py-2 px-4 bg-gray-50 text-xs text-left text-gray-500 border-t border-gray-200">
            {workoutPlans.length} plans total
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;