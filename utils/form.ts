export const getBodyFromForm = (formData: FormData) =>
  JSON.stringify(Object.fromEntries(formData.entries()));
export const getPostInitFromForm = (formData: FormData): RequestInit => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: getBodyFromForm(formData),
});
