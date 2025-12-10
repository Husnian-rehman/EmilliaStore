import { defineType, defineField } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Footer Logo",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "address",
      title: "Company Address",
      type: "string",
    }),

    defineField({
      name: "menus",
      title: "Footer Menus",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Menu Title", type: "string" },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Text" },
                    {
                      name: "url",
                      type: "url",
                      title: "URL",
                      // allow absolute (http/https/mailto/tel) and relative (/blog, /about) and anchors (#section)
                      validation: (Rule: any) =>
                        Rule.uri({
                          allowRelative: true,
                          scheme: ["http", "https", "mailto", "tel"],
                        }),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),

    defineField({
      name: "newsletterText",
      title: "Newsletter Description",
      type: "string",
    }),

    defineField({
      name: "copyright",
      title: "Footer Copyright",
      type: "string",
    }),
  ],
});
