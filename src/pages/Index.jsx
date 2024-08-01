import React, { useState } from 'react';
import WorkflowDAG from '../components/WorkflowDAG';
import { useWorkflowDags, useAddWorkflowDag, useUpdateWorkflowDag, useDeleteWorkflowDag } from '../integrations/supabase';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { data: workflows, isLoading, error } = useWorkflowDags();
  const addWorkflowMutation = useAddWorkflowDag();
  const updateWorkflowMutation = useUpdateWorkflowDag();
  const deleteWorkflowMutation = useDeleteWorkflowDag();

  const handleCreateWorkflow = () => {
    const newWorkflow = {
      name: 'New Workflow',
      description: '',
      nodes: [],
      edges: []
    };
    addWorkflowMutation.mutate(newWorkflow, {
      onSuccess: (data) => {
        setSelectedWorkflow(data[0]);
        setEditMode(true);
      }
    });
  };

  const handleUpdateWorkflow = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedWorkflow = {
      id: selectedWorkflow.id,
      name: formData.get('name'),
      description: formData.get('description'),
      nodes: selectedWorkflow.nodes,
      edges: selectedWorkflow.edges
    };
    updateWorkflowMutation.mutate(updatedWorkflow, {
      onSuccess: (data) => {
        setSelectedWorkflow(data[0]);
        setEditMode(false);
      }
    });
  };

  const handleDeleteWorkflow = () => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      deleteWorkflowMutation.mutate(selectedWorkflow.id, {
        onSuccess: () => {
          setSelectedWorkflow(null);
        }
      });
    }
  };

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
          <Button onClick={handleCreateWorkflow} className="mb-4">Create New Workflow</Button>
          <ul className="space-y-2">
            {workflows.map((workflow) => (
              <li key={workflow.id}>
                <button
                  onClick={() => {
                    setSelectedWorkflow(workflow);
                    setEditMode(false);
                  }}
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
          <h2 className="text-xl font-semibold mb-4">Workflow Details</h2>
          {selectedWorkflow ? (
            editMode ? (
              <form onSubmit={handleUpdateWorkflow} className="space-y-4">
                <Input name="name" defaultValue={selectedWorkflow.name} placeholder="Workflow Name" />
                <Textarea name="description" defaultValue={selectedWorkflow.description} placeholder="Workflow Description" />
                <div className="flex space-x-2">
                  <Button type="submit">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                </div>
              </form>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{selectedWorkflow.name}</h3>
                <p className="mt-2">{selectedWorkflow.description}</p>
                <div className="mt-4 flex space-x-2">
                  <Button onClick={() => setEditMode(true)}>Edit</Button>
                  <Button variant="destructive" onClick={handleDeleteWorkflow}>Delete</Button>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Workflow Visualization</h4>
                  <WorkflowDAG nodes={selectedWorkflow.nodes} edges={selectedWorkflow.edges} />
                </div>
              </div>
            )
          ) : (
            <p>Select a workflow to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
