import { defineType, defineField } from "sanity";

export default defineType({
  name: "collectionSection",
  title: "Collection Section",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Main Heading",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "collectionHandle",
      title: "Collection Handle",
      description: "Enter the Shopify collection handle (used to fetch products)",
      type: "string",
    }),
  ],
});
