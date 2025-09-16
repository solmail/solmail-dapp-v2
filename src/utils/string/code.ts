export const validateCode = (value: string) => {
  if (!value || !value.trim()) {
    return !0;
  }
  const regex = /^[A-Za-z0-9]{8}$/;
  return (
    regex.test(value) ||
    "Referral code must be exactly 8 alphanumeric characters"
  );
};
