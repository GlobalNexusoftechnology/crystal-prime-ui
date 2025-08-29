type Client = { id: string; name: string };
type Task = { id: string; title: string };
type Milestone = { id: string; name: string; tasks?: Task[] };
type Project = {
  id: string;
  name: string;
  client?: Client;
  milestones?: Milestone[];
};

export function buildIdToNameMapping(
  clients: Client[] = [],
  projects: Project[] = []
): Record<string, string> {
  const mapping: Record<string, string> = {};

  clients.forEach(client => {
    mapping[client.id] = client.name;
  });

  projects.forEach(project => {
    mapping[project.id] = project.name;
    if (project.client) {
      mapping[project.client.id] = project.client.name;
    }
    (project.milestones || []).forEach(milestone => {
      mapping[milestone.id] = milestone.name;
      (milestone.tasks || []).forEach(task => {
        mapping[task.id] = task.title;
      });
    });
  });

  return mapping;
}

/**
 * Universal helper: Given a project, milestone, or task object, extract all related entities and build the idToName mapping.
 * Pass the object you have (project, milestone, or task) and it will build the mapping for you.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildUniversalIdToNameMapping(entity: any): Record<string, string> {
  // If it's a project
  if (entity?.milestones && entity?.name && entity?.id) {
    return buildIdToNameMapping(
      entity.client ? [entity.client] : [],
      [entity]
    );
  }
  // If it's a milestone
  if (entity?.tasks && entity?.name && entity?.id && entity?.project) {
    return buildIdToNameMapping(
      entity.project?.client ? [entity.project.client] : [],
      [
        {
          ...entity.project,
          milestones: [entity],
        },
      ]
    );
  }
  // If it's a task
  if (entity?.title && entity?.id && entity?.milestone && entity?.milestone?.project) {
    return buildIdToNameMapping(
      entity.milestone.project?.client ? [entity.milestone.project.client] : [],
      [
        {
          ...entity.milestone.project,
          milestones: [
            {
              ...entity.milestone,
              tasks: [entity],
            },
          ],
        },
      ]
    );
  }
  // If it's a ticket
  if (entity?.title && entity?.id && entity?.project_id && entity?.project) {
    const mapping: Record<string, string> = {};
    
    // Add project mapping
    if (entity.project?.id && entity.project?.name) {
      mapping[entity.project.id] = entity.project.name;
    }
    
    // Add ticket mapping
    mapping[entity.id] = entity.title;
    
    // Add task mapping if available
    if (entity.task?.id && entity.task?.title) {
      mapping[entity.task.id] = entity.task.title;
    }
    
    // Add milestone mapping if available
    if (entity.task?.milestone?.id && entity.task?.milestone?.name) {
      mapping[entity.task.milestone.id] = entity.task.milestone.name;
    }
    
    return mapping;
  }
  // Fallback: empty mapping
  return {};
} 