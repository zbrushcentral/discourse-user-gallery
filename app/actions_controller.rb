class DiscourseUserGallery::ActionsController < ::ApplicationController
  requires_plugin DiscourseUserGallery::PLUGIN_NAME
  DEFAULT_PAGE_SIZE = 25

  def list
    offset = params[:offset].to_i
    limit = params.key?(:limit) ? params[:limit].to_i : DEFAULT_PAGE_SIZE

    user = fetch_user_from_params

    query = ::Upload.joins(posts: {topic: :category}).
      where(posts: {user_id: user.id}).
      where(categories: {id: '7'}).
      where(categories: {read_restricted: false}).
      where.not(width: '72').
      order('posts.created_at DESC').
      group('uploads.id', 'posts.created_at')

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
