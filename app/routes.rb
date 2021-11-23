DiscourseUserGallery::Engine.routes.draw do
  get ":username/list" => "actions#list",
    constraints: { username: RouteFormat.username }
end

Discourse::Application.routes.append do
  mount ::DiscourseUserGallery::Engine, at: "/discourse-user-gallery"
  get "u/:username/gallery" => "users#show",
      constraints: { username: RouteFormat.username }
end
