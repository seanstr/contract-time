class AddDetailsToTags < ActiveRecord::Migration
  def change
    add_column :tags, :task_id, :integer

    add_column :tags, :hash_tag, :string

    add_column :tags, :active, :boolean

    add_column :tags, :created_by, :string

    add_column :tags, :updated_by, :string

  end
end
