class TimeEntry < ActiveRecord::Base
  belongs_to :task
  belongs_to :consultant

  #acts_as_authorizable

  LIST_ITEMS = %w(entry_date start_time end_time task notes)
  FORM_ITEMS = %w(a b)

  VIEW_FIELDS = %W(entry_date start_time end_time duration task_name notes)
  HOUR_VIEW_FIELDS = %W(entry_date project_name task_name notes)
  TIMESHEET_FIELDS = %W(entry_date)

  TIMESHEET_ITEMS = %w( entry_date task hours)
  TIMESHEET2_ITEMS = %w( entry_date task start_time end_time hours)

  QRY_CONDITIONS = "entry_date >= ? and entry_date < ? and consultant_id = ?"

  #class methods
  def self.hour_view_column_sizes(key)
    hsh = {:entry_date=>{:width=>"120"},:project_name=>{:width=>"110"},:task_name=>{:width=>"170"},:notes=>{:width=>"75"},:hours=>{:width=>"40"}}
    return hsh[key]
  end

  def self.view_fields_column_sizes(key)
    hsh = {:entry_date=>{:width=>"120"}, :start_time=>{:width=>"50"}, :end_time=>{:width=>"50"}, :duration=>{:width=>"150px"}, :task_name=>{:width=>"150"}, :notes=>{:width=>"200"}}
    return hsh[key]
  end

  # instance methods
  def duration
    Duration.new(self.end_time - self.start_time)
  end

  def task_name
    self.task.name
  end

  def project_name
    self.task.project.name
  end

  def save_from_hash(hash_values)
    populate_defaults
    populate_times(hash_values)
    process_hash_tag(hash_values)
    self.task_id = Tag.find_by_hash_tag(hash_values[:hash_tag].sub(/^#/,"")).task_id
    self.notes = hash_values[:comment] unless hash_values[:comment].nil? || hash_values[:comment].strip.size == 0

    self.save unless self.task_id.nil?
    puts "Error: hash_tag (#{hash_values[:hash_tag].strip.sub(/^#/,"")}) not found in Tags table" if self.task_id.nil?
  end

  def populate_defaults
    self.active = true
    self.consultant_id = 1
    self.created_by = "sean"
    self.updated_by = "sean"
    self.created_at = Time.now
    self.updated_at = Time.now
  end

  def populate_times(hash_values)
    self.entry_date = hash_values[:entry_date]
    self.start_time =  hash_values[:start_time].strftime("%Y-%m-%d %H:%M:%S")
    self.end_time =  hash_values[:end_time].strftime("%Y-%m-%d %H:%M:%S")
  end

  def process_hash_tag(hash_values)
    predefined_comment = ""
    hash_values[:hash_tag], predefined_comment = process_predefined_hash_tag(hash_values[:hash_tag]) if hash_values[:hash_tag].sub!(/^@/, '')
    hash_values[:comment] = "#{predefined_comment}" unless predefined_comment == ""
  end

  def process_predefined_hash_tag(predefined_hash_tag)
    tag = PredefinedTag.find_by_predefined_tag(predefined_hash_tag)
    [Tag.find(tag.tag_id).hash_tag, tag.description]
  end

  def self.retrieve_filtered_time_entries_tasks(tasks)
    self.find :all,
      :select => "entry_date, task_id, sec_to_time(time_to_sec(timediff(end_time,start_time))) hours, week(entry_date) week, start_time, end_time, notes",
      :conditions => ["task_id in (?)", tasks],
      :order => "task_id, entry_date, start_time"
  end

  def self.retrieve_filtered_time_entries2(from_date, to_date, consultant_id)
    self.find :all,
      :select => "entry_date, task_id, sec_to_time(time_to_sec(timediff(end_time,start_time))) hours, week(entry_date) week, start_time, end_time, notes",
      :conditions => [QRY_CONDITIONS, from_date, to_date, consultant_id],
      :order => "entry_date, start_time"
  end

  def self.retrieve_filtered_time_entries(from_date, to_date, consultant_id)
    self.find :all,
      :select => "entry_date, task_id, sec_to_time(sum(time_to_sec(timediff(end_time,start_time)))) hours, week(entry_date) week",
      :conditions => [QRY_CONDITIONS, from_date, to_date, consultant_id],
      :group => "entry_date, task_id",
      :order => "entry_date"
  end

  def self.retrieve_ungrouped_filtered_time_entries(from_date, to_date, consultant_id)
    self.find :all,
      :select => "*, week(entry_date) week, sec_to_time(time_to_sec(timediff(end_time,start_time))) hours",
      :conditions => [QRY_CONDITIONS, from_date, to_date, consultant_id],
      :order => "entry_date, start_time, task_id"
  end

  def self.retrieve_grouped_filtered_time_entries(from_date, to_date, consultant_id)
    self.find :all,
      :select => "entry_date, task_id, notes, week(entry_date) week,
                  round(sum(hour(timediff(end_time,start_time)))+ sum(minute(timediff(end_time,start_time)))/60,2) hours",
      :conditions => [QRY_CONDITIONS, from_date, to_date, consultant_id],
      :group => "entry_date, task_id, notes, week(entry_date)",
      :order => "entry_date, task_id"
  end

  def self.retrieve_ungrouped_filtered_time_entry_hours(from_date, to_date, consultant_id)
    hours = self.find :all, :conditions => [QRY_CONDITIONS, from_date, to_date, consultant_id]
    x = 0.0
    hours.each { |h| x += Duration.new(h.end_time - h.start_time).total }
    x / 60 / 60
  end

  def replicon
    # login
    # get userid
    #   call: [ "Action": "Query", "DomainType": "Replicon.Domain.User", "QueryType": "UserByLoginName", "Args": [   "smatthews" ]} ]
    # query timesheet by user and date
    #   will create a timesheet if it doesn't exist
    #   timesheet consisits of a week of dates
    #   call: [ { "Action": "Query", "QueryType": "EntryTimesheetByUserDate", "DomainType": "Replicon.Suite.Domain.EntryTimesheet", "Args": [ { "__type": "Replicon.Domain.User", "Identity": "188" }, { "__type": "Date", "Year": 2014, "Month": 3, "Day": 17 } ], "Load": [ { "Relationship": "TimeEntries" }, { "Relationship": "TimeOffEntries" } ] } ]
    # for each day
    #   for each day_entry
    #     get project/task id
    #     start time
    #     end time
    #     add comment
  end

end
