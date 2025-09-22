import React, { useEffect, useRef, ReactNode } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";

type LazyViewProps = {
  children: ReactNode;
  pendingComponent?: ReactNode;
  rootMargin?: string;
  minH?: string | number;
};

export const LazyView: React.FC<LazyViewProps> = ({
  children,
  pendingComponent = null,
  rootMargin = "0px",
  minH = "0px",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onOpen();
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onOpen, rootMargin]);

  return (
    <Flex ref={ref} minH={minH} w="100%">
      {isOpen ? children : pendingComponent}
    </Flex>
  );
};
