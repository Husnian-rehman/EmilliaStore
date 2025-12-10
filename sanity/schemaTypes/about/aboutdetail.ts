import { defineType, defineField } from "sanity";

export default defineType({
  name: "aboutDetailSection",
  title: "About Detail Section",
  type: "document",
  fields: [
    defineField({
      name: "mainHeading",
      title: "Main Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "leftImageOne",
      title: "Left Image - First",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "leftImageTwo",
      title: "Left Image - Second",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "rightTitle",
      title: "Right Side Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "rightDescription",
      title: "Right Side Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: "buttonLink",
      name: "buttonLink",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
  ],
});
