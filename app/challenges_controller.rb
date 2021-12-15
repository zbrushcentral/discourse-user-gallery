class ChallengesController < ::ApplicationController
requires_plugin DiscourseUserGallery::PLUGIN_NAME

require 'rest-client'

  def index
    render json: {challenge: 'name'}
  end 

  def show
   user = fetch_user_from_params

  end


end 