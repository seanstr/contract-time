class Project < ActiveRecord::Base
  belongs_to :client
  has_and_belongs_to_many :consultants
  has_many :tasks
  
  VIEW_FIELDS = %W(name description status active)
  
end
