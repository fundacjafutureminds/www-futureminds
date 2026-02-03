interface DecorativeTriangleProps {
  flip?: boolean;
  className?: string;
}

export function DecorativeTriangle({
  flip = false,
  className = "",
}: DecorativeTriangleProps) {
  return (
    <div
      className={`absolute left-0 right-0 h-16 overflow-hidden ${
        flip ? "top-0 rotate-180" : "bottom-0"
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <polygon
          points="0,60 600,0 1200,60"
          className="fill-fm-green"
        />
      </svg>
    </div>
  );
}
