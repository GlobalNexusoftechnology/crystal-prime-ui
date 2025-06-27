export interface Task {
  id: string;
  title: string;
  estimated_days: string;
  description: string;
}
export interface Milestone {
  id: string;
  name: string;
  estimated_days: string;
  description: string;
  tasks: Task[];
}
export interface IProjectTemplateDetail {
  id: string;
  name: string;
  project_type: string;
  estimated_days: number;
  created_at: string;
  updated_at: string;
  description: string;
  milestones: Milestone[];
}

