class Address < ActiveRecord::Base
  belongs_to :addressable, :polymorphic => true

  scope :by_client, lambda { |client_id| {:conditions => ["addressable_type = 'Client' and client_id = ?", client_id]} }

end
