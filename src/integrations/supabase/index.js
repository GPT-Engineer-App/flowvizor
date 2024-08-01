import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### workflow_dag

| name        | type                    | format | required |
|-------------|-------------------------|--------|----------|
| id          | uuid                    | string | true     |
| name        | character varying(255)  | string | true     |
| description | text                    | string | false    |
| nodes       | jsonb                   | object | true     |
| edges       | jsonb                   | object | true     |
| created_at  | timestamp with time zone| string | true     |
| updated_at  | timestamp with time zone| string | true     |

*/

// Hooks for workflow_dag

export const useWorkflowDags = () => useQuery({
    queryKey: ['workflow_dags'],
    queryFn: () => fromSupabase(supabase.from('workflow_dag').select('*')),
});

export const useWorkflowDag = (id) => useQuery({
    queryKey: ['workflow_dag', id],
    queryFn: () => fromSupabase(supabase.from('workflow_dag').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddWorkflowDag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newDag) => fromSupabase(supabase.from('workflow_dag').insert([newDag])),
        onSuccess: () => {
            queryClient.invalidateQueries('workflow_dags');
        },
    });
};

export const useUpdateWorkflowDag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('workflow_dag').update(updateData).eq('id', id)),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries(['workflow_dag', variables.id]);
            queryClient.invalidateQueries('workflow_dags');
        },
    });
};

export const useDeleteWorkflowDag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('workflow_dag').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('workflow_dags');
        },
    });
};