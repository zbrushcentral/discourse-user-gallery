# frozen_string_literal: true
# name: discourse-usesr-gallery
# about:
# version: 0.1
# authors: M. Sedlmayr
# url: https://github.com/wishspinner


register_asset "stylesheets/common/discourse-user-gallery.scss"
register_asset "stylesheets/common/active-challenges.scss"

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
