"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { projectData, IProjectData } from "@/constants";
import { MilestoneDetails } from "@/features";

function fetchMilestoneData(milestoneSlug: string): IProjectData | null {
  return projectData.find((project) => project.slug === milestoneSlug) || null;
}

type TBlogProjectParam = {
  milestoneId: string;
};

export default function MilestoneDetailsPage() {
  const { milestoneId: milestoneSlug } = useParams<TBlogProjectParam>();
  const [milestoneData, setMilestoneData] = useState<IProjectData | null>(null);

  useEffect(() => {
    if (milestoneSlug) {
      const data = fetchMilestoneData(milestoneSlug);
      console.log({ data });
      setMilestoneData(data);
    }
  }, [milestoneSlug]);

  if (!milestoneData) {
    return <div>Page Data Found</div>;
  }

  return <MilestoneDetails />;
}
