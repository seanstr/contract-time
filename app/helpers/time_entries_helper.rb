module TimeEntriesHelper
  
  TIMESHEET_COLUMN_WIDTHS = {"entry_date" => "75", "task" => "150", "hours" => "150"}
  
  def create_time_entry_table(pdf, data_array, header=true, lines=:all)
    PDF::SimpleTable.new do |tab|
      tab.column_order.push(*list_items)
      
      list_items.each do |c|
        tab.columns[c] = PDF::SimpleTable::Column.new(c) do |col|
          col.heading = PDF::SimpleTable::Column::Heading.new(c.humanize) do |heading| 
            heading.bold = true
          end
          col.width = TIMESHEET_COLUMN_WIDTHS[c].to_i
        end
      end
      
      tab.show_lines    = lines
      tab.show_headings = header
      tab.orientation   = :right
      tab.position      = :left
      tab.shade_rows    = :none
      
      tab.data = data_array
      tab.render_on pdf
    end
  end
  
=begin      
entry_date, task_id, sec_to_time(sum(time_to_sec(timediff(end_time,start_time)))) hours, week(entry_date) week      


Timesheet
Entry date        Task                  Hours
Fri Aug 01, 2008  AB Bugs and issues	  7 hours and 30 minutes
Week hours:	7.5
 		
Thu Aug 07, 2008  AB Bugs and issues	  7 hours
Fri Aug 08, 2008  AB Bugs and issues	  8 hours and 30 minutes
Week hours:	15.5
 		
Mon Aug 11, 2008  AB Bugs and issues	  12 hours
Tue Aug 12, 2008  AB Bugs and issues	  5 hours and 30 minutes
Tue Aug 12, 2008  Alberta meetings	    1 hour
Wed Aug 13, 2008  AB Bugs and issues	  7 hours
Wed Aug 13, 2008  Alberta meetings	    1 hour and 30 minutes
Week hours:	42.5

Mon Aug 25, 2008	AB Bugs and issues	  6 hours and 30 minutes
Tue Aug 26, 2008	AB Bugs and issues	  7 hours and 30 minutes
Wed Aug 27, 2008	AB Bugs and issues	  8 hours
Thu Aug 28, 2008	AB Bugs and issues	  6 hours and 30 minutes
Fri Aug 29, 2008	AB Bugs and issues	  8 hours and 30 minutes
Week hours:	37.0
 		
Total		135.0 hours
=end
  
  def list_items
    %w(entry_date task hours)
  end

  def summary_table(rec, css_class = nil)
    #return rec[1]
    case rec[0] 
    when "company" 
      if @old_co != rec[1].name
        tag = "h2" 
        formatted_field = rec[1].name
        @old_co = rec[1].name
      end 
    when "consultant" 
      if @old_con != rec[1].name 
        tag = "h3" 
        formatted_field = rec[1].name
        @old_con = rec[1].name 
      end 
    when "client" 
      if @old_client != rec[1].name 
        tag = "h4" 
        formatted_field = rec[1].name
        @old_client = rec[1].name 
      end 
    when "invoices" 
      tag = "table"
      formatted_field = "<tr><th>Month</th><th>Hrs</th><th>Amount</th><th>GST</th><th>Total</th><th>Budget Savings</th></tr>"
      fld = ""
      rec[1].each do |inv| 
        fld += "<tr>"
        fld += "<td>#{inv.invoice_number.to_s}</td>"
        fld += "<td>#{inv.hours.to_s}</td>"
        fld += "<td>#{inv.amount.to_s}</td>"
        fld += "<td>#{inv.gst.to_s}</td>"
        fld += "<td>#{(inv.amount + inv.gst).to_s}</td>"
        fld += "<td>#{((inv.amount + inv.gst) * 0.3).to_s}</td>"
        fld += "</tr>"
      end 
      formatted_field += fld
    end 
    content_tag(tag, "#{formatted_field}", :class => css_class)
  end 
end
