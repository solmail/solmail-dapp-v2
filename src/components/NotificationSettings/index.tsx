import React from "react";
import { Flex, FormControl, Switch } from "@chakra-ui/react";
import { Setting } from "@components/SettingsContainer";
import { useNotification } from "@hooks/useNotification";

export const NotificationSettings: React.FC = () => {
  const { enabled, requestPermisson } = useNotification();

  return (
    <Flex w="100%" direction="column">
      <Setting info="Stay updated with instant alerts." title="Notifications">
        <FormControl display="flex" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            id="email-alerts"
            isChecked={enabled}
            onChange={requestPermisson}
          />
        </FormControl>
      </Setting>
    </Flex>
  );
};
