/**
 * Interface representing the structure of a Project Template detail object.
 */
export interface IProjectTemplateDetail {
  id: string;
  templateName: string;
  typeOfProject: string;
  estimatedDays: number;
  createdAt: string;
  updatedAt: string;
  description: string;
}

/**
 * Sample static list of project templates.
 * This can be used for mock rendering, prototyping, or development testing.
 */
export const projectTemplateDetails: IProjectTemplateDetail[] = [
  {
    id: "1",
    templateName: "E Commerce Project",
    typeOfProject: "Website",
    estimatedDays: 20,
    createdAt: "15-03-2022 10:00 AM",
    updatedAt: "15-03-2022 10:00 AM",
    description:
      "Nisha Sharma is an eCommerce project transforming online shopping. It focuses on user-friendly design and easy navigation, ensuring a secure and enjoyable experience.",
  },
  {
    id: "2",
    templateName: "Mobile App Development",
    typeOfProject: "Application",
    estimatedDays: 45,
    createdAt: "20-04-2023 11:30 AM",
    updatedAt: "25-04-2023 02:00 PM",
    description:
      "This mobile app project is built to provide seamless user experience on Android and iOS with offline support and intuitive navigation.",
  },
  {
    id: "3",
    templateName: "CRM System",
    typeOfProject: "Web App",
    estimatedDays: 60,
    createdAt: "05-01-2024 09:15 AM",
    updatedAt: "06-01-2024 10:45 AM",
    description:
      "An advanced CRM system to manage customer relationships, automate follow-ups, and track sales performance in real-time.",
  },
  {
    id: "4",
    templateName: "Portfolio Website",
    typeOfProject: "Website",
    estimatedDays: 10,
    createdAt: "01-07-2022 08:00 AM",
    updatedAt: "02-07-2022 08:00 AM",
    description:
      "A creative portfolio website for a designer to showcase projects, testimonials, and a contact form with sleek animations.",
  },
];
