import React, { useState, useEffect } from "react";
import { Flex, FormControl, Switch } from "@chakra-ui/react";
import { Setting } from "@components/SettingsContainer";

import { config } from "@const/config";
import { useToast } from "@hooks/useToast";

export const NotificationSettings: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const { showToast } = useToast();
  useEffect(() => {
    if (Notification.permission === "granted") {
      setEnabled(true);
    }
  }, []);

  const informUser = () => {
    sendSampleNotification({
      title: "✅ SolMail Ready",
      message:
        "You'll stay updated — notifications will appear for every new mail.",
    });
  };
  const handleToggle = async () => {
    if (!enabled) {
      if (Notification.permission === "granted") {
        setEnabled(true);
        informUser();
      } else {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          setEnabled(true);
          informUser();
        } else {
          showToast(
            "Looks like notifications are blocked. Don't worry — you can turn them on anytime in your browser settings.",
            {
              type: "error",
            }
          );
        }
      }
    } else {
      setEnabled(false);
    }
  };

  const sendSampleNotification = ({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: message,
        icon: config.logo,
      });
    }
  };

  return (
    <Flex w="100%" direction="column">
      <Setting
        info="Never share your private key or seed phrase with anyone."
        title="Notifications"
      >
        <FormControl display="flex" alignItems="center">
          <Switch
            colorScheme="green"
            size="lg"
            id="email-alerts"
            isChecked={enabled}
            onChange={handleToggle}
          />
        </FormControl>
      </Setting>
    </Flex>
  );
};
