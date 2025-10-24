import { Scrollbar } from "react-scrollbars-custom";
import { useEffect, useRef, type ReactNode } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { CustomEventType, EVENT_NAME, EventTypes } from "@utils/event";

export const CustomScrollbarWrapper: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const scrollbarRef = useRef<Scrollbar>(null);

  const scrollToTop = () => {
    scrollbarRef.current?.scrollToTop();
  };

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<CustomEventType>;
      if (customEvent.detail) {
        if (
          customEvent.detail.type === (EventTypes.inbox_reset_scroll as unknown)
        ) {
          scrollToTop();
        }
      }
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => {
      window.removeEventListener(EVENT_NAME, handler);
    };
  }, []);

  return (
    <Scrollbar
      disableTracksWidthCompensation
      style={{ width: "100%", height: "100%" }}
      removeTracksWhenNotUsed={!0}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      ref={scrollbarRef as any}
      trackYProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <span
            {...restProps}
            ref={elementRef}
            style={{
              ...style,
              width: isOpen ? 3 : 0,
              transition: "width 0.3s ease",
              backgroundColor: "transparent",
            }}
          />
        ),
      }}
      thumbYProps={{
        renderer: ({ elementRef, style, ...restProps }) => (
          <div
            {...restProps}
            ref={elementRef}
            style={{
              ...style,
              borderRadius: 4,
            }}
          />
        ),
      }}
    >
      {children}
    </Scrollbar>
  );
};
