import { defineConfig, Field } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

const commonFields = [
  {
    type: "string",
    name: "title",
    label: "Title",
    isTitle: true,
    required: true,
  },
  {
    type: "rich-text",
    name: "body",
    label: "Body",
    isBody: true,
  },
  {
    type: 'boolean',
    name: 'nocrop',
    label: 'Disable Image Crop'
  }
] as const

const imageFields = [
  {
    type: 'image',
    label: 'Image',
    name: 'image'
  },
  {
    type: 'string',
    label: 'Image caption',
    name: 'image_caption'
  }
] as const

const menuFields = [
  {
    type: 'string',
    name: 'title',
    label: 'Title',
    required: true,
    isTitle: true
  },
  {
    type: 'string',
    name: 'link',
    label: 'Link',
    required: true
  },
  {
    type: 'image',
    name: 'icon',
    label: 'Icon',
    required: true
  },
  {
    type: 'boolean',
    name: 'hidden',
    label: 'Hidden',
  }
] as const

function menuItemLabel(item: { title: string; hidden: boolean }) {
  return { label: `${item.title} ${item.hidden ? '(oculto)' : ''}` }
}

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: 'pages',
        label: 'Pages',
        path: 'content/pages',
        ui: {
          router: ({ document }) => {
            return document._sys.filename === 'index' ? '/' : `/${document._sys.filename}`
          }
        },
        fields: [
          ...commonFields,
          ...imageFields,
        ],
      },
      {
        name: 'dossier',
        label: 'Dossier',
        path: 'content/dossier',
        ui: {
          router: ({ document }) => {
            return `/dossier/${document._sys.filename}`
          }
        },
        fields: [
          ...imageFields,
          ...commonFields
        ]
      },
      // {
      //   name: "blog",
      //   label: "Blog",
      //   path: "content/blog",
      //   ui: {
      //     router: ({ document }) => {
      //       return `/blog/${document._sys.filename}`
      //     }
      //   },
      //   fields: [
      //     {
      //       type: 'datetime',
      //       label: 'Publish Date',
      //       name: 'publish_date'
      //     },
      //     {
      //       type: 'string',
      //       label: 'Tags',
      //       name: 'tags',
      //       list: true,
      //     },
      //     ...imageFields,
      //     ...commonFields
      //   ],
      // },
      {
        name: 'config',
        label: 'Configuration',
        path: 'data',
        format: 'json',
        ui: {
          router: () => '/dossier',
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true
          },
          {
            type: 'object',
            name: 'topnav',
            label: 'Top Navigation',
            required: true,
            list: true,
            ui: { itemProps: menuItemLabel },
            fields: [
              ...menuFields.filter(f => f.name !== 'icon'),
              {
                type: 'boolean',
                label: 'External',
                name: 'external'
              }
            ]
          },
          {
            type: 'object',
            name: 'dossier',
            label: 'Dossier / Actividades',
            required: true,
            list: true,
            ui: { itemProps: menuItemLabel },
            fields: [...menuFields]
          },
          {
            type: 'object',
            name: 'socials',
            label: 'Redes sociales',
            required: true,
            list: true,
            ui: { itemProps: menuItemLabel },
            fields: [...menuFields]
          }
        ]
      }
    ],
  },
});
