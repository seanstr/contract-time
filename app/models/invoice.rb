class Invoice < ActiveRecord::Base
  include ActionView::Helpers::NumberHelper
  belongs_to :company
  belongs_to :client

  INVOICE_ITEMS = %w(project/task hours rate amount)
  INVOICE_COLUMN_WIDTHS = {"project/task" => "250", "hours" => "50", "rate" => "50", "amount" => "75"}

  GST = 0.05

  def format_amount
    number_to_currency(amount)
  end

  def total
    self.amount.to_f + self.gst
  end

  def format_total
    number_to_currency(self.amount.to_f + self.gst)
  end

  def gst
    self.amount.to_f * GST
  end

  def format_gst
    number_to_currency(self.amount.to_f * GST)
  end

end
