import { defineType, defineField } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    
    // Form Left Side Content
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "string",
    }),
    defineField({
      name: "formDescription",
      title: "Form Description",
      type: "text",
    }),
    defineField({
      name: "namePlaceholder",
      title: "Name Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "emailPlaceholder",
      title: "Email Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "phonePlaceholder",
      title: "Phone Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "messagePlaceholder",
      title: "Message Field Placeholder",
      type: "string",
    }),
    defineField({
      name: "buttonText",
      title: "Submit Button Text",
      type: "string",
    }),

    // Right column contact content
    defineField({
      name: "contactHeading",
      title: "Contact Info Heading",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "openingTime",
      title: "Opening Time",
      type: "string",
    }),

    // Social Icons Dynamic list
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Platform Name", type: "string" },
            {
              name: "icon",
              title: "Icon Image",
              type: "image",
              options: { hotspot: true },
            },
            { name: "url", title: "Profile URL", type: "url" },
          ],
        },
      ],
    }),
  ],
});
