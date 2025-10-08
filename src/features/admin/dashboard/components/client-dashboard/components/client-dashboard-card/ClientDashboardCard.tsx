interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  cardWidth?: string;
  onClick?: () => void;
}

export function ClientDashboardCard({
  title,
  description,
  icon,
  cardWidth = "w-[20rem] h-[10rem]",
  onClick,
}: CardProps) {
  return (
    <div
      className={`flex flex-col gap-2 bg-customGray shadow rounded-lg p-6 border border-gray-200 ${cardWidth} cursor-pointer hover:shadow-lg transition-shadow duration-200`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}