import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import Layout from "@/Layout/Layout";
import { route } from "ziggy-js";
import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import CreateModal from "../Exercises/CreateModal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { PlusCircle } from "lucide-react";

const ShowExercise = ({ exercise }) => {
  const form = useForm({
    defaultValues: {
      exercise_id: exercise.id || "",
      sets: "",
      reps: "",
      rest_time: "",
      weight: "",
    }
  });
  
  const [trackingEntries, setTrackingEntries] = useState([]);
  const [showAddDateDialog, setShowAddDateDialog] = useState(false);
  const [newDate, setNewDate] = useState("");
  
  const addNewTrackingEntry = () => {
    if (!newDate) return;
    
    // Check if an entry with this date already exists
    const dateExists = trackingEntries.some(entry => entry.date === newDate);
    
    if (!dateExists) {
      setTrackingEntries([...trackingEntries, {
        id: Date.now().toString(),
        date: newDate,
        records: [{ id: "1", setNumber: 1, reps: "", weight: "", restTime: "" }]
      }]);
      setNewDate("");
      setShowAddDateDialog(false);
    } else {
      alert("An entry for this date already exists!");
    }
  };
  
  const addSetToEntry = (entryId) => {
    setTrackingEntries(trackingEntries.map(entry => {
      if (entry.id === entryId) {
        const newSetNumber = entry.records.length + 1;
        return {
          ...entry,
          records: [
            ...entry.records,
            { id: Date.now().toString(), setNumber: newSetNumber, reps: "", weight: "", restTime: "" }
          ]
        };
      }
      return entry;
    }));
  };
  
  const updateRecord = (entryId, recordId, field, value) => {
    setTrackingEntries(trackingEntries.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          records: entry.records.map(record => {
            if (record.id === recordId) {
              return { ...record, [field]: value };
            }
            return record;
          })
        };
      }
      return entry;
    }));
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-900">{exercise.name}</h1>
        <h4>{exercise.description}</h4>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Link
            href={route("workout-plans.show", { workout_plan: exercise.workout_plan_id })}
            className="text-gray-500 px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Back
          </Link>
        </div>
        
        {/* Add Progress Entry Button */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Progress Tracking</h2>
          {showAddDateDialog ? (
            <div className="flex items-center gap-4 mb-4">
              <input
                type="date"
                className="px-3 py-2 border rounded-md"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <Button 
                onClick={addNewTrackingEntry}
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Add
              </Button>
              <Button 
                onClick={() => setShowAddDateDialog(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setShowAddDateDialog(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
            >
              <PlusCircle size={16} /> Add New Training Day
            </Button>
          )}
        </div>
        
        {/* Progress Tracking Accordions */}
        {trackingEntries.length > 0 && (
          <div className="mt-4">
            <Accordion type="single" collapsible className="w-full">
              {trackingEntries.map((entry) => (
                <AccordionItem key={entry.id} value={entry.id}>
                  <AccordionTrigger className="text-left font-medium">
                    {entry.date}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Set</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reps</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight (kg/lbs)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rest Time (sec)</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {entry.records.map((record) => (
                            <tr key={record.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {record.setNumber}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="number"
                                  className="w-full px-2 py-1 text-sm border rounded-md"
                                  value={record.reps}
                                  onChange={(e) => updateRecord(entry.id, record.id, "reps", e.target.value)}
                                  placeholder="Reps"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="number"
                                  className="w-full px-2 py-1 text-sm border rounded-md"
                                  value={record.weight}
                                  onChange={(e) => updateRecord(entry.id, record.id, "weight", e.target.value)}
                                  placeholder="Weight"
                                />
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <input
                                  type="number"
                                  className="w-full px-2 py-1 text-sm border rounded-md"
                                  value={record.restTime}
                                  onChange={(e) => updateRecord(entry.id, record.id, "restTime", e.target.value)}
                                  placeholder="Rest time"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="mt-4 flex justify-end">
                        <Button
                          onClick={() => addSetToEntry(entry.id)}
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <PlusCircle size={14} /> Add Set
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ShowExercise;