import { defineType, defineField } from "sanity";

export default defineType({
  name: "marqueeBar",
  title: "Top Marquee Bar",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "heading",
              title: "Heading Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "iconSvg",
              title: "SVG Icon (Code)",
              type: "text",
              description: "Paste raw SVG code here",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "speed",
      title: "Scroll Speed (seconds)",
      type: "number",
      description: "Time in seconds for one full loop. Smaller = faster.",
      initialValue: 20,
    }),
  ],
});
