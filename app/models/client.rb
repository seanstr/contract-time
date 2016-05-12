class Client < ActiveRecord::Base
  has_many :projects
  has_many :addresses, :as => :addressable
  
  LIST_COLUMNS = %W(name )
  VIEW_FIELDS = %W(name )
  
  def self.project_tasks
    self.projects.each do |p|
      p.tasks.each do |t|
        ret_array << "#{p.name - t.name}"
      end
    end
    ret_array.sort!
  end

  def address1
    self.addresses.first.address1 unless self.addresses.first.nil?
  end

  def address2
    self.addresses.first.address2 unless self.addresses.first.nil?
  end
  
  def address3
    self.addresses.first.address3 unless self.addresses.first.nil?
  end
  
  def city
    self.addresses.first.city unless self.addresses.first.nil?
  end
  
  def province
    self.addresses.first.province unless self.addresses.first.nil?
  end
  
  def postal_code
    self.addresses.first.postal_code unless self.addresses.first.nil?
  end
  
end
