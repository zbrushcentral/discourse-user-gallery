class GalleryItemJsonSerializer < ApplicationSerializer
  attributes :thumb_url,
             :post_id,
             :post_number,
             :topic_id,
             :topic_title,
             :topic_slug,
             :created_at

  def thumb_url
    object.url
  end

  def post
    @post ||= object.posts[0]
  end

  def post_id
    post.id
  end

  def post_number
    post.post_number
  end

  def topic_id
    post.topic.id
  end

  def topic_title
    post.topic.title
  end

  def topic_slug
    post.topic.slug
  end
end
