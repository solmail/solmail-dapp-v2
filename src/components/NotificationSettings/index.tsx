import React from "react";
import { Flex, FormControl, Spinner, Switch } from "@chakra-ui/react";
import { Setting } from "@components/SettingsContainer";
import { useFCMNotifications } from "@hooks/useFCMNotifications";

export const NotificationSettings: React.FC = () => {
  const { isRegistered, requestPemisson, isRegistering, unregister } =
    useFCMNotifications(!1);
  const onClickHandler = () => {
    if (!isRegistering) {
      if (!isRegistered) {
        requestPemisson();
      } else {
        unregister();
      }
    }
  };
  return (
    <Flex w="100%" direction="column">
      <Setting info="Stay updated with instant alerts." title="Notifications">
        <FormControl display="flex" alignItems="center">
          {isRegistering && <Spinner size={"md"} mr={2} />}
          <Switch
            colorScheme="green"
            size="lg"
            id="email-alerts"
            isChecked={isRegistered}
            onChange={onClickHandler}
          />
        </FormControl>
      </Setting>
    </Flex>
  );
};
