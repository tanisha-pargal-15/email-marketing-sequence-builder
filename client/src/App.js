import Auth from './Auth';
import React, { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  applyEdgeChanges,
  applyNodeChanges,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

const getNodeStyle = (id, selectedNodeId, baseColor) => ({
  padding: 10,
  background: baseColor,
  borderRadius: 5,
  boxShadow: id === selectedNodeId ? '0 0 10px 2px red' : 'none'
});

const nodeTypes = {
  coldEmail: ({ id, data }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      data.updateNode(id, { ...data, [name]: value });
    };

    return (
      <div style={getNodeStyle(data.id, data.selectedNodeId, '#f8d7da')}>
        <Handle type="target" position={Position.Top} />
        <strong>Cold Email</strong>
        <div>
          <label style={{ fontSize: 12 }}>Subject:</label>
          <input
            type="text"
            name="subject"
            value={data.subject || ''}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <label style={{ fontSize: 12 }}>Body:</label>
          <textarea
            name="body"
            value={data.body || ''}
            onChange={handleChange}
            rows={3}
            style={{ width: '100%' }}
          />
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  },

  delay: ({ id, data }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      data.updateNode(id, { ...data, [name]: value });
    };

    return (
      <div style={getNodeStyle(data.id, data.selectedNodeId, '#fff3cd')}>
        <Handle type="target" position={Position.Top} />
        <strong>Delay</strong>
        <div>
          <label style={{ fontSize: 12 }}>Minutes:</label>
          <input
            type="number"
            name="delay"
            value={data.delay || ''}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  },

  leadSource: ({ id, data }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      data.updateNode(id, { ...data, [name]: value });
    };

    return (
      <div style={getNodeStyle(data.id, data.selectedNodeId, '#d1ecf1')}>
        <Handle type="target" position={Position.Top} />
        <strong>Lead Source</strong>
        <div>
          <label style={{ fontSize: 12 }}>Name:</label>
          <input
            type="text"
            name="leadName"
            value={data.leadName || ''}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
          <label style={{ fontSize: 12 }}>Email:</label>
          <input
            type="email"
            name="leadEmail"
            value={data.leadEmail || ''}
            onChange={handleChange}
            style={{ width: '100%' }}
          />
        </div>
        <Handle type="source" position={Position.Bottom} />
      </div>
    );
  },
};

const buttonStyle = {
  padding: '8px 16px',
  fontSize: '14px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#007BFF',
  color: '#fff',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = (type) => {
    const id = uuidv4();
    const baseData = {
      label: `${type} block`,
      id,
      updateNode,
    };

    if (type === 'leadSource') {
      baseData.leadName = '';
      baseData.leadEmail = '';
    }
    if (type === 'coldEmail') {
      baseData.subject = '';
      baseData.body = '';
    }
    if (type === 'delay') {
      baseData.delay = '';
    }

    setNodes((nds) => [
      ...nds,
      {
        id,
        type,
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: baseData,
      },
    ]);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (selectedNodes.length > 0) {
          setNodes((nds) => nds.filter((node) => !selectedNodes.find((n) => n.id === node.id)));
        }
        if (selectedEdges.length > 0) {
          setEdges((eds) => eds.filter((edge) => !selectedEdges.find((e) => e.id === edge.id)));
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNodes, selectedEdges]);

  const updateNode = (id, newData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: { ...newData, updateNode } } : node))
    );
  };

  const handleSaveFlow = async () => {
    const flowData = {
      nodes,
      edges,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/save-flow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(flowData),
      });

      const result = await res.json();
      alert(result.message || 'Flow saved!');
    } catch (err) {
      console.error('Failed to save flow:', err);
      alert('Error saving flow');
    }
  };

  if (!token) {
    return <Auth setToken={setToken} />;
  }

  return (
    <div style={{ height: '100vh' }}>
      <div style={{ padding: 10, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button style={buttonStyle} onClick={() => {
          localStorage.removeItem('token');
          setToken(null);
        }}>
          Logout
        </button>

        <button style={buttonStyle} onClick={handleSaveFlow}>Save Flow</button>
        <button style={buttonStyle} onClick={() => addNode('coldEmail')}>Add Cold Email</button>
        <button style={buttonStyle} onClick={() => addNode('delay')}>Add Delay</button>
        <button style={buttonStyle} onClick={() => addNode('leadSource')}>Add Lead Source</button>
      </div>

      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            selectedNodeId: selectedNodeId
          }
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={(deleted) =>
          setNodes((nds) => nds.filter((node) => !deleted.some((d) => d.id === node.id)))
        }
        onEdgesDelete={(deleted) =>
          setEdges((eds) => eds.filter((edge) => !deleted.some((d) => d.id === edge.id)))
        }
        onSelectionChange={({ nodes, edges }) => {
          setSelectedNodes(nodes || []);
          setSelectedEdges(edges || []);
          setSelectedNodeId(nodes?.[0]?.id || null);
        }}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default App;
