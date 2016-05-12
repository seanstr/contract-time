class Company < ActiveRecord::Base
  has_many :consultants
  has_many :clients
  has_many :invoices
  has_many :addresses, :as => :addressable

  validates_presence_of :name
  validates_uniqueness_of :name
  validates_length_of :name, :maximum => 255

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
