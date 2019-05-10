export default {
  shouldRender(_, ctx) {
    return ctx.siteSettings.discourse_user_gallery_enabled;
  }
};
