import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState 
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Data Ingestion' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'Data Cleaning' } },
  { id: '3', position: { x: 400, y: 0 }, data: { label: 'Feature Engineering' } },
  { id: '4', position: { x: 400, y: 200 }, data: { label: 'Model Training' } },
  { id: '5', position: { x: 600, y: 100 }, data: { label: 'Model Evaluation' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e4-5', source: '4', target: '5' },
];

const WorkflowDAG = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default WorkflowDAG;
