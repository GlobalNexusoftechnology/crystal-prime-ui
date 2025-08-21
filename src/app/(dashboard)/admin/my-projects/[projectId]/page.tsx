import { ShowAllTickets } from "@/features";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function ShowAllTicketsPage({ params }: PageProps) {
  const { projectId } = await params;
  return <ShowAllTickets projectId={projectId} />;
}
