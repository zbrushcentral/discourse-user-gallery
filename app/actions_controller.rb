class DiscourseUserGallery::ActionsController < ::ApplicationController
  requires_plugin DiscourseUserGallery::PLUGIN_NAME
  DEFAULT_PAGE_SIZE = 25

  def list
    offset = params[:offset].to_i
    limit = params.key?(:limit) ? params[:limit].to_i : DEFAULT_PAGE_SIZE

    user = fetch_user_from_params

    query = ::Upload.joins(:posts).
      includes(:posts).
      where(posts: {user_id: user.id}).
      order('posts.created_at DESC').
      group('uploads.id')

    uploads = query.
      preload(posts: :topic).
      offset(offset).
      limit(limit)

    render_json_dump(
      {
        items: serialize_data(uploads, GalleryItemJsonSerializer)
      }
    )
  end
end
