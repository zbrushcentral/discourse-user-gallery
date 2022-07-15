# frozen_string_literal: true
# name: discourse-user-gallery
# about:
# version: 0.1
# authors: M. Sedlmayr, N. Selvidge
# url: https://github.com/wishspinner


register_asset "stylesheets/common/discourse-user-gallery.scss" 
register_asset "stylesheets/common/active-challenges.scss"
register_asset "stylesheets/common/challenge-details.scss"
register_asset "stylesheets/common/countdown.scss"
register_asset "stylesheets/common/carousel.scss"

register_svg_icon "trophy" if respond_to?(:register_svg_icon)
register_svg_icon "chess" if respond_to?(:register_svg_icon)
register_svg_icon "fire" if respond_to?(:register_svg_icon)
register_svg_icon "circle" if respond_to?(:register_svg_icon)


enabled_site_setting :discourse_user_gallery_enabled


after_initialize do

  module ::DiscourseUserGallery
    PLUGIN_NAME ||= 'DiscourseUserGallery'.freeze

    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace DiscourseUserGallery
    end
  end


  require_dependency "application_controller"
  Dir[File.dirname(__FILE__) + '/app/**/*.rb'].each {|file| require file }
end

