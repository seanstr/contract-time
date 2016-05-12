class TimeEntriesController < ApplicationController

  GST = 0.05
  OVERRIDE_START_DATE = Date.new(2016,3,1)  #****
  OVERRIDE_END_DATE = Date.new(2016,4,1)  #****
  USE_OVERRIDE_DATES = true

  #permit "contractors and project_managers and site_admins", :except => :public_page, :allow_guests => true
  #permit "admin", :allow_guests => true

  def public_page
    render :text => "public page"
  end

  def index
    @title = "Time Entry"
    @time_entry = TimeEntry.find params[:id]
  end

  def add
    set_common_variables()
    @title = "Add new Time Entry"
    @client = Client.find :first
    @tasks = Task.find_all_by_status("Active")
    @checked = "checked"
    if param_posted?(:class_name)
      @time_entry = TimeEntry.new(params[:class_name])
      if @time_entry.save
        flash[:notice] = "Time entry saved"
      else
        flash[:notice] = "Time entry not saved!"
      end
      redirect_to :action => "list"  #, :id => @time_entry.id
    end
  end

  def add_hash_text
    set_common_variables()
    @title = "Add new Hash Text Time Entries"
    if param_posted?(:class_name)
      process_hash_text(params[:class_name][:notes])
      redirect_to :action => "list"  #, :id => @time_entry.id
    end
  end

  def hash_form
    process_hash_text(params[:class_name][:notes])
    redirect_to :action => "list"  #, :id => @time_entry.id
  end

  def edit
    set_common_variables()
    @title = "Edit Time Entry"
    @time_entry = TimeEntry.find params[:id]
    @checked = @time_entry.active==1 ? "checked" : "unchecked"
    @class_name = @time_entry
    @tasks = Task.find_all_by_status("Active")
    if param_posted?(:class_name)
      if @time_entry.update_attributes(params[:class_name])
        flash[:notice] = "Changes saved"
        redirect_to :action => "list", :id => @time_entry.id
      end
    end
  end

  def delete
    time_entry = TimeEntry.find params[:id]
    if time_entry.destroy
      flash[:notice] = "Deleted!"
      redirect_to :action => "list"
    end
  end

  #sort by day, time
  #Total by Day and Week
  def list
    set_common_variables()
    @title = "List Time Entries"
    consultant_id = @consultants.first
    @checked = "checked"

    if USE_OVERRIDE_DATES
      @from_date = OVERRIDE_START_DATE
      @end_date = OVERRIDE_END_DATE
    end
    filter_values(consultant_id, @from_date, @end_date)
    unless @time_entries.nil? or @time_entries.size == 0
      @week_summaries = build_week_list(@time_entries)
      @day_summaries = build_day_list(@time_entries)
    end
  end

  #sort and group time by Day, Project, Task, Hours
  #Total by Day and Week
  def timesheet_hours
    set_common_variables()
    @title = "Time Entry Hours View"
    @consultant_id = @consultants.first
    filter_hours
  end

  def filter_hours
    filter_common()

    if USE_OVERRIDE_DATES
      @from_date = OVERRIDE_START_DATE
      @end_date = OVERRIDE_END_DATE
    end

    @time_entries = TimeEntry.retrieve_grouped_filtered_time_entries(@from_date, @end_date, @consultant_id)
    @total_hours = TimeEntry.retrieve_ungrouped_filtered_time_entry_hours(@from_date, @end_date, @consultant_id)
  end

  def filter_values(consultant_id, from_date, end_date)
    @time_entries = TimeEntry.retrieve_ungrouped_filtered_time_entries(from_date, end_date, consultant_id)
    @total_hours = TimeEntry.retrieve_ungrouped_filtered_time_entry_hours(from_date, end_date, consultant_id)
  end

  def filter_common
    @consultant_id = params[:consultant_id] ||= 1
    puts "params: #{params.inspect}"
    selected_month, selected_year = params[:month].nil? ? [params[:class_name]['from_date(2i)'], params[:class_name]['from_date(1i)']] : params[:month].split(" ")
    selected_date = Date.new(selected_year.to_i,selected_month.to_i,1)
    @from_date, @end_date = selected_date.beginning_of_month, selected_date.end_of_month.to_time.advance(:days => 1).to_date
  end

  def filter
    filter_common()
    @time_entries = TimeEntry.retrieve_ungrouped_filtered_time_entries(@from_date, @end_date, @consultant_id)
    @total_hours = TimeEntry.retrieve_ungrouped_filtered_time_entry_hours(@from_date, @end_date, @consultant_id)
    @week_summaries = build_week_list(@time_entries)
    @day_summaries = build_day_list(@time_entries)
    render :partial => "filter_month"
  end

  def timesheet
    set_common_variables()
    consultant_id = @consultants.first
    @title = "Timesheet"
    @beginning_of_month = @from_date
    @action = "timesheet"

    if param_posted?(:class_name) || params[:submit] == "true"
      @from_date, @to_date = [get_from_date, get_to_date.to_time.advance(:days => 1).to_date]
      @time_entries = TimeEntry.new.retrieve_filtered_time_entries @from_date, @to_date, obj[:consultant_id]
    end
  end

  def timesheet_pdf
    set_common_variables()
    @title = "Timesheet"
    if params[:timesheet_type] == "detailed"
      @action = "create_timesheet2_pdf"
    elsif params[:timesheet_type] == "tasks"
      @action = "create_timesheet_pdf_tasks"
    else
      @action = "create_timesheet_pdf"
    end
  end

  def create_timesheet_pdf
    if param_posted?(:class_name)
      retrieve_parameters(params[:class_name])
      logger.debug "@rails_pdf_name = #{@rails_pdf_name}"
      make_and_send_pdf(@rails_pdf_name, :stylesheets => ["site.css"])
    else
      redirect_to :action => "timesheet_pdf"
    end
  end

  def create_timesheet2_pdf
    if param_posted?(:class_name)
      retrieve_parameters(params[:class_name])
      logger.debug "@rails_pdf_name = #{@rails_pdf_name}"
      @title1 = "Detailed Timesheet"
      @time_entries = TimeEntry.new.retrieve_filtered_time_entries2(@from_date, @to_date.to_time.advance(:days => 1).to_date, @consultant_id)
      make_and_send_pdf("detailed #{@rails_pdf_name}", :stylesheets => ["site.css"])
    else
      redirect_to :action => "timesheet_pdf"
    end
  end

  def create_timesheet_pdf_tasks
    if param_posted?(:class_name)
      retrieve_parameters(params[:class_name])
      logger.debug "@rails_pdf_name = #{@rails_pdf_name}"
      @title1 = "Detailed Timesheet"
      @time_entries = TimeEntry.new.retrieve_filtered_time_entries_tasks([15,17])
      make_and_send_pdf("detailed #{@rails_pdf_name}", :stylesheets => ["site.css"])
    else
      redirect_to :action => "timesheet_pdf"
    end
  end

  def summary
    set_common_variables()
    @companies = Company.find :all
    @from_date = Date.new(2007,9,1)
    @to_date = Date.today.end_of_month
  end

  def retrieve_summaries
    from_date, to_date = [get_from_date, get_to_date] if param_posted?(:class_name)
    companies = Company.find :all, :conditions => get_conditions(:company) if params[:filter_company] == "checked"
    clients = Client.find :all, :conditions => get_conditions(:client) if params[:filter_client] == "checked"
    consultants = Consultant.find :all, :conditions => get_conditions(:consultant) if params[:filter_consultant] == "checked"

    param_hash = {from_date: from_date, to_date: to_date, company: nil, consultant: nil, client: nil}
    #@output_array = retrieve_companies(param_hash)
    @output_array = []

    companies.each do |co|
      @output_array << ["company", co]
      consultants.each do |con|
        @output_array << ["consultant", con]
        clients.each do |client|
          @output_array << ["client", client]
          @invoices = Invoice.find :all,
                :conditions => ["start_date >= ? and end_date < ? and company_id = ? and consultant_id = ?",
                from_date, to_date, co, con]
          @output_array << ["invoices", @invoices]
        end
      end
    end
  end

  def retrieve_companies(params)
    arr = []
    companies.each do |c|
      arr << ["company", c]
      params[:company] = c
      arr << retrieve_consultants(params)
    end
  end

  def retrieve_consultants(params)
    arr = []
    consultants.each do |c|
      arr << ["consultant", c]
      params[:consultant] = c
      arr << retrieve_clients(params)
    end
  end

  def retrieve_clients(params)
    arr = []
    clients.each do |c|
      arr << ["client", c]
      params[:client] = c
      arr << ["invoices", retrieve_invoices(params)]
    end
  end

  def retrieve_invoices(params)
    @invoices = Invoice.find :all,
                :conditions => ["start_date >= ? and end_date < ? and company_id = ? and consultant_id = ?",
                params[:start_date], params[:end_date], params[:company], params[:consultant]]
  end

  def get_conditions(condition)
    {company: ["company_id = ?", params[:company_id]],
     client: ["client_id = ?", params[:client_id]],
     consultant: ["consultant_id = ?", params[:consultant_id]]
    }
  end
  def one_action
    render :nothing => true
  end

  def process_hash_text(notes)
    prev_line = nil
    notes.split("\r\n").each do |line|
      logger.debug "processing line #{line}"
      process_hash_text_line(line, prev_line)
      prev_line = line
    end
  end

  def process_time_file(file_name)
    prev_line = nil
    File.open(File.expand_path("../../../db/#{file_name}.yml", __FILE__), 'r') do |file|
      file.readlines.each do |line|
        puts line
        process_hash_text_line(line, prev_line)
        prev_line = line
      end
    end
  end

  def send_array_to_replicon
    te_array = params["time_entry_ids"]
    te_array.each do |te_id|
      te = send_to_replicon(te_id)
      puts "Processed id #{te_id} Date: #{te.entry_date.to_s} start: #{te.start_time.to_s} end: #{te.end_time.to_s} "
    end
    redirect_to :action => "list"  #, :id => @time_entry.id
  end

  def send_list_to_replicon(te_id_range)
    te_id_range.each do |te_id|
      te = send_to_replicon(te_id)
      puts "Processed id #{te_id} Date: #{te.entry_date.to_s} start: #{te.start_time.to_s} end: #{te.end_time.to_s} "
    end
  end

  def send_single_to_replicon
    send_to_replicon(params[:id])
    redirect_to :action => "list"  #, :id => @time_entry.id
  end

  def send_to_replicon(time_entry_id)
    login_id = "188"
    te = TimeEntry.find(time_entry_id)
    project, task = map_task_id(te.task_id)
    replicon = Replicon.new()
    res = replicon.process_query(get_timesheet_by_user_date( "188", te.entry_date))
    timesheet_id = res["Value"][0]["Identity"] unless res.nil? || res["Value"].nil?
    if project.is_replicon_project
	    res = replicon.process_query(add_timesheet_entry(
	    			timesheet_id.to_s, project.replicon_id.to_s, task.replicon_id.to_s,
	    			te.entry_date, te.start_time, te.end_time, te.notes))
  	else
	    res = replicon.process_query(add_timesheet_entry_no_project(
	    			timesheet_id.to_s, task.replicon_id.to_s,
	    			te.entry_date, te.start_time, te.end_time, te.notes))
  	end
    te.update_attribute(:replicon_id, res) unless res.nil?
    te
  end

  def map_task_id(task_id)
    task = Task.find(task_id)
    project = Project.find(task.project_id)
    [project, task]
  end

private
#############

  def process_hash_text_line(line, prev_line)
    return if line.strip == ""
    if line.start_with?(" ")
      line.strip!
      line = prev_line.split(",")[0].split("-")[1] + line if line.start_with?("-")  #add the prev_line's end time if the line starts with "-"
      arr = line.split(",")
      if arr[0].nil? || arr[0].strip == ""
        puts "** Error: empty time range"
        return
      end
      if arr[1].nil? || arr[1].strip == ""
        puts "** Error: empty hash tag"
        return
      end
      @comment = arr[2,arr.size].join(",") unless arr[2].nil?
      @hash_tag = arr[1].strip
      @start_time, @end_time = determine_time_range(arr[0].strip)
      save_time_entry_record
    else
      @entry_date = line.strip unless line.start_with?(" ")
    end
  end

  def retrieve_parameters(obj)
    @from_date = Date.new(obj['from_date(1i)'].to_i, obj['from_date(2i)'].to_i, obj['from_date(3i)'].to_i)
    @to_date = Date.new(obj['to_date(1i)'].to_i, obj['to_date(2i)'].to_i, obj['to_date(3i)'].to_i)
    @consultant_id = obj["consultant_id"]
    @client_id = obj["client_id"]
    @consultant = Consultant.find @consultant_id unless @consultant_id.nil?
    @client = Client.find @client_id unless @client_id.nil?
    @time_entries = retrieve_filtered_time_entries(@from_date, @to_date.to_time.advance(:days => 1).to_date, @consultant_id)
    @title1 = "Timesheet"
    @title2 = "for #{@client.name}"
    @rails_pdf_name = "timesheet - #{@client.name} - #{@from_date.strftime("%Y %m")} - #{Time.now.strftime("%Y %m %d")}"
  end

  def set_common_variables
    @user, @tasks, @consultants, @clients, @from_date, @end_date = init_common_variables()
  end

  def init_common_variables
    user = User.find :first
    tasks = Task.find_all_by_active("1", :order => "name")
    consultants = Consultant.find :all
    clients = Client.find :all
    from_date ||= Date.today.beginning_of_month
    end_date ||= Date.today.end_of_month
    end_date = end_date.to_time.advance(:days => 1).to_date
    [user, tasks, consultants, clients, from_date, end_date]
  end

  def determine_time_range(times)
    start_val, end_val = times.strip.split("-")
    start_time = convert_to_time(start_val)
    end_time = convert_to_time(end_val)
    [start_time, end_time]
  end

  def convert_to_time(time_val)
    if time_val.size <=2
      _val = time_val + ":00"
    else
      _val = ("0" + time_val)[-4,4]
      _val = _val[0,2] + ":" + _val[2,2]
    end
    Time.parse(@entry_date + " " + _val)
  end

  def save_time_entry_record
    return nil if ["lunch","break","time_off","timeoff","coffee"].include?(@hash_tag.strip.sub(/^#/,""))
    save_hash = {entry_date: @entry_date, start_time: @start_time, end_time: @end_time, hash_tag: @hash_tag, comment: @comment}
    te = TimeEntry.new.save_from_hash(save_hash)
  end

  def build_week_list(time_entries)
    old_week = time_entries[0].week
    curr_rec = 0
    total_hours = Duration.new
    latest_entry_date = time_entries[0].entry_date
    week_hash =  {time_entries[0].week => [time_entries[0].entry_date, nil, nil]}
    time_entries.each do |time_entry|
      if time_entry.week != old_week
        week_hash[old_week][1] = latest_entry_date
        week_hash[old_week][2] = total_hours.days_to_hours + total_hours.hours + (total_hours.minutes.to_f / 60)
        week_hash.merge!({time_entry.week => [time_entry.entry_date, nil, nil]})
        curr_rec += 1
        total_hours = Duration.new
        old_week = time_entry.week
      end
      total_hours += time_entry.duration
      latest_entry_date = time_entry.entry_date
    end
    week_hash[old_week][1] = latest_entry_date
    week_hash[old_week][2] = total_hours.days_to_hours + total_hours.hours + (total_hours.minutes.to_f / 60)
    week_hash
  end

  def build_day_list(time_entries)
    old_day = time_entries[0].entry_date
    curr_rec = 0
    day_array = [time_entries[0].entry_date, nil]
    total_hours = Duration.new
    time_entries.each do |time_entry|
      if time_entry.entry_date != old_day
        day_array[curr_rec,1] = total_hours
        day_array << [time_entry.entry_date, nil]
        curr_rec += 1
        total_hours = Duration.new
        old_day = time_entry.entry_date
      end
      total_hours += time_entry.duration
    end
    day_array[curr_rec,1] = total_hours
    day_array
  end

  def get_from_date
    get_date("from_date")
  end

  def get_to_date
    get_date("to_date")
  end

  def get_date(date_param)
    Date.new(obj["#{date_param}(1i)"].to_i, obj["#{date_param}(2i)"].to_i, obj["#{date_param}(3i)"].to_i)
  end

end
