// Project basic information
export interface IProjectInfo {
  name: string;
  project_type: string;
  contact_person: string;
  description: string;
  created_at: string; 
  updated_at: string;
}

export interface ITaskInfo {
  title: string;
  assigned_to: string;
  description: string;
  created_at: string; 
  updated_at: string;
}

// Client information
export interface IClientInfo {
  client_name: string;
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
}

// Cost & timeline estimates
export interface IEstimates {
  start_date: string;
  end_date: string;
  actual_start: string;
  actual_end: string;
  estimated_cost: string;
  actual_cost: string;
  labour_cost: string;
  overhead_cost: string;
  budget: string;
}

// Document details
export interface IDocumentInfo {
  name: string;
  uploaded_by: string;
  created_at: string;
}
