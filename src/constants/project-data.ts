export interface ProjectInfo {
  name: string;
  type: string;
  contactPerson: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientInfo {
  clientName: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
}

export interface Estimates {
  estimatedStart: string;
  actualStart: string;
  estimatedEnd: string;
  actualEnd: string;
  estimatedCost: string;
  actualCost: string;
  labourCost: string;
  overheadCost: string;
}

export interface DocumentInfo {
  name: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Milestone {
  name: string;
  status: string;
}

export interface MilestoneGroup {
  open: Milestone[];
  inProgress: Milestone[];
  completed: Milestone[];
}

export interface IProjectData {
  slug: string;
  id: string;
  stage: string;
  title: string;
  status: string;
  progress: string;
  projectInfo: ProjectInfo;
  clientInfo: ClientInfo;
  estimates: Estimates;
  document: DocumentInfo;
  milestones: MilestoneGroup;
}

export const projectData: IProjectData[] = [
  {
    slug: "e-commerce-project",
    id: "#21042",
    title: "E Commerce Project",
    status: "Open",
    progress: "6 / 10",
    stage: "open",
    projectInfo: {
      name: "E Commerce Project",
      type: "Website",
      contactPerson: "Nisha Sharma",
      description:
        "Nisha Sharma is an eCommerce project transforming online shopping. It focuses on user-friendly design and easy navigation, ensuring a secure and enjoyable experience.",
      createdAt: "15-03-2022 10:00 AM",
      updatedAt: "15-03-2022 10:00 AM",
    },

    clientInfo: {
      clientName: "Nisha Sharma",
      companyName: "Schoenview",
      contactPerson: "Nisha Sharma",
      phone: "951-643-1584",
      email: "Alia.Dibbert@hotmail.com",
    },

    estimates: {
      estimatedStart: "24-02-2021 09:00 AM",
      actualStart: "24-02-2021 09:00 AM",
      estimatedEnd: "24-02-2021 09:00 AM",
      actualEnd: "24-02-2021 09:00 AM",
      estimatedCost: "$42,452.00",
      actualCost: "$72.00",
      labourCost: "$42.00",
      overheadCost: "$72.00",
    },

    document: {
      name: "RFP_Document.pdf",
      uploadedBy: "Nisha Sharma",
      uploadedAt: "15-03-2022 10:00 AM",
    },

    milestones: {
      open: [
        {
          name: "E-Commerce App Development",
          status: "0/10",
        },
        {
          name: "User Testing Phase",
          status: "0/10",
        },
      ],
      inProgress: [
        {
          name: "E-Commerce App Development",
          status: "8/10",
        },
        {
          name: "UI/UX Design Phase",
          status: "5/10",
        },
      ],
      completed: [
        {
          name: "E-Commerce App Development",
          status: "10/10",
        },
        {
          name: "User Authentication Feature",
          status: "10/10",
        },
        {
          name: "Payment Gateway Integration",
          status: "10/10",
        },
      ],
    },
  },
];
