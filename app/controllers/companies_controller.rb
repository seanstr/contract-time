class CompaniesController < ApplicationController

  def add
    @title = "New company"
    if param_posted?(:class_name)
      @company = Company.new(:name => params[:class_name][:name])
      @address = Address.new(:address1 => params[:class_name][:address1],
        :address2 => params[:class_name][:address2],
        :address3 => params[:class_name][:address3],
        :city => params[:class_name][:city],
        :province => params[:class_name][:province],
        :postal_code => params[:class_name][:postal_code],
        :status => params[:class_name][:status],
        :addressable_id => @company.id,
        :addressable_type => "Company")
      if @company.save and @address.save
        flash[:notice] = "Company saved"
      else
        flash[:notice] = "Company not saved!"
      end
    end
  end

  def edit
    @company = Company.find params[:id]
    @class_name = @company
    if param_posted?(:class_name)
      @company.name = params[:class_name][:name]
      @company.addresses.first.address1 = params[:class_name][:address1]
      @company.addresses.first.address2 = params[:class_name][:address2]
      @company.addresses.first.address3 = params[:class_name][:address3]
      @company.addresses.first.city = params[:class_name][:city]
      @company.addresses.first.province = params[:class_name][:province]
      @company.addresses.first.postal_code = params[:class_name][:postal_code]
      @company.gst_number = params[:class_name][:gst_number]
      if @company.save and @company.addresses.first.save
        flash[:notice] = "Changes saved"
        redirect_to :action => "index", :id => @company.id
      end
    end
  end

  def delete
    company = Company.find params[:id]
    company.destroy
  end

  def list
    @title = "Company List"
    @companies = Company.find :all
  end

  def index
    @company = Company.find params[:id]
  end
end
