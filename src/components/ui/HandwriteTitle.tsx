"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import pathData from "./handwrite-paths.json";

// Typ danych z JSON - mapa znakow
interface CharData {
  paths: string[];
  width: number;
}

interface CharMapData {
  format: string;
  version: number;
  charMap: Record<string, CharData>;
}

interface HandwriteTitleProps {
  /** Tekst do wyrenderowania. Uzyj \n dla nowej linii. */
  text?: string;
  /** Sekundy na rysowanie jednego znaku */
  charDuration?: number;
  /** Opoznienie miedzy kolejnymi znakami (sekundy) */
  charStagger?: number;
  /** Poczatkowe opoznienie przed animacja (sekundy) */
  startDelay?: number;
  /** Wysokosc linii tekstu w jednostkach SVG (domyslnie 200) */
  lineHeight?: number;
  className?: string;
}

const data = pathData as CharMapData;

export function HandwriteTitle({
  text = "Programy\nedukacyjne",
  charDuration = 0.8,
  charStagger = 0.15,
  startDelay = 0.3,
  lineHeight = 200,
  className,
}: HandwriteTitleProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Oblicz wymiary viewBox i pozycje znakow
  const layout = useMemo(() => {
    const lines = text.split("\n");
    const gap = lineHeight * 0.15;

    let globalCharIdx = 0;
    const lineLayouts = lines.map((lineText) => {
      let xOffset = 0;
      const chars = Array.from(lineText).map((ch) => {
        const charData = data.charMap[ch];
        const width = charData?.width ?? lineHeight * 0.3; // fallback dla brakujacych znakow
        const result = {
          char: ch,
          paths: charData?.paths ?? [],
          x: xOffset,
          width,
          globalIdx: globalCharIdx,
        };
        xOffset += width;
        globalCharIdx++;
        return result;
      });

      return {
        chars,
        width: xOffset,
      };
    });

    const totalWidth = Math.max(...lineLayouts.map((l) => l.width));
    const totalHeight = lines.length * lineHeight + (lines.length - 1) * gap;

    return { lineLayouts, totalWidth, totalHeight, gap, totalChars: globalCharIdx };
  }, [text, lineHeight]);

  const renderPath = (
    d: string,
    charGlobalIdx: number,
    edgeIdx: number,
    edgeCount: number,
    keyPrefix: string
  ) => {
    const edgeDuration = charDuration / Math.max(edgeCount, 1);
    const charDelay = startDelay + charGlobalIdx * charStagger;

    return (
      <motion.path
        key={`${keyPrefix}-${charGlobalIdx}-${edgeIdx}`}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{
          pathLength: {
            duration: edgeDuration,
            delay: charDelay + edgeIdx * (edgeDuration * 0.3),
            ease: "easeInOut",
          },
        }}
      />
    );
  };

  // Generuj aria-label z tekstu (zamien \n na spacje)
  const ariaLabel = text.replace(/\n/g, " ");

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${layout.totalWidth.toFixed(0)} ${layout.totalHeight.toFixed(0)}`}
      className={className}
      aria-label={ariaLabel}
    >
      {layout.lineLayouts.map((line, lineIdx) => (
        <g
          key={`line-${lineIdx}`}
          transform={`translate(0, ${lineIdx * (lineHeight + layout.gap)})`}
        >
          {line.chars.map((charLayout) => (
            <g
              key={`char-${charLayout.globalIdx}`}
              transform={`translate(${charLayout.x}, 0)`}
            >
              {charLayout.paths.map((d, edgeIdx) =>
                renderPath(
                  d,
                  charLayout.globalIdx,
                  edgeIdx,
                  charLayout.paths.length,
                  `c`
                )
              )}
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}
