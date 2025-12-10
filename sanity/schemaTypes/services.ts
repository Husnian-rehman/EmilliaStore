export default {
  name: 'services',
  title: 'Services Section',
  type: 'document',

  fields: [
    // New top-level title
    {
      name: 'title',
      type: 'string',
      title: 'Section Title',
      description: 'Main heading for Services section',
    },
    // New top-level description
    {
      name: 'description',
      type: 'text',
      title: 'Section Description',
      description: 'Short description under the main heading',
    },

    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            // Category Title
            {
              name: 'title',
              type: 'string',
              title: 'Category Title',
            },

            // Slug
            {
              name: 'slug',
              type: 'slug',
              title: 'Slug',
              options: { source: 'title', maxLength: 100 },
            },

            // Services inside category
            {
              name: 'services',
              title: 'Services',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      type: 'string',
                      title: 'Service Title',
                    },
                    {
                      name: 'description',
                      type: 'text',
                      title: 'Service Description',
                    },
                    {
                      name: 'icon',
                      type: 'image',
                      title: 'Icon',
                      options: { hotspot: true },
                    },
                    {
                      name: 'link',
                      type: 'url',
                      title: 'Learn More URL',
                      description: 'Add link like /blog or /#section',
                    },
                    {
                      name: 'btnText',
                      type: 'string',
                      title: 'Button Text',
                      description: 'Default: Learn More',
                      initialValue: 'Learn More',
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
};

