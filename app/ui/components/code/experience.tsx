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
        <h2 className="text-neon-pink text-xl font-bold">
          {title}
          {company && <span>&nbsp;&middot;&nbsp;{company}</span>}
          {location && <span>&nbsp;&middot;&nbsp;{location}</span>}
        </h2>
        <div className="border-l border-gray-400 py-2 px-10 mx-2 my-4 mb-0 pb-0">
          {dates && (
            <div>
              <p className="text-neon-blue text-xl font-bold">
                &nbsp;&middot;&nbsp; {dates}
              </p>
              {description && (
                <div className="border-l border-gray-400 py-2 px-10 mx-4 my-2 mb-0 pb-0">
                  <p className="text-neon-blue text-xl font-bold">
                    {description}
                  </p>
                  <div className="border-l border-gray-400 py-2 px-4 px-10 mx-4 my-2 mb-0 pb-0">
                    {texts.map((t) => (
                      <p
                        key={t.substring(0, 10)}
                        className="text-neon-blue text-xl font-bold mb-4"
                      >
                        {t}
                      </p>
                    ))}
                    {stack && (
                      <p className="text-neon-green text-xl font-bold">
                        Stack: {stack.join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {!description && (
                <div className="border-l border-gray-400 py-2 px-4 px-10 mx-4 my-2 mb-0 pb-0">
                  {texts.map((t) => (
                    <p
                      key={t.substring(0, 10)}
                      className="text-neon-blue text-xl font-bold mb-4"
                    >
                      {t}
                    </p>
                  ))}
                  {stack && (
                    <p className="text-neon-green text-xl font-bold">
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
