"use client";

import {
  DetailedProject,
  ProjectManagementList as initialList,
  ProjectSection,
} from "@/constants/tables/project-management-list";
import { ThreeIcon } from "@/features/icons";
import { useRef, useState } from "react";
import { ProjectEdit } from "./ProjectEdit";
import { ProjectView } from "./ProjectView";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";

const ItemType = { CARD: "CARD" };

export function ProjectDailyTaskCard() {
  const [openActionId, setOpenActionId] = useState<string | number | null>(
    null
  );
  const [editProject, setEditProject] = useState<DetailedProject | null>(null);
  const [showProject, setShowProject] = useState<DetailedProject | null>(null);
  const [projectList, setProjectList] = useState<ProjectSection[]>(initialList);

  const moveCard = (
    project: DetailedProject,
    fromId: number | string,
    toId: number | string
  ) => {
    if (fromId === toId) return;

    const fromIndex = projectList.findIndex((sec) => sec.id === fromId);
    const toIndex = projectList.findIndex((sec) => sec.id === toId);
    if (fromIndex === -1 || toIndex === -1) return;

    const fromProjectIndex = projectList[fromIndex].projects.findIndex(
      (p) => p.id === project.id
    );
    if (fromProjectIndex === -1) return;

    const updatedList = update(projectList, {
      [fromIndex]: {
        projects: {
          $splice: [[fromProjectIndex, 1]],
        },
      },
      [toIndex]: {
        projects: {
          $push: [project],
        },
      },
    });

    setProjectList(updatedList);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 bg-white rounded-xl">
          {projectList.map((section) => (
            <DroppableSection
              key={section.id}
              section={section}
              moveCard={moveCard}
              openActionId={openActionId}
              setOpenActionId={setOpenActionId}
              setEditProject={setEditProject}
              setShowProject={setShowProject}
            />
          ))}
        </div>

        {editProject && (
          <ProjectEdit
            project={editProject}
            onClose={() => setEditProject(null)}
          />
        )}
        {showProject && (
          <ProjectView
            project={showProject}
            onClose={() => setShowProject(null)}
          />
        )}
      </div>
    </DndProvider>
  );
}

type DroppableSectionProps = {
  section: ProjectSection;
  moveCard: (
    project: DetailedProject,
    fromId: number | string,
    toId: number | string
  ) => void;
  openActionId: string | number | null;
  setOpenActionId: (id: string | number | null) => void;
  setEditProject: (project: DetailedProject | null) => void;
  setShowProject: (project: DetailedProject | null) => void;
};

const DroppableSection: React.FC<DroppableSectionProps> = ({
  section,
  moveCard,
  openActionId,
  setOpenActionId,
  setEditProject,
  setShowProject,
}) => {
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    drop: (item: { project: DetailedProject; fromId: number | string }) =>
      moveCard(item.project, item.fromId, section.id),
  });

  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className="border border-[#D7D7D7] rounded-xl p-4 bg-[#f9f9f9]"
    >
      <div className="flex justify-between items-center mb-7 2xl:mb-10 px-2 py-2 sm:py-4 2xl:py-[1vw] border border-[#D7D7D7] bg-[#F8F8F8] rounded-lg">
        <h2 className="text-sm font-semibold lg:text-base 2xl:text-[1vw]">
          {section.title}
        </h2>
      </div>

      {section.projects.map((project) => (
        <DraggableCard
          key={project.id}
          project={project}
          fromId={section.id}
          isOpen={openActionId === project.id}
          setOpenActionId={setOpenActionId}
          setEditProject={setEditProject}
          setShowProject={setShowProject}
        />
      ))}
    </div>
  );
};

type DraggableCardProps = {
  project: DetailedProject;
  fromId: number | string;
  isOpen: boolean;
  setOpenActionId: (id: string | number | null) => void;
  setEditProject: (project: DetailedProject | null) => void;
  setShowProject: (project: DetailedProject | null) => void;
};

const DraggableCard: React.FC<DraggableCardProps> = ({
  project,
  fromId,
  isOpen,
  setOpenActionId,
  setEditProject,
  setShowProject,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType.CARD,
    item: { project, fromId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  

  const actions = [
    {
      label: "View",
      onClick: () => setShowProject(project),
      className: "text-blue-500",
    },
    {
      label: "Edit",
      onClick: () => setEditProject(project),
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: () => console.log("Delete clicked"),
      className: "text-red-500",
    },
  ];
  

  return drag (
    <div
      
      className={`relative rounded-xl p-4 mb-6 cursor-move text-[#1B1B1F] ${
        project.type === "summary" ? "border border-[#D7D7D7]" : "shadow-xl"
      }`}
      style={{
        backgroundColor: project.color,
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm 2xl:text-[1vw]">Project Name</p>
          <h3 className="text-sm font-medium mt-1 2xl:mt-[0.5vw] 2xl:text-[1vw]">
            {project.projectName}
          </h3>
        </div>
        <button onClick={() => setOpenActionId(isOpen ? null : project.id)}>
          <ThreeIcon className="w-5 h-5" />
        </button>
      </div>

      {project.type === "summary" && (
        <div className="flex justify-between mt-6 text-sm pt-5">
          <div>
            <p className="text-[0.7rem] 2xl:text-[0.8vw] 2xl:pb-2">Lead Name</p>
            <p className="text-xs font-medium 2xl:text-[0.9vw]">
              {project.leadName}
            </p>
          </div>
          <div>
            <p className="text-[0.7rem] 2xl:text-[0.8vw] 2xl:pb-2">
              Renewal Date
            </p>
            <p className="text-xs font-medium 2xl:text-[0.9vw]">
              {project.renewalDate}
            </p>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="absolute right-4 top-10 bg-white shadow-lg z-50 rounded border w-32">
          {actions.map((action, index) => (
            <button
              key={index}
              className={`block w-full px-4 text-sm py-2 text-left hover:bg-gray-100 ${action.className}`}
              onClick={(e) => {
                e.stopPropagation();
                setOpenActionId(null);
                action.onClick();
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
