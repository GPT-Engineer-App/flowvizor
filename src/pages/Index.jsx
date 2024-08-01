import React from 'react';
import WorkflowDAG from '../components/WorkflowDAG';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Workflow Management Tool</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Workflow Visualization</h2>
        <WorkflowDAG />
      </div>
    </div>
  );
};

export default Index;
