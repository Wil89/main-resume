export interface ExperienceProps {
  title: string;
  company?: string;
  location?: string;
  dates?: string;
  description?: string;
  texts: string[];
  stack?: string[];
}

export function Experience({
  title,
  company,
  location,
  dates,
  description,
  texts,
  stack,
}: ExperienceProps) {
  return (
    <div className="flex flex-col justify-start pb-4">
      <div className="">
        <h2 className="text-neon-pink text-lg sm:text-xl font-bold">
          {title}
          {company && <span>&nbsp;&middot;&nbsp;{company}</span>}
          {location && <span>&nbsp;&middot;&nbsp;{location}</span>}
        </h2>
        <div className="border-none sm:border-l sm:border-gray-400 py-2 pl-4 pr-0 sm:px-10 mx-0 sm:mx-2 my-4 mb-0 pb-0">
          {dates && (
            <div>
              <p className="text-neon-blue text-lg sm:text-xl font-bold">
                &nbsp;&middot;&nbsp; {dates}
              </p>
              {description && (
                <div className="border-none sm:border-l sm:border-gray-400 py-2 px-0 sm:px-10 mx-0 sm:mx-4 my-2 mb-0 pb-0">
                  <p className="text-neon-blue text-lg sm:text-xl font-bold">
                    {description}
                  </p>
                  <div className="border-l border-gray-400 py-2 pl-4 pr-0 sm:px-10 ml-2 mr-0 sm:mx-4 my-2 mb-0 pb-0">
                    {texts.map((t) => (
                      <p
                        key={t.substring(0, 10)}
                        className="text-neon-blue text-lg sm:text-xl font-bold mb-4"
                      >
                        {t}
                      </p>
                    ))}
                    {stack && (
                      <p className="text-neon-green text-lg sm:text-xl font-bold">
                        Stack: {stack.join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {!description && (
                <div className="border-l border-gray-400 py-2 pl-4 pr-0 sm:px-10 ml-2 mr-0 sm:mx-4 my-2 mb-0 pb-0">
                  {texts.map((t) => (
                    <p
                      key={t.substring(0, 10)}
                      className="text-neon-blue text-lg sm:text-xl font-bold mb-4"
                    >
                      {t}
                    </p>
                  ))}
                  {stack && (
                    <p className="text-neon-green text-lg sm:text-xl font-bold">
                      Stack: {stack.join(" · ")}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
