class ChallengesController < ::ApplicationController
requires_plugin DiscourseUserGallery::PLUGIN_NAME



  def index
    render json: {challenge: 'name'}
  end 
  
  def show


  end


end 