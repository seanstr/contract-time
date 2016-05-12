class CreatePredefinedTags < ActiveRecord::Migration
  def change
    create_table :predefined_tags do |t|
      t.integer :id
      t.string :predefined_tag
      t.string :tag_id
      t.string :int
      t.string :description

      t.timestamps
    end
  end
end
