class TasksController < ApplicationController

  def add
    @title = "New Task"
    @projects = Project.find :all
    @tasks = Task.find :all
    @consultants = Consultant.find :all
    if param_posted?(:class_name)
      @task = Task.new(params[:class_name])
      if @task.save
        flash[:notice] = "Task saved"
      else
        flash[:notice] = "Task not saved!"
      end
    end
  end

  def edit
    @task = Task.find params[:id]
    @class_name = @task
    @projects = Project.find :all
    if param_posted?(:class_name)
      if @task.update_attributes(params[:class_name])
        flash[:notice] = "Changes saved"
        redirect_to :action => "list", :id => @task.id
      end
    end
  end

  def index
    @projects = Project.find :all
    @task = Task.find :first
  end

  def list
    @title = "Tasks"
    @tasks = Task.find :all, :order => "project_id, name"
    @projects = Project.find :all
  end

  def delete
  end
end
