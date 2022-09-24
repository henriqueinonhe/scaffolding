import { str, cleanEnv } from "envalid";

export const readServerEnv = () => {
  const serverEnvSchema = {
    REVALIDATE_SECRET: str(),
  };

  const serverEnvCandidate = {
    REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
  };

  return cleanEnv(serverEnvCandidate, serverEnvSchema);
};
