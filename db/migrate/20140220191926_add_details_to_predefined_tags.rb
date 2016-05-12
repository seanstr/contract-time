class AddDetailsToPredefinedTags < ActiveRecord::Migration
  def change
    add_column :predefined_tags, :active, :boolean

    add_column :predefined_tags, :created_by, :string

    add_column :predefined_tags, :updated_by, :string

  end
end
