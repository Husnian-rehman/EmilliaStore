export default {
  name: "popup",
  title: "Newsletter Popup",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "discountText", title: "Discount Text", type: "string" },
    { name: "emailPlaceholder", title: "Email Placeholder", type: "string" },
    { name: "buttonText", title: "Button Text", type: "string" },
    { name: "checkboxText", title: "Checkbox Text", type: "string" },
    {
      name: "image",
      title: "Side Image",
      type: "image",
      options: { hotspot: true }
    }
  ]
};
