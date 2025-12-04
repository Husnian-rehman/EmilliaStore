import { defineType, defineField } from "sanity";

export default defineType({
  name: "wishlistBreadcrumb",
  title: "Wishlist Breadcrumb Section",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Main Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
  ],
});
