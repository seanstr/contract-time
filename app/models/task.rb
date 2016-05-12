class Task < ActiveRecord::Base
  belongs_to :project
  has_many :time_entries
  
  VIEW_FIELDS = %W(project_name  name description estimated_start_date estimated_end_date estimated_duration actual_start_date
                    actual_end_date actual_duration rate active )
  
  def project_name
    self.project.name
  end
end
