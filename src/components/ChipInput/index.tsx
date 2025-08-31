import React, { useEffect, useMemo, useState } from "react";
import {
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Flex,
  Tooltip,
  Icon,
} from "@chakra-ui/react";
import { isValidAddress, shortenPrincipalId } from "@utils/string";
import { DOMAINS } from "@const/domain";
import { useFormContext } from "react-hook-form";
import { ComposerFormInputs } from "src/types/mail";
import { FieldWrapper } from "@components/Field";
import { IoInformationCircle } from "react-icons/io5";

const EmailChip: React.FC<{
  onClick: (label: string) => void;
  label: string;
}> = ({ label, onClick }) => {
  const { watch } = useFormContext<ComposerFormInputs>();
  const validations = watch("recipientValidation");
  const validation = useMemo(() => {
    return validations && validations.find((v) => v.username === label);
  }, [label, validations]);

  const error = validation && !validation.status;
  return (
    <Tooltip
      label={validation?.message ?? "Hello"}
      isDisabled={validation && validation.status}
      fontSize={12}
    >
      <Tag
        size="lg"
        borderRadius="full"
        variant="solid"
        colorScheme={validation && !validation.status ? "red" : "blue"}
        fontSize={"inherit"}
      >
        {error && (
          <Icon
            fontSize={15}
            position={"relative"}
            bottom={"1px"}
            as={IoInformationCircle}
          />
        )}
        <TagLabel>
          {isValidAddress(label) ? shortenPrincipalId(label) : label}
        </TagLabel>
        <TagCloseButton onClick={() => onClick(label)} />
      </Tag>
    </Tooltip>
  );
};
export const ChipInput: React.FC<{ name: keyof ComposerFormInputs }> = ({
  name,
}) => {
  const [inputValue, setInputValue] = useState("");
  const { register, watch, setValue } = useFormContext<ComposerFormInputs>();
  const chips = watch("to");

  useEffect(() => {
    register(name, {
      validate: (value) => {
        return (
          (value && Array.isArray(value) && value.length > 0) ||
          "At least one recipient is required"
        );
      },
    });
  }, [name, register]);

  const handleAddChip = (value: string) => {
    const emails: string[] = [];
    (value || "").split(",").forEach((user) => {
      const email = _handleAdd(user);
      if (email) {
        emails.push(email);
      }
    });

    setValue(name, [...chips, ...emails], {
      shouldValidate: true,
    });
  };
  const _handleAdd = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const isPubkey = isValidAddress(trimmed);
    const isSolDomain =
      trimmed.endsWith(".sol") || trimmed.endsWith(DOMAINS.DEFAULT);
    if (isPubkey || isSolDomain) {
      if (!chips.includes(trimmed)) {
        return trimmed;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddChip(inputValue);
      setInputValue("");
    }

    if (
      e.key.toLowerCase() === "backspace" &&
      !inputValue.trim() &&
      chips.length > 0
    ) {
      setValue(name, [...chips].slice(0, -1), {
        shouldValidate: true,
      });
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      handleAddChip(inputValue);
      setInputValue("");
    }
  };

  const removeChip = (chip: string) => {
    setValue(
      name,
      [...chips].filter((c) => c !== chip),
      {
        shouldValidate: true,
      }
    );
  };

  return (
    <FieldWrapper hasPadding={!1} name={name} label="" id={name}>
      <Flex
        w="100%"
        bg="surface.500"
        borderRadius="lg"
        p={"10px"}
        px="15px"
        fontSize={13}
        maxW={"100%"}
        overflow={"hidden"}
      >
        <HStack wrap="wrap" spacing={2} maxW={"100%"}>
          {chips.map((chip) => (
            <EmailChip key={chip} label={chip} onClick={removeChip} />
          ))}
          {chips.length < 5 && (
            <Input
              variant="unstyled"
              flex="1"
              placeholder="Enter public key or .sol domain"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              fontSize={"inherit"}
              minW={290}
            />
          )}
        </HStack>
      </Flex>
    </FieldWrapper>
  );
};
