class Consultant < ActiveRecord::Base
  belongs_to :company
  has_many :projects
  has_many :addresses, :as => :addressable
  has_many :time_entries

  #acts_as_authorizable

  VIEW_FIELDS = %W(name company_name rate status active)

  def company_name
    self.company.name
  end

end
