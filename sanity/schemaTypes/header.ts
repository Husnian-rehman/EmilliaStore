// sanity/schemas/header.ts
import { defineType } from 'sanity'

export default defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },

    {
      name: 'menus',
      title: 'Menus',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menu',
          fields: [
            { name: 'title', type: 'string', title: 'Menu Title' },

            {
              name: 'items',
              title: 'Menu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'menuItem',
                  fields: [

                    // --- This H4 title you show in UI ---
                    { name: 'title', type: 'string', title: 'Section Heading (H4 Title)' },

                    {
                      name: 'megaContent',
                      title: 'Menu + Product Blocks',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            {
                              name: 'links',
                              title: 'Menu Links',
                              type: 'array',
                              of: [
                                {
                                  type: 'object',
                                  fields: [
                                    { name: 'title', type: 'string', title: 'Link Title' },
                                    { name: 'url', type: 'url', title: 'Link URL' },
                                  ],
                                },
                              ],
                            },

                            {
                              name: 'featuredProduct',
                              title: 'Featured Product Card',
                              type: 'object',
                              fields: [
                                { name: 'title', type: 'string', title: 'Product Title' },
                                { name: 'price', type: 'number', title: 'Price' },
                                { name: 'image', type: 'image', title: 'Product Image', options: { hotspot: true } },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'rightLinks',
      title: 'Right Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'url', type: 'url' },
            { name: 'icon', type: 'image', options: { hotspot: true } },
          ],
        },
      ],
    },
  ],
})