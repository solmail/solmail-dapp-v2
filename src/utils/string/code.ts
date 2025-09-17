export const validateCode = (value: string) => {
  if (!value || !value.trim()) {
    return !0;
  }
  const regex = /^[A-Za-z0-9]/;
  return regex.test(value) || "Referral code must alphanumeric characters";
};
