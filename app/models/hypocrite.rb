class Hypocrite
  include Mongoid::Document
  field :name, type: String
  field :current_position, type: String
  field :image_path, type: String
  field :descent, type: String
  field :twitter, type: String
  field :description, type: String
  field :state_id, type: String

  attr_accessible :name, :current_position, :image_path, :descent, :twitter, :description, :state_id

end
