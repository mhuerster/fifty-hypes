class Hypocrite
  include Mongoid::Document
  field :name, type: String
  field :profession, type: String
  field :image_path, type: String
  field :state_id, type: String

end
