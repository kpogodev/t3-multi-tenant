import type { VercelAddDomainResponse, VercelDeleteDomainResponse  } from "types/vercel";
import { env } from "env/server.mjs";

export const addDomainToVercelProject = async (domain: string) => {
  try {
    const url = `https://api.vercel.com/v8/projects/${env.PROJECT_ID_VERCEL}/domains`;
    const config = {
      body: JSON.stringify({ name: domain }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.VERCEL_ACCESS_TOKEN_DEV}`,
      },
    };
    const response = await fetch(url, config);
    const data = (await response.json()) as VercelAddDomainResponse;

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDomainFromVercelProject = async (domain: string) => {
  try {
    const url = `https://api.vercel.com/v8/projects/${env.PROJECT_ID_VERCEL}/domains/${domain}`;
    const config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${env.VERCEL_ACCESS_TOKEN_DEV}`,
      },
    };
    const response = await fetch(url, config);
    const data = (await response.json()) as VercelDeleteDomainResponse;

    return data;
  } catch (error) {
    console.error(error);
  }
};


