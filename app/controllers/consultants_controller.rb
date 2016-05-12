class ConsultantsController < ApplicationController

  def add
    @title = "New consultant"
    if param_posted?(:consultant)
      @consultant = Consultant.new(params[:consultant])
      if @consultant .save
        flash[:notice] = "Consultant saved"
      else
        flash[:notice] = "Consultant not saved!"
      end
    end
  end

  def edit
    @consultant = Consultant.find params[:id]
    @companies = Company.find :all
    if param_posted?(:consultant)
      if @consultant.update_attributes(params[:consultant])
        flash[:notice] = "Changes saved"
        redirect_to :action => "index", :id => @consultant.id
      end
    end
  end

  def index
    @title = "Consultant Details"
    @consultant = Consultant.find params[:id]
  end

  def list
    @title = "Consultant List"
    @consultants = Consultant.find :all
    @companies = Company.find :all
  end
end
