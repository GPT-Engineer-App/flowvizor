import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  useNodesState, 
  useEdgesState 
} from 'reactflow';
import 'reactflow/dist/style.css';

const WorkflowDAG = ({ nodes: initialNodes, edges: initialEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges || []);

  React.useEffect(() => {
    setNodes(initialNodes || []);
    setEdges(initialEdges || []);
  }, [initialNodes, initialEdges]);

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
