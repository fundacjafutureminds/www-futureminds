"use client";

import { useRef, useMemo, useCallback } from "react";
import { gsap, useGSAP } from "@/lib/gsap-init";
import pathData from "./handwrite-paths.json";

interface CharData {
  paths: string[];
  width: number;
}

interface CharMapData {
  charMap: Record<string, CharData>;
}

const data = pathData as CharMapData;

interface TextRevealProps {
  /** Text to animate — use \n for line breaks */
  text: string;
  /** CSS classes applied to the root wrapper */
  className?: string;
  /** Seconds to draw one character's stroke */
  charDuration?: number;
  /** Stagger delay between characters */
  charStagger?: number;
  /** SVG line height in font units (matches font UPM) */
  lineHeight?: number;
}

export function TextReveal({
  text,
  className,
  charDuration = 1.2,
  charStagger = 0.08,
  lineHeight = 200,
}: TextRevealProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Calculate SVG layout from font path data
  const layout = useMemo(() => {
    const lines = text.split("\n");
    const gap = lineHeight * 0.15;

    let globalCharIdx = 0;
    const lineLayouts = lines.map((lineText) => {
      let xOffset = 0;
      const chars = Array.from(lineText).map((ch) => {
        const charData = data.charMap[ch];
        const width = charData?.width ?? lineHeight * 0.3;
        const result = {
          char: ch,
          paths: (charData?.paths ?? []).filter((p) => p.startsWith("M")),
          x: xOffset,
          width,
          globalIdx: globalCharIdx,
        };
        xOffset += width;
        globalCharIdx++;
        return result;
      });
      return { chars, width: xOffset };
    });

    const totalWidth = Math.max(...lineLayouts.map((l) => l.width));
    const totalHeight = lines.length * lineHeight + (lines.length - 1) * gap;

    return { lineLayouts, totalWidth, totalHeight, gap };
  }, [text, lineHeight]);

  // GSAP stroke-draw animation
  useGSAP(
    () => {
      const paths = svgRef.current?.querySelectorAll<SVGPathElement>(".draw-path");
      if (!paths?.length) return;

      // Set initial state: each path hidden via stroke-dashoffset
      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 1,
        });
      });

      // Show SVG now that paths are ready
      gsap.set(svgRef.current, { visibility: "visible" });

      // Build timeline for sequential character drawing
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 85%",
        },
      });

      // Group paths by character index and animate each group
      const charGroups = new Map<number, SVGPathElement[]>();
      paths.forEach((path) => {
        const idx = Number(path.dataset.charIdx);
        if (!charGroups.has(idx)) charGroups.set(idx, []);
        charGroups.get(idx)!.push(path);
      });

      const sortedIndices = Array.from(charGroups.keys()).sort((a, b) => a - b);
      sortedIndices.forEach((charIdx, i) => {
        const charPaths = charGroups.get(charIdx)!;
        tl.to(
          charPaths,
          {
            strokeDashoffset: 0,
            duration: charDuration,
            ease: "power2.inOut",
            stagger: 0.05,
          },
          i * charStagger
        );
      });
    },
    { scope: svgRef }
  );

  const ariaLabel = text.replace(/\n/g, " ");

  return (
    <div className={className}>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${layout.totalWidth.toFixed(0)} ${layout.totalHeight.toFixed(0)}`}
        className="w-full h-auto"
        aria-label={ariaLabel}
        style={{ visibility: "hidden" }}
      >
        {layout.lineLayouts.map((line, lineIdx) => (
          <g
            key={lineIdx}
            transform={`translate(0, ${lineIdx * (lineHeight + layout.gap)})`}
          >
            {line.chars.map((charLayout) => (
              <g
                key={charLayout.globalIdx}
                transform={`translate(${charLayout.x}, 0)`}
              >
                {charLayout.paths.map((d, pathIdx) => (
                  <path
                    key={pathIdx}
                    className="draw-path"
                    data-char-idx={charLayout.globalIdx}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
