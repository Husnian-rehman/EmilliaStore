export default {
  name: "homeVideo",
  title: "Home Page Video",
  type: "document",
  fields: [
    {
      name: "videoFile",
      title: "Upload Video",
      type: "file",
      options: {
        accept: "video/*",
      },
    },
    {
      name: "thumbnail",
      title: "Thumbnail (Optional)",
      type: "image",
    }
  ],
};
