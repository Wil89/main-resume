export interface EducationProps {
  title: string;
  location: string;
  centerName: string;
  dates: string;
  description?: string;
}

export function Education({
  title,
  location,
  centerName,
  dates,
  description,
}: EducationProps) {
  return (
    <div className="flex flex-col justify-start pb-4">
      <h2 className="text-lg sm:text-xl text-neon-blue font-bold">
        {title} {location && location}
      </h2>

      <div className="border-l border-gray-400 py-2 pl-4 pr-0 ml-2 mr-0 sm:px-10 sm:mx-4 my-2 mb-0 pb-0">
        <p className="text-lg sm:text-xl text-neon-blue font-bold mb-2">
          {centerName} &nbsp;&middot;&nbsp; {dates && dates}
        </p>
        {description && (
          <p className="text-neon-green text-lg sm:text-xl font-bold">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
