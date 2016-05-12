class LoginController < ApplicationController

  def new
    session[:user] = "admin"
    if param_posted?(:class_name)
      logger.debug "In new - logging in"
      #@login = Login.new(params[:class_name])
      @login = true
      if @login
        flash[:notice] = "Logged in"
      else
        flash[:notice] = "Not logged in!"
      end
    end
  end

  def add
    if param_posted?(:class_name)
      @time_entry = TimeEntry.new(params[:class_name])
      if @time_entry.save
        flash[:notice] = "Time entry saved"
      else
        flash[:notice] = "Time entry not saved!"
      end
    end
  end

  def edit
  end

  def list
  end

  def login
  end
end
