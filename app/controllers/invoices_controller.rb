class InvoicesController < ApplicationController

  INVOICE_DETAIL_QRY = %(
    select
      concat(p.name, ' / ', t.name) "project/task", round(sum(time_to_sec(timediff(end_time,start_time))) /60 /60, 1) hours,
      format(case when t.rate != 0 then t.rate else c.rate end, 2) rate,
      sum(time_to_sec(timediff(end_time,start_time))) /60 /60 * case when t.rate != 0 then t.rate else c.rate end amount,
      (select max(ifnull(invoice_number,0))+1 from invoices) as invoice_number
    from time_entries
      inner join consultants c on c.id = time_entries.consultant_id
      inner join tasks t on t.id = time_entries.task_id
      inner join projects p on t.project_id = p.id
    where (entry_date >= ? and entry_date < ?)
      and time_entries.consultant_id = ?
      and p.client_id = ?
    group by task_id
  )

  INVOICE_DETAIL_QRY2 = %(
    select
      p.name project, t.name task, te.notes,
      concat(p.name, ' / ', t.name) "project/task", round(time_to_sec(timediff(end_time,start_time)) /60 /60, 1) hours,
      format(case when t.rate != 0 then t.rate else c.rate end, 2) rate,
      time_to_sec(timediff(end_time,start_time)) /60 /60 * case when t.rate != 0 then t.rate else c.rate end amount,
      (select max(ifnull(invoice_number,0))+1 from invoices) as invoice_number
    from time_entries te
      inner join consultants c on c.id = te.consultant_id
      inner join tasks t on t.id = te.task_id
      inner join projects p on t.project_id = p.id
    where (te.entry_date >= ? and te.entry_date < ?)
      and te.consultant_id = ?
      and p.client_id = ?
    order by te.id
  )

  GST = 0.05

  def add
    @title = "New Invoice"
    @companies = Company.find :all
    @consultants = Consultant.find :all
    @clients = Client.find :all

    @beginning_of_month = Date.today.beginning_of_month
    @end_of_month = Date.today.end_of_month

    @beginning_of_last_month = Date.today.beginning_of_month.months_ago(1)
    @end_of_laast_month = Date.today.end_of_month.months_ago(1)

    if param_posted?(:class_name)
      save_invoice
      redirect_to :action => "list", :id => @invoice.id
    end
  end

  def edit
    @title = "Edit Invoice"
    @invoice = Invoice.find params[:id]
    @class_name = @invoice
    @companies = Company.find :all
    @consultants = Consultant.find :all
    @tasks = Task.find :all
    @clients = Client.find :all
    @beginning_of_month = Date.today.beginning_of_month
    @end_of_month = Date.today.end_of_month

    if param_posted?(:class_name)
      data_array = Invoice.find_by_sql [INVOICE_DETAIL_QRY, @invoice.start_date, @invoice.end_date, @invoice.consultant_id, @invoice.client_id]
      if @invoice.update_attributes(params[:class_name])
        flash[:notice] = "Changes saved"
        redirect_to :action => "list", :id => @invoice.id
      end
    end
  end

  def index
    @invoice = Invoice.find params[:id]
  end

  def list
    @invoices = Invoice.find :all, :order => "invoice_number desc"
    @companies = Company.find :all
    @consultants = Consultant.find :all
    @clients = Client.find :all
    @beginning_of_month = Date.today.beginning_of_month
    @end_of_month = Date.today.end_of_month
    @beginning_of_last_month = Date.today.beginning_of_month.months_ago(1)
    @end_of_last_month = Date.today.end_of_month.months_ago(1)
  end

  def delete
  end

  def invoice2
    @invoice_number = params[:invoice_number]
    @invoice_date = params[:invoice_date]
    #@invoice_date = "May 31, 2013"

    company = Company.find(params[:company_id])
    @address = [company.name,
               company.addresses.first.address1,
               company.addresses.first.address2,
               company.addresses.first.address3,
               [company.addresses.first.city, company.addresses.first.province, company.addresses.first.postal_code].join(' ')].compact
    @gst_number = company.gst_number
    @consultant = Consultant.find params[:consultant_id]
    @client = Client.find params[:client_id]
    @rails_pdf_name = "invoice2 #{@invoice_number} - #{@client.name} - #{params[:start_date].to_date.strftime("%Y %m")} - #{Time.now.strftime("%Y %m %d")}"

    @invoice_info =  [@client.name,
                      @client.addresses.first.address1,
                      [@client.addresses.first.city,
                       @client.addresses.first.province,
                       @client.addresses.first.postal_code].join(' ')].compact

    end_date = params[:end_date]
    end_date = end_date.to_time.advance(:days => 1).to_date
    @data_array = Invoice.find_by_sql [INVOICE_DETAIL_QRY2, params[:start_date], end_date, params[:consultant_id], params[:client_id]]
    @total_hrs = totals(@data_array, "hours")
    @total_amount = totals(@data_array, "amount")
    @gst_amount = @total_amount * GST

    respond_to do |format|
      format.html
      format.pdf do
        #render :pdf => @rails_pdf_name, :wkhtmltopdf => 'C:\Program Files (x86)\wkhtmltopdf\wkhtmltopdf.exe'
        render :pdf => @rails_pdf_name, :wkhtmltopdf => 'C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe'
      end
    end
  end

  def invoice
    @invoice_number = params[:invoice_number]
    @invoice_date = params[:invoice_date]
    #@invoice_date = "May 31, 2013"

    company = Company.find(params[:company_id])
    @address = [company.name,
               company.addresses.first.address1,
               company.addresses.first.address2,
               company.addresses.first.address3,
               [company.addresses.first.city, company.addresses.first.province, company.addresses.first.postal_code].join(' ')].compact
    @gst_number = company.gst_number
    @consultant = Consultant.find params[:consultant_id]
    @client = Client.find params[:client_id]
    @rails_pdf_name = "invoice #{@invoice_number} - #{@client.name} - #{params[:start_date].to_date.strftime("%Y %m")} - #{Time.now.strftime("%Y %m %d")}"

    @invoice_info =  [@client.name,
                      @client.addresses.first.address1,
                      [@client.addresses.first.city,
                       @client.addresses.first.province,
                       @client.addresses.first.postal_code].join(' ')].compact
    if @client.id = 2
      @invoice_info << "Phone: (403) 538-4000"
      @invoice_info << "Fax: (403) 538-4100"
    end

    end_date = params[:end_date]
    end_date = end_date.to_time.advance(:days => 1).to_date
    @data_array = Invoice.find_by_sql [INVOICE_DETAIL_QRY, params[:start_date], end_date, params[:consultant_id], params[:client_id]]
    @total_hrs = totals(@data_array, "hours")
    @total_amount = totals(@data_array, "amount")
    @gst_amount = @total_amount * GST

    respond_to do |format|
      format.html
      format.pdf do
        #render :pdf => @rails_pdf_name, :wkhtmltopdf => 'C:\Program Files (x86)\wkhtmltopdf\wkhtmltopdf.exe'
        #render :pdf => @rails_pdf_name, :wkhtmltopdf => '/C/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe'
        render :pdf => @rails_pdf_name, :wkhtmltopdf => 'C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe'
        #render :pdf => @rails_pdf_name, :wkhtmltopdf => '/C/Program Files/wkhtmltopdf/wkhtmltopdf.exe'
      end
    end
  end

  private

  def totals(data_array, column)
    totals = 0.00
    data_array.each do |d|
      totals += d.attributes[column].to_f
    end
    totals
  end

  def save_invoice
    update_params()

    @invoice = Invoice.new(params[:class_name])
    @invoice.date_created = Time.now
    end_date = @invoice.end_date.to_time.advance(:days => 1).to_date
    project_name, @invoice.hours, @invoice.amount = retrieve_invoice_total(end_date)
    @invoice.gst = @invoice.amount * GST
    if project_name.nil?
      @invoice.invoice_number = Invoice.maximum(:invoice_number) + 1
    else
      @invoice.invoice_number = Invoice.maximum(:invoice_number) + 1
      #@invoice.invoice_number = data_array[0].invoice_number
    end
    flash[:notice] = "Invoice not saved!"
    flash[:notice] = "Invoice saved" if @invoice.save
  end

  def retrieve_invoice_total(end_date)
    data_array = Invoice.find_by_sql [INVOICE_DETAIL_QRY, @invoice.start_date, end_date, @invoice.consultant_id, @invoice.client_id]
    hours = data_array[0].nil? ? 0 : totals(data_array, "hours")
    total = data_array[0].nil? ? 0 : totals(data_array, "amount")
    [data_array[0], hours, total]
  end

  def update_params
    p = params["class_name"]
    if p["this_month"] == "this_month"
      set_date_params(p, "start_date", "this_month_start_date")
      set_date_params(p, "end_date", "this_month_end_date")
      set_date_params(p, "date_sent", "this_month_date_sent")
    else
      set_date_params(p, "start_date", "last_month_start_date")
      set_date_params(p, "end_date", "last_month_end_date")
      set_date_params(p, "date_sent", "last_month_date_sent")
    end
    p.each_pair {|k,v| p.delete(k) if k.start_with?("this_month") || k.start_with?("last_month") }
  end

  def set_date_params(p, new_date_params, from_date_params)
    (1..3).each {|i| p["#{new_date_params}(#{i.to_s}i)"] = p["#{from_date_params}(#{i.to_s}i)"]}
  end
end
