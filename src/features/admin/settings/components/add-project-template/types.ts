export interface Task {
  id: string;
  name: string;
  estimatedDays: string;
  description: string;
}

export interface Milestone {
  id: string;
  name: string;
  estimatedDays: string;
  description: string;
  tasks: Task[];
}

export interface ProjectTemplateFormValues {
  templateName: string;
  projectType: string;
  estimatedDays: string;
  description:string;
  milestones: Milestone[];
} 