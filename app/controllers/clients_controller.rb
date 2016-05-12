class ClientsController < ApplicationController

  def add
    @title = "New client"
    if param_posted?(:class_name)
      @client = Client.new(:name => params[:class_name][:name], :company => params[:class_name][:company])
      if @client.save 
        @address = Address.new(:addressable_id => @client.id,
          :address1 => params[:class_name][:address1], 
          :address2 => params[:class_name][:address2], 
          :address3 => params[:class_name][:address3],
          :city => params[:class_name][:city], 
          :province => params[:class_name][:province], 
          :postal_code => params[:class_name][:postal_code],
          :status => params[:class_name][:status],
          :addressable_id => @client.id,
          :addressable_type => "Client")
        if @address.save  # TODO: make into a transaction
          flash[:notice] = "Client and address saved"
        else
          flash[:notice] = "Client saved, address did not get saved!"
        end
      else
        flash[:notice] = "Client not saved!"
      end
    end
  end
  
  def edit
    @client = Client.find params[:id]
    @class_name = @client
    if param_posted?(:class_name)
      @client.name = params[:class_name][:name]
      @address = Address.by_client(params[:id])
      @address.address1 = params[:class_name][:address1]
      @address.address2 = params[:class_name][:address2]
      @address.address3 = params[:class_name][:address3]
      @address.city = params[:class_name][:city]
      @address.province = params[:class_name][:province]
      @address.postal_code = params[:class_name][:postal_code]
      if @client.save and @address.save
        flash[:notice] = "Changes saved"
        redirect_to :action => "list", :id => @client.id
      end
    end
  end
 
  def index
    @title = "Client Details"
    @client = Client.find params[:id]
  end
 
  def list
    @title = "Client List"
    @clients = Client.find :all
  end
  
  def delete
    client = Client.find params[:id]
    if client.destroy and client.addresses.first.destroy
      flash[:notice] = "Deleted!"
      redirect_to :action => "list"
    end
    
  end
end
