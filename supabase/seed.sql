-- Create the workflow_dag table if it doesn't exist
CREATE TABLE IF NOT EXISTS workflow_dag (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    nodes JSONB NOT NULL,
    edges JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample workflows
INSERT INTO workflow_dag (name, description, nodes, edges) VALUES
(
    'Data Ingestion Workflow',
    'A workflow for ingesting data from various sources',
    '[
        {"id": "1", "type": "source", "position": {"x": 100, "y": 100}, "data": {"label": "API Source"}},
        {"id": "2", "type": "process", "position": {"x": 300, "y": 100}, "data": {"label": "Data Cleaning"}},
        {"id": "3", "type": "destination", "position": {"x": 500, "y": 100}, "data": {"label": "Database"}}
    ]'::jsonb,
    '[
        {"id": "e1-2", "source": "1", "target": "2"},
        {"id": "e2-3", "source": "2", "target": "3"}
    ]'::jsonb
),
(
    'ETL Pipeline',
    'Extract, Transform, Load pipeline for data warehousing',
    '[
        {"id": "1", "type": "source", "position": {"x": 100, "y": 100}, "data": {"label": "Data Lake"}},
        {"id": "2", "type": "process", "position": {"x": 300, "y": 50}, "data": {"label": "Extract"}},
        {"id": "3", "type": "process", "position": {"x": 300, "y": 150}, "data": {"label": "Transform"}},
        {"id": "4", "type": "destination", "position": {"x": 500, "y": 100}, "data": {"label": "Data Warehouse"}}
    ]'::jsonb,
    '[
        {"id": "e1-2", "source": "1", "target": "2"},
        {"id": "e2-3", "source": "2", "target": "3"},
        {"id": "e3-4", "source": "3", "target": "4"}
    ]'::jsonb
),
(
    'Machine Learning Pipeline',
    'Workflow for training and deploying machine learning models',
    '[
        {"id": "1", "type": "source", "position": {"x": 100, "y": 100}, "data": {"label": "Training Data"}},
        {"id": "2", "type": "process", "position": {"x": 300, "y": 100}, "data": {"label": "Feature Engineering"}},
        {"id": "3", "type": "process", "position": {"x": 500, "y": 100}, "data": {"label": "Model Training"}},
        {"id": "4", "type": "process", "position": {"x": 700, "y": 100}, "data": {"label": "Model Evaluation"}},
        {"id": "5", "type": "destination", "position": {"x": 900, "y": 100}, "data": {"label": "Model Deployment"}}
    ]'::jsonb,
    '[
        {"id": "e1-2", "source": "1", "target": "2"},
        {"id": "e2-3", "source": "2", "target": "3"},
        {"id": "e3-4", "source": "3", "target": "4"},
        {"id": "e4-5", "source": "4", "target": "5"}
    ]'::jsonb
);
