interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2
        className={`font-serif text-3xl font-bold md:text-4xl ${
          light ? "text-white" : "text-fm-dark"
        }`}
      >
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-fm-green" />
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-lg ${
            light ? "text-fm-gray-400" : "text-fm-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
