module CompaniesHelper

  def company_list_items
    #%w( name
    #    addresses.first.address1 addresses.first.address2 addresses.first.address3
    #    addresses.first.city addresses.first.province addresses.first.postal_code )
    %w( name address1 address2 address3 city province postal_code )
  end
end
