import { profileData } from "@/data/profile";

export function whatsappDraft(message: string) {
  const url = new URL(profileData.whatsappUrl);
  url.searchParams.set("text", message);
  return url.toString();
}

export const firstContactUrl = whatsappDraft(
  "Hola, Matías. Vi tu web y quiero contarte cómo vendo hoy y qué me gustaría mejorar.",
);
