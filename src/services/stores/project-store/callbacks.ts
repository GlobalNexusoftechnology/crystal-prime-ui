import { IProjectCreationState, IAddProjectFormValues } from "./types";
import { Milestone } from "@/features/admin/project-management/components/add-project/components/step-2-milestone-setup/Step2MilestoneSetup";

type TSetProjectState = (
  partial:
    | IProjectCreationState
    | Partial<IProjectCreationState>
    | ((state: IProjectCreationState) => IProjectCreationState | Partial<IProjectCreationState>),
  replace?: false | undefined
) => void;

export const setCurrentStepCallback = (set: TSetProjectState) => 
  (step: number) => {
    set({ currentStep: step });
  };

export const setBasicInfoCallback = (set: TSetProjectState) => 
  (info: IAddProjectFormValues) => {
    set({ basicInfo: info });
  };

export const setMilestonesCallback = (set: TSetProjectState) => 
  (milestones: Milestone[] | ((prev: Milestone[]) => Milestone[])) => {
    if (typeof milestones === 'function') {
      set((state) => ({ milestones: milestones(state.milestones) }));
    } else {
      set({ milestones });
    }
  };

export const addMilestoneCallback = (set: TSetProjectState) => 
  (milestone: Milestone) => {
    set((state) => ({
      milestones: [...state.milestones, milestone]
    }));
  };

export const updateMilestoneCallback = (set: TSetProjectState) => 
  (id: string, milestone: Milestone) => {
    set((state) => ({
      milestones: state.milestones.map(m => m.id === id ? milestone : m)
    }));
  };

export const removeMilestoneCallback = (set: TSetProjectState) => 
  (id: string) => {
    set((state) => ({
      milestones: state.milestones.filter(m => m.id !== id)
    }));
  };

export const setMilestoneOptionCallback = (set: TSetProjectState) => 
  (option: string) => {
    set({ milestoneOption: option });
  };

export const setSelectedProjectTemplateCallback = (set: TSetProjectState) => 
  (templateId: string) => {
    set({ selectedProjectTemplate: templateId });
  };

export const setUploadedFilesCallback = (set: TSetProjectState) => 
  (files: File[]) => {
    set({ uploadedFiles: files });
  };

export const setUploadedFileUrlsCallback = (set: TSetProjectState) => 
  (urls: string[]) => {
    set({ uploadedFileUrls: urls });
  };

export const goToNextStepCallback = (set: TSetProjectState) => 
  () => {
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 4)
    }));
  };

export const goToPreviousStepCallback = (set: TSetProjectState) => 
  () => {
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1)
    }));
  };

export const resetProjectCreationCallback = (set: TSetProjectState) => 
  () => {
    set({
      currentStep: 1,
      basicInfo: null,
      milestones: [],
      milestoneOption: "milestone",
      selectedProjectTemplate: "",
      uploadedFiles: [],
      uploadedFileUrls: [],
    });
  };

export const clearProjectCreationCallback = (set: TSetProjectState) => 
  () => {
    set({
      currentStep: 1,
      basicInfo: null,
      milestones: [],
      milestoneOption: "milestone",
      selectedProjectTemplate: "",
      uploadedFiles: [],
      uploadedFileUrls: [],
    });
  };
