class ProjectsController < ApplicationController

  def add
    @title = "New Project"
    @clients = Client.find :all
    if param_posted?(:class_name)
      @project = Project.new(params[:class_name])
      if @project.save
        flash[:notice] = "Project saved"
      else
        flash[:notice] = "Project not saved!"
      end
    end
    redirect_to :action => "list", :id => @project.id
  end
 
  def edit
    @title = "Edit Project"
    @project= Project.find params[:id]
    @class_name = @project
    @clients = Client.find :all
    if param_posted?(:class_name)
      if @project.update_attributes(params[:class_name])
        flash[:notice] = "Changes saved"
        redirect_to :action => "index", :id => @project.id
      end
    end
  end
 
  def index
    @project= Project.find :first
  end
 
  def list
    @title = "Projects"
    @projects = Project.find :all
    @clients = Client.find :all
  end

  def delete
    project = Project.find params[:id]
    if project.destroy
      flash[:notice] = "Deleted!"
      redirect_to :action => "list"
    end
  end
end
