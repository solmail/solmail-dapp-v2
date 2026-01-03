import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
/* =========================
   Animations
========================= */

const gradientMove = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const scanMove = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  20% { opacity: 0.25; }
  100% { transform: translateY(-120%); opacity: 0; }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.25; }
  50% { opacity: 0.55; }
`;

const liveDot = keyframes`
  0% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.6); opacity: 1; }
  100% { transform: scale(1); opacity: 0.6; }
`;

/* =========================
   Component
========================= */

const SolanaLiveBackground: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* ================= Gradient Background ================= */}
      <Box
        position="absolute"
        inset={0}
        bgGradient={`
          linear(120deg,
            #0B1020,
            #1A1F2E,
            #14F1FF,
            #00FFA3
          )
        `}
        backgroundSize="300% 300%"
        animation={`${gradientMove} 18s ease infinite`}
        zIndex={0}
      />

      {/* ================= Vertical Scan Lines ================= */}
      {[...Array(7)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          left={`${i * 14 + 6}%`}
          top="100%"
          w="2px"
          h="140%"
          bg="linear-gradient(to top, transparent, #14F1FF, transparent)"
          opacity={0.18}
          animation={`${scanMove} ${6 + i}s linear infinite`}
          zIndex={1}
        />
      ))}

      {/* ================= Pulse Glow Overlay ================= */}
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(circle at center, #14F1FF33, transparent 70%)"
        animation={`${pulseGlow} 4s ease-in-out infinite`}
        zIndex={2}
      />

      {/* ================= Content ================= */}
      <Box position="relative" zIndex={3} px={6} py={5}>
        {/* Live Indicator */}
        <Flex align="center" gap={2} mb={4}>
          <Box
            w="8px"
            h="8px"
            bg="#00FFA3"
            borderRadius="full"
            animation={`${liveDot} 1.4s infinite`}
          />
          <Text
            fontSize="sm"
            color="#00FFA3"
            fontWeight="semibold"
            letterSpacing="wide"
          >
            LIVE · Refreshing Airdrops
          </Text>
        </Flex>

        {children}
      </Box>
    </Box>
  );
};

export default SolanaLiveBackground;
