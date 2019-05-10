require 'rails_helper'

describe DiscourseUserGallery::ActionsController do
  fab!(:user) { Fabricate(:user) }

  fab!(:upload1) { Fabricate(:upload, user: user) }
  fab!(:topic1) { build(:topic, id: 1) }
  fab!(:post1) { Fabricate(:post, user: user, topic: topic1) }

  before do
    post1.uploads << upload1
  end

  it 'can list' do
    get "/discourse-user-gallery/#{user.username}/list.json"
    expect(response.status).to eq(200)
  end
end
