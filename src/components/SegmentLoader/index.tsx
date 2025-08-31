import React from "react";
import { Box, useToken } from "@chakra-ui/react";

type SegmentedCircularLoaderProps = {
  segments?: number;
  progress?: number;
  size?: number;
  thickness?: number;
  gapAngle?: number;
  trackColor?: string;
  activeColor?: string;
  roundedCaps?: boolean;
  spin?: boolean;
  snapToSegments?: boolean;
  ariaLabel?: string;
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (Math.PI / 180) * angleDeg;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export function SegmentedCircularLoader({
  segments = 12,
  progress = 0.0,
  size = 120,
  thickness = 10,
  gapAngle = 6,
  trackColor = "gray.200",
  activeColor = "teal.400",
  roundedCaps = true,
  spin = false,
  snapToSegments = false,
  ariaLabel = "segmented circular loader",
}: SegmentedCircularLoaderProps) {
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;

  // Resolve Chakra theme colors (hex values)
  const trackStroke = useToken("colors", trackColor);
  const activeStroke = useToken("colors", activeColor);

  const totalGap = gapAngle * segments;
  const segmentAngle = Math.max(0.0001, (360 - totalGap) / segments);

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const exact = clampedProgress * segments;
  const filledWhole = snapToSegments ? Math.round(exact) : Math.floor(exact);
  const partialFrac = snapToSegments ? 0 : exact - Math.floor(exact);

  const spinStyle: React.CSSProperties = spin
    ? { animation: "seg-spin 1.2s linear infinite" }
    : {};

  const cap = roundedCaps ? "round" : "butt";

  const paths: React.ReactNode[] = [];

  for (let i = 0; i < segments; i++) {
    const baseStart = -90 + i * (segmentAngle + gapAngle);
    const baseEnd = baseStart + segmentAngle;

    // Track path (always visible)
    const trackPath = describeArc(cx, cy, r, baseStart, baseEnd);
    paths.push(
      <path
        key={`t-${i}`}
        d={trackPath}
        fill="none"
        stroke={trackStroke}
        strokeWidth={thickness}
        strokeLinecap={cap as any}
        style={{ opacity: 0.28 }}
      />
    );

    // Active full segment
    if (i < filledWhole) {
      const activePath = describeArc(cx, cy, r, baseStart, baseEnd);

      const isLastActive =
        clampedProgress < 1 && i === filledWhole - 1 && partialFrac === 0;

      paths.push(
        <path
          key={`a-${i}`}
          d={activePath}
          fill="none"
          stroke={activeStroke}
          strokeWidth={thickness}
          strokeLinecap={cap as any}
          style={{
            transition: "stroke-dasharray 0.3s ease, opacity 0.3s ease",
            strokeDasharray: "1000",
            strokeDashoffset: "0",
            opacity: 1,
            animation: isLastActive ? "seg-blink 1s ease-in-out infinite" : "",
          }}
        />
      );
    }
    // Partial segment (if progress is not whole)
    else if (i === filledWhole && partialFrac > 0) {
      const partialEnd = baseStart + segmentAngle * partialFrac;
      const partialPath = describeArc(cx, cy, r, baseStart, partialEnd);

      const isLastActive = clampedProgress < 1;

      paths.push(
        <path
          key={`p-${i}`}
          d={partialPath}
          fill="none"
          stroke={activeStroke}
          strokeWidth={thickness}
          strokeLinecap={cap as any}
          style={{
            transition: "stroke-dasharray 0.3s ease, opacity 0.3s ease",
            strokeDasharray: "1000",
            strokeDashoffset: "0",
            opacity: 1,
            animation: isLastActive ? "seg-blink 1s ease-in-out infinite" : "",
          }}
        />
      );
    }
  }

  return (
    <Box
      as="span"
      role="img"
      aria-label={ariaLabel}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      w={`${size}px`}
      h={`${size}px`}
      position="relative"
      sx={{
        "@keyframes seg-spin": {
          to: { transform: "rotate(360deg)" },
        },
        "@keyframes seg-blink": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.2 },
        },
      }}
    >
      <Box as="span" position="absolute" inset={0} style={spinStyle}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <g>{paths}</g>
        </svg>
      </Box>
    </Box>
  );
}
