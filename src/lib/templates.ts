'use client';

// Template data source of truth
export interface Template {
  id: string;
  name: string;
  templateId: string;
  flowParams?: { [key: string]: string }[];
}



export const eveonlineProfile = {
  id: "eveonline-profile",
  name: "Eve Online Profile",
  templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
};

export const eveonlineLogout: Template = {
  id: "eveonline-logout",
  name: "Eve Online Logout",
  templateId: process.env.NEXT_PUBLIC_LOGOUT_TEMPLATE_ID || "",
};



// All available templates
export const templates: Template[] = [
  eveonlineProfile,
  eveonlineLogout,
];

console.log("TEMPLATE_ID", JSON.stringify(templates, null, 2));

// Helper function to get template by ID
export const getTemplateById = (id: string): Template | undefined => {
  return templates.find((template) => template.id === id);
};

// Helper function to get template by templateId
export const getTemplateByTemplateId = (
  templateId: string
): Template | undefined => {
  return templates.find((template) => template.templateId === templateId);
};
