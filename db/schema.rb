# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140220191926) do

  create_table "addresses", :force => true do |t|
    t.integer  "addressable_id"
    t.string   "addressable_type"
    t.string   "address1"
    t.string   "address2"
    t.string   "address3"
    t.string   "city"
    t.string   "province"
    t.string   "postal_code"
    t.string   "status"
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "clients", :force => true do |t|
    t.string   "name"
    t.string   "company"
    t.string   "status"
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "companies", :force => true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "gst_number"
  end

  create_table "consultants", :force => true do |t|
    t.string   "name"
    t.string   "status"
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "company_id"
    t.decimal  "rate",       :precision => 10, :scale => 0
  end

  create_table "consultants_projects", :force => true do |t|
    t.integer "consultant_id"
    t.integer "project_id"
  end

  create_table "emails", :force => true do |t|
    t.string   "email"
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "invoices", :force => true do |t|
    t.date     "date_created"
    t.date     "date_sent"
    t.date     "date_paid"
    t.date     "start_date"
    t.date     "end_date"
    t.decimal  "amount",         :precision => 10, :scale => 2
    t.decimal  "gst",            :precision => 10, :scale => 2
    t.integer  "invoice_number"
    t.integer  "company_id"
    t.string   "pdf_filename"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "consultant_id"
    t.decimal  "hours",          :precision => 8,  :scale => 2
    t.integer  "client_id"
  end

  create_table "phones", :force => true do |t|
    t.string   "phone_number"
    t.string   "phone_type"
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "predefined_tags", :force => true do |t|
    t.string   "predefined_tag"
    t.string   "tag_id"
    t.string   "description"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
  end

  create_table "predefined_tags_bkp", :force => true do |t|
    t.string  "pre_defined_tag", :limit => 50,  :null => false
    t.integer "tag_id",                         :null => false
    t.string  "description",     :limit => 200, :null => false
  end

  create_table "projects", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "estimated_start_date"
    t.datetime "estimated_end_date"
    t.datetime "actual_start_date"
    t.datetime "actual_end_date"
    t.decimal  "estimated_duration",   :precision => 10, :scale => 0
    t.decimal  "actual_duration",      :precision => 10, :scale => 0
    t.integer  "client_id"
    t.string   "status"
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", :force => true do |t|
    t.string   "name",              :limit => 40
    t.string   "authorizable_type", :limit => 40
    t.integer  "authorizable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles_users", :id => false, :force => true do |t|
    t.integer  "user_id"
    t.integer  "role_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", :force => true do |t|
    t.integer "task_id",                   :null => false
    t.string  "hash_tag",   :limit => 200, :null => false
    t.date    "created_at"
    t.string  "created_by", :limit => 200
    t.date    "updated_at"
    t.string  "updated_by", :limit => 200
    t.boolean "active",                    :null => false
  end

  add_index "tags", ["task_id", "hash_tag"], :name => "task_id"

  create_table "tags_bkp_20140220", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "task_id"
    t.string   "hash_tag"
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
  end

  create_table "tasks", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "estimated_start_date"
    t.datetime "estimated_end_date"
    t.datetime "actual_start_date"
    t.datetime "actual_end_date"
    t.decimal  "estimated_duration",   :precision => 10, :scale => 0
    t.decimal  "actual_duration",      :precision => 10, :scale => 0
    t.integer  "project_id"
    t.string   "status"
    t.boolean  "active"
    t.string   "created_by"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "rate",                 :precision => 10, :scale => 0
  end

  create_table "time_entries", :force => true do |t|
    t.datetime "entry_date"
    t.time     "start_time"
    t.time     "end_time"
    t.boolean  "active"
    t.integer  "task_id"
    t.integer  "consultant_id"
    t.text     "notes"
    t.string   "created_by"
    t.string   "updated_by"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "hashed_password"
    t.string   "salt"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "userid"
    t.string   "email"
    t.string   "firstname"
    t.string   "lastname"
    t.string   "password"
    t.string   "login"
    t.string   "crypted_password"
    t.string   "remember_token"
    t.string   "password_reset_code",       :limit => 40
    t.string   "activation_code",           :limit => 40
    t.string   "remember_token_expires_at", :limit => 40
    t.datetime "activated_at"
    t.datetime "deleted_at"
    t.string   "state",                                   :default => "passive"
  end

end
