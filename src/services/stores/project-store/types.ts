import { Milestone } from "@/features/admin/project-management/components/add-project/components/step-2-milestone-setup/Step2MilestoneSetup";

import { ProjectRenewalType } from "@/services";

export interface IAddProjectFormValues {
  client_id?: string;
  name: string;
  description?: string;
  project_type?: string;
  budget?: number | string;
  estimated_cost?: number | string;
  cost_of_labour?: number | string;
  overhead_cost?: number | string;
  extra_cost?: number | string;
  start_date?: string;
  end_date?: string;
  template_id?: string | null;
  renewal_type?: ProjectRenewalType | null;
  renewal_date?: string;
  is_renewal?: boolean;
  milestoneOption: string;
}

export interface IProjectCreationState {
  // Step management
  currentStep: number;
  
  // Form data
  basicInfo: IAddProjectFormValues | null;
  milestones: Milestone[];
  milestoneOption: string;
  selectedProjectTemplate: string;
  
  // File management
  uploadedFiles: File[];
  uploadedFileUrls: string[];
  
  // Actions
  setCurrentStep: (step: number) => void;
  setBasicInfo: (info: IAddProjectFormValues) => void;
  setMilestones: (milestones: Milestone[] | ((prev: Milestone[]) => Milestone[])) => void;
  addMilestone: (milestone: Milestone) => void;
  updateMilestone: (id: string, milestone: Milestone) => void;
  removeMilestone: (id: string) => void;
  setMilestoneOption: (option: string) => void;
  setSelectedProjectTemplate: (templateId: string) => void;
  setUploadedFiles: (files: File[]) => void;
  setUploadedFileUrls: (urls: string[]) => void;
  
  // Navigation
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  
  // Reset
  resetProjectCreation: () => void;
  clearProjectCreation: () => void;
}
