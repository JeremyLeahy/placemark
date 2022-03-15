export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About Coffee Time",
      };
      return h.view("about-view", viewData);
    },
  },
};
