class Array
  def append!(val)
    self << val unless val.nil?
  end
end

class CalendarsController < ApplicationController

  LARGE_DOW = %W(Sunday Monday Tuesday Wednesday Thursday Friday Saturday)
  MEDIUM_DOW = %W(Sun Mon Tue Wed Thu, Fri Sat)
  SMALL_DOW = %W(S M T W T F S)

  def index
    set_globals()
    @calendar = load_months()
    reformat_calendar(:large)
  end

  def small
    set_globals()
    @year = params[:year].to_i unless params[:year].nil?
    @calendar = load_months()
    reformat_calendar(:small)
    send_response()
  end

  def set_globals()
    @title = "Calendar"
    @year = 2016
    @day_id = 0
    calendar_arr = [@year]
  end

  def send_response()
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "contract_time_calendar.pdf",
               wkhtmltopdf: 'C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe',
               margin: {top: 1, bottom: 5, left: 15, right: 5},
               layout: false,
               print_media_type: true,
               no_background: false
      end
    end
  end

  def load_months()
    day_id = 1
    @months_hash = {}
    (1..12).each do |month|
      days_in_month = Date.new(@year,month,1).next_month.prev_day.day
      last_week_day = 0
      @week = 1
      @days_hash = {}
      (1..days_in_month).each do |day|
        date_value = Date.new(@year,month,day)
        week_day = date_value.wday
        @week += 1 if week_day < last_week_day
        pad_beginning_of_month(week_day) if day == 1 && week_day > 0
        @days_hash.merge!(fill_in_day(day, date_value, week_day))
        @day_id += 1
        pad_end_of_month(week_day, days_in_month) if day == days_in_month and week_day < 7
        last_week_day = week_day
      end
      @months_hash.merge!({month => @days_hash})
    end
    @months_hash
  end

  def reformat_calendar(size)
    @calendar_grid = []
    @calendar.each_pair do |month_number, days_hsh|
      month_grid = init_month_grid(month_number, size)
      week_arr = []; billable = 0
      days_hsh.each_pair do |day_id, day|
        if not(day[:billable?].nil?)
          billable += 1 if day[:billable?]
        end
        week_arr = [] if day[:dow] == 0
        week_arr << fill_day_arr(day)
        month_grid << week_arr if day[:dow] == 6
      end
      month_grid << "work days: #{billable}"
      @calendar_grid << month_grid
    end
    puts @calendar.inspect
    puts @calendar_grid.inspect
  end

  def init_month_grid(month_number, size)
    month_grid = []
    month_grid << Date.new(@year, month_number, 1).strftime("%B")
    month_grid << LARGE_DOW if size == :large
    month_grid << MEDIUM_DOW if size == :medium
    month_grid << SMALL_DOW if size == :small
    month_grid
  end

  def fill_day_arr(day)
    day_arr = []
    day_arr << day[:value] unless day[:value].nil?
    contents = get_contents(day)
    day_arr << contents unless contents.nil?
    day_arr << day[:business_day] unless day[:business_day].nil?
    day_arr
  end

  def get_contents(day)
    day_arr = []
    return nil if day[:contents].nil? || day[:contents].length == 0
    holiday_arr = day[:contents].select {|c| c[:type]=="Holiday"}
    puts holiday_arr
    holiday_arr.map(&:to_a).flatten(1).reduce({}) {|h,(k,v)| (h[k] ||= []) << v; h}[:desc].join("<br/>") if holiday_arr.length > 0
    vacation_arr = day[:contents].select {|c| c[:type]=="Vacation"}
    puts vacation_arr
    vacation_arr.map(&:to_a).flatten(1).reduce({}) {|h,(k,v)| (h[k] ||= []) << v; h}[:desc].join("<br/>") if vacation_arr.length > 0
    if holiday_arr.length > 0
      return holiday_arr
    else
      return vacation_arr
    end
    return
  end

  def pad_beginning_of_month(week_day)
    (0..week_day-1).map do |d|
      @day_id += 1
      @days_hash.merge!({@day_id => {dow: d, week: @week}})
    end
    @day_id += 1
  end

  def pad_end_of_month(week_day, days_in_month)
    (week_day+1..6).map do |d|
      @day_id += 1
      @days_hash.merge!({@day_id => {dow: d, week: @week}})
    end
  end

  def fill_in_day(day, date_value, week_day)
    content_arr = fill_day_contents(date_value)
    contents_hash = {value: day, dow: week_day, week: @week}
    billable = calculate_billable(content_arr, week_day)
    business = calculate_business(content_arr, week_day)
    contents_hash.merge!({billable?: billable})
    contents_hash.merge!({business_day: get_business_day(date_value)}) if business
    contents_hash.merge!({contents: content_arr})
    {@day_id => contents_hash}
  end

  def get_business_day(date_value)
    @business_day = 0 if @business_day.nil?
    @old_month = date_value.month if @old_month.nil?
    if @old_month != date_value.month
      @business_day = 0
      @old_month = date_value.month
    end
    @business_day += 1
  end

  def fill_day_contents(date_value)
    content_arr = []
    content_arr.append!(get_holiday_content(date_value))
    content_arr.append!(get_vacation_content(date_value))
    content_arr.append!(get_birthday_content(date_value))
    content_arr.append!(get_anniversary_content(date_value))
    content_arr.append!(get_other_content(date_value))
    content_arr
  end

  def calculate_billable(content_arr, week_day)
    content_arr.each {|a| return false if ["Holiday","Vacation"].include?(a[:type]) }
    (1..5).include?(week_day) ? true : false
  end

  def calculate_business(content_arr, week_day)
    content_arr.each {|a| return false if ["Holiday"].include?(a[:type]) }
    (1..5).include?(week_day) ? true : false
  end

  def get_holiday_content(date_value)
    row = nil
    holidays.map {|a| row = a if a.include?(date_value) }
    return {type:"Holiday", desc:row[2], display:true} unless row.nil?
    nil
  end

  def holidays
    [
      [1, Date.new(2015,1,1), "New Year\'s Day"],
      [2, Date.new(2015,2,16), "Family Day"],
      [3, Date.new(2015,4,3), "Good Friday"],
      [4, Date.new(2015,5,18), "Victoria Day"],
      [5, Date.new(2015,7,1), "Canada Day"],
      [6, Date.new(2015,8,3), "Civic Holiday"],
      [7, Date.new(2015,9,7), "Labour Day"],
      [8, Date.new(2015,10,12), "Thanksgiving"],
      [9, Date.new(2015,11,11), "Remembrance Day"],
      [10, Date.new(2015,12,25), "Christmas Day"],
      [11, Date.new(2015,12,28), "Boxing Day"],
      [12, Date.new(2016,1,1), "New Year\'s Day"],
      [13, Date.new(2016,2,15), "Family Day"],
      [14, Date.new(2016,3,25), "Good Friday"],
      [15, Date.new(2016,5,23), "Victoria Day"],
      [16, Date.new(2016,7,1), "Canada Day"],
      [17, Date.new(2016,8,1), "Civic Holiday"],
      [18, Date.new(2016,9,5), "Labour Day"],
      [19, Date.new(2016,10,10), "Thanksgiving"],
      [20, Date.new(2016,11,11), "Remembrance Day"],
      [21, Date.new(2016,12,27), "Christmas Day"],
      [22, Date.new(2016,12,26), "Boxing Day"]
    ]
  end

  def get_vacation_content(date_value)
    row = nil
    vacations.map {|a| row = a if a.include?(date_value) }
    unless row.nil?
      content = {type:"Vacation", desc:row[2], display:true}
      return content
    end
    nil
  end

  def vacations
    [
      [1, Date.new(2015,4,24), "Vancouver"],
      [2, Date.new(2015,4,27), "Vancouver"],
      [3, Date.new(2015,4,28), "Vancouver"],
      [4, Date.new(2015,6,18), "Halifax"],
      [5, Date.new(2015,6,19), "Halifax"],
      [6, Date.new(2015,6,22), "Halifax"],
      [7, Date.new(2015,6,23), "Halifax"],
      [8, Date.new(2015,6,24), "Halifax"],
      [9, Date.new(2015,6,25), "Halifax"],
      [10, Date.new(2015,6,26), "Halifax"],
      [11, Date.new(2015,6,29), "Halifax"],
      [12, Date.new(2015,8,4), "Vancouver"],
      [13, Date.new(2015,8,5), "Vancouver"],
      [14, Date.new(2015,8,6), "Kelowna"],
      [15, Date.new(2015,8,7), "Kelowna"],
      [16, Date.new(2015,11,19), "Victoria"],
      [17, Date.new(2015,11,20), "Victoria"],
      [17, Date.new(2015,11,21), "Victoria"],
    ]
  end

  def get_birthday_content(date_value)
    row = nil
    birthdays.map {|a| row = a if a.include?(date_value) }
    unless row.nil?
      content = {type:"Birthday", desc:row[2], display:true}
      return content
    end
    nil
  end

  def birthdays
    []
  end

  def get_anniversary_content(date_value)
    row = nil
    anniversaries.map {|a| row = a if a.include?(date_value) }
    unless row.nil?
      content = {type:"Birthday", desc:row[2], display:true}
      return content
    end
    nil
  end

  def anniversaries
    []
  end

  def get_other_content(date_value)
    row = nil
    others.map {|a| row = a if a.include?(date_value) }
    unless row.nil?
      content = {type:"Birthday", desc:row[2], display:true}
      return content
    end
    nil
  end

  def others
    []
  end
end
