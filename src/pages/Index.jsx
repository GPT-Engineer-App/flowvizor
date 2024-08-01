import React, { useState } from 'react';
import WorkflowDAG from '../components/WorkflowDAG';
import { useWorkflowDags } from '../integrations/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const { data: workflows, isLoading, error } = useWorkflowDags();

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading workflows...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load workflows: {error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Workflow Management Tool</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Workflows</h2>
          <ul className="space-y-2">
            {workflows.map((workflow) => (
              <li key={workflow.id}>
                <button
                  onClick={() => setSelectedWorkflow(workflow)}
                  className={`w-full text-left p-2 rounded ${
                    selectedWorkflow?.id === workflow.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                >
                  {workflow.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Workflow Visualization</h2>
          {selectedWorkflow ? (
            <WorkflowDAG nodes={selectedWorkflow.nodes} edges={selectedWorkflow.edges} />
          ) : (
            <p>Select a workflow to visualize</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
