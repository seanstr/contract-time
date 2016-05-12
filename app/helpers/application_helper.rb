# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  require 'string'
  require 'object'

  DB_STRING_MAX_LENGTH = 255
  DB_TEXT_MAX_LENGTH = 40000
  HTML_TEXT_FIELD_SIZE = 15
  HTML_LARGE_TEXT_FIELD_SIZE = 50

  STATUS_VALUES = %W(Active Inactive)
  def user_logged_in?
    session[:user_id]
  end

  # Return a link for use in layout navigation.
  def nav_link(text, controller, action="index")
    content_tag(:div, "#{img} #{link}", :id => "nav_row") do
      image_tag("red_arrow.jpg") + link_to_unless_current(text, :id => nil, :action => action, :controller => controller)
    end
  end

  def password_field_for(form, field,
                     size=HTML_TEXT_FIELD_SIZE,
                     maxlength=DB_STRING_MAX_LENGTH)
    content_tag(:div, "#{label} #{form_field}", :class => "form_row") do
      form.label(field.humanize) + form.password_field(field, :size => size, :maxlength => maxlength)
    end
  end

  def text_field_for(form, field,
                     size=HTML_TEXT_FIELD_SIZE,
                     maxlength=DB_STRING_MAX_LENGTH)
    content_tag(:div, :class => "form_row") { form.label(field.humanize) + form.text_field(field, :size => size, :maxlength => maxlength) }
  end

  def text_area_field_for(form, field, rows=10,
                     size=HTML_LARGE_TEXT_FIELD_SIZE,
                     maxlength=DB_STRING_MAX_LENGTH)
    content_tag(:div, :class => "form_row") { form.label(field.humanize) + 
                                              form.text_area(field, :size => "#{HTML_LARGE_TEXT_FIELD_SIZE}x#{rows}") }
  end

  def date_field_for(form, field, options={} )
    content_tag(:div, :class => "form_row") { form.label(field.humanize) + form.date_select(field, options) }
  end

  def time_field_for(form, field)
    content_tag(:div, :class => "form_row") do
      form.label(field.humanize) + form.time_select(field, {:default => Time.now, :minute_step => 15})
    end
  end

  # select_field_for form, "consultant_id", "consultant", "name", @consultants
  def select_field_for(form, field, label, desc_column_name, collection)
    content_tag( :div, :class => "form_row") do
      form.label(field.humanize) +
        form.select(field, collection.collect {|c| [c.instance_eval(desc_column_name), c.id] }, { :include_blank => false })
    end
  end

  def status_select_field_for(form, field)
    content_tag( :div, :class => "form_row") do
      form.label(field.humanize) +
        form.select(field, STATUS_VALUES.collect {|c| [c] }, { :include_blank => false })
    end
  end

  def checkbox_field_for(form, field, checked="checked")
    content_tag(:div, :class => "form_row") { form.label(field.humanize) + form.check_box(field,{:checked=>checked})}
  end

  def radio_field_for(form, method, field, name, checked)
    content_tag(:div, class: "form_row") { form.label(name.humanize) + form.radio_button(field, name, {:checked=>checked})}
  end

  def fmt(row, fld_name)
    fld = row.instance_eval(fld_name) unless row.nil?
    case fld.class.to_s
    when "Time" then
      if fld_name =~ /time/
        fld.to_s(:time)
      else
        fld.to_s(:compact_date)
      end
    when "ActiveSupport::TimeWithZone" then
      fld.to_s(:compact_date)
    else
      fld
    end
  end

  def format_field(tag, row, field_name, css_class = nil)
    field = " "
    field = row.instance_eval(field_name) unless row.nil?
    logger.debug "format_field: field=#{field}"
    formatted_field = case field.class.to_s
                      when "Time" || "ActiveSupport::TimeWithZone" then
                        if field_name =~ /time/
                          h(field.to_s(:time))
                        else
                          h(field.to_s(:compact_date))
                        end
                      else
                        h field
                      end
    content_tag(tag, "#{formatted_field}", :class => css_class)
  end

  def header_tag(field, css_class = nil)
    content_tag("th", "#{field.humanize}", :class => css_class)
  end

  def td_tag(field, css_class = nil)
    content_tag("td", "#{field.humanize}", :class => css_class)
  end

  # Return true if results should be paginated.
  def paginated?
    @pages and @pages.length > 1
  end
end

