import { createZustandStore } from "../../zustand";
import { IProjectCreationState } from "./types";
import {
  setCurrentStepCallback,
  setBasicInfoCallback,
  setMilestonesCallback,
  addMilestoneCallback,
  updateMilestoneCallback,
  removeMilestoneCallback,
  setMilestoneOptionCallback,
  setSelectedProjectTemplateCallback,
  setUploadedFilesCallback,
  setUploadedFileUrlsCallback,
  goToNextStepCallback,
  goToPreviousStepCallback,
  resetProjectCreationCallback,
  clearProjectCreationCallback,
} from "./callbacks";

/**
 * This store manages the project creation state across all steps
 * and persists data during navigation between steps
 */
export const useProjectStore = createZustandStore<IProjectCreationState>((set) => {
  return {
    // Initial state
    currentStep: 1,
    basicInfo: null,
    milestones: [],
    milestoneOption: "milestone",
    selectedProjectTemplate: "",
    uploadedFiles: [],
    uploadedFileUrls: [],

    // Actions
    setCurrentStep: setCurrentStepCallback(set),
    setBasicInfo: setBasicInfoCallback(set),
    setMilestones: setMilestonesCallback(set),
    addMilestone: addMilestoneCallback(set),
    updateMilestone: updateMilestoneCallback(set),
    removeMilestone: removeMilestoneCallback(set),
    setMilestoneOption: setMilestoneOptionCallback(set),
    setSelectedProjectTemplate: setSelectedProjectTemplateCallback(set),
    setUploadedFiles: setUploadedFilesCallback(set),
    setUploadedFileUrls: setUploadedFileUrlsCallback(set),
    
    // Navigation
    goToNextStep: goToNextStepCallback(set),
    goToPreviousStep: goToPreviousStepCallback(set),
    
    // Reset
    resetProjectCreation: resetProjectCreationCallback(set),
    clearProjectCreation: clearProjectCreationCallback(set),
  };
});
