module InvoicesHelper

  def create_invoice_table(pdf, data_array, header=true, lines=:all)
    PDF::SimpleTable.new do |tab|
      tab.column_order.push(*Invoice::INVOICE_ITEMS)

      Invoice::INVOICE_ITEMS.each do |c|
        tab.columns[c] = PDF::SimpleTable::Column.new(c) do |col|
          col.heading = PDF::SimpleTable::Column::Heading.new(c.humanize) do |heading|
            heading.bold = true
            heading.justification = :right if ["amount", "hours", "rate"].include?(c)
          end
          col.justification = :right if ["amount", "hours", "rate"].include?(c)
          col.width = Invoice::INVOICE_COLUMN_WIDTHS[c].to_i
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

  def invoice_list_items
    %w(invoice_number date_created start_date end_date date_sent date_paid hours)
  end

  def format_currency(data_array, column_name)
    data_array.each { |ddd| ddd[column_name] = number_to_currency(ddd[column_name]) }
  end

  def table_row(cls, cols=[])
		tag = ""
		cols.each do |c|
			#logger.debug "c.is_a? Array = #{c.is_a? Array}"
			if c.is_a? Array
				#logger.debug "c[1].is_a? Hash = #{c[1].is_a? Hash}"
				if c[1].is_a? Hash
					tag += content_tag("td", c[0]=="&nbsp;" ? c[0] : h(c[0]), c[1])
				else
					tag += content_tag("td", c[0]=="&nbsp;" ? c[0] : h(c[0]), :class => c[1])
				end
			else
				tag += content_tag("td", c=="&nbsp;" ? c : h(c))
			end
		end
		if cls.is_a? Hash
			#logger.debug content_tag("tr", tag, cls)
			content_tag("tr", tag, cls)
		else
			#logger.debug content_tag("tr", tag, :class => cls)
			content_tag("tr", tag, :class => cls)
		end
	end

end
