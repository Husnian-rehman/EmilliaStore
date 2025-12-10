export default {
  name: "aboutbanner",
  title: "About Banner",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Banner Title",
      type: "string",
    },
    {
      name: "bannerImage",
      title: "Banner Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bannerVideo",
      title: "Banner Video",
      type: "file",
      description: "Upload MP4 video file"
    }
  ]
}
