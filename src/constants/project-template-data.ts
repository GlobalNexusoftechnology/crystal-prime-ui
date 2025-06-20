/**
 * Interface for a project template card.
 */
export interface IProjectTemplate {
  id: string;
  templateName: string;
  milestoneCount: number;
  taskCount: number;
  estimatedDays: number;
  projectType: string;
}

/**
 * Array of project template data.
 */
export const projectTemplates: IProjectTemplate[] = [
  {
    id: "1",
    templateName: "E-Commerce App Development",
    milestoneCount: 20,
    taskCount: 20,
    estimatedDays: 20,
    projectType: "E Commerce",
  },
  {
    id: "2",
    templateName: "E-Commerce App Development",
    milestoneCount: 20,
    taskCount: 20,
    estimatedDays: 20,
    projectType: "E Commerce",
  },
  {
    id: "3",
    templateName: "E-Commerce App Development",
    milestoneCount: 20,
    taskCount: 20,
    estimatedDays: 20,
    projectType: "E Commerce",
  },
  {
    id: "4",
    templateName: "E-Commerce App Development",
    milestoneCount: 20,
    taskCount: 20,
    estimatedDays: 20,
    projectType: "E Commerce",
  },
  {
    id: "5",
    templateName: "E-Commerce App Development",
    milestoneCount: 20,
    taskCount: 20,
    estimatedDays: 20,
    projectType: "E Commerce",
  },
  {
    id: "6",
    templateName: "E-Commerce App Development",
    milestoneCount: 20,
    taskCount: 20,
    estimatedDays: 20,
    projectType: "E Commerce",
  },
];
