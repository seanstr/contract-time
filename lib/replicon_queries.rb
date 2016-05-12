def get_user_projects(user_id)
  [{ "Action" => "Query",
     "DomainType" => "Replicon.Project.Domain.Project",
     "QueryType" => "TimesheetProjects",
     "Args" => [{ "__type" => "Replicon.Domain.User",
                  "Identity" => user_id}],
     "Load" => [{ "Relationship" => "ProjectClients" }]
  }]
end
# list Id + Name description: res["Value"].each {|i| puts "#{i["Properties"]["Id"].to_s}  #{i["Properties"]["Name"]}" };nil

def get_user_id(login_name)
  { "Action" => "Query",
    "DomainType" => "Replicon.Domain.User",
    "QueryType" => "UserByLoginName",
    "Args" => [login_name]
  }
end

# Query all the open tasks that are assigned to the given user
def get_all_open_tasks_by_user(login_id)
  [{ "Action" => "Query",
     "QueryType" => "AllOpenTasksByUser",
     "DomainType" => "Replicon.Project.Domain.Task",
     "Args" => [{ "__type" => "Replicon.Domain.User",
                "Identity" => login_id
              }
             ]
   }
  ]
end
# list Id + HierarchyTaskName description: res["Value"].each {|i| puts "#{i["Properties"]["Id"].to_s}  #{i["Properties"]["HierarchyTaskName"]}" };nil


def get_timesheet_by_user_date( user_id, entry_date)
  [{ "Action" => "Query",
      "QueryType" => "TimesheetByUserDate",
      "DomainType" => "Replicon.TimeSheet.Domain.Timesheet",
      "Args" => [{ "__type" => "Replicon.Domain.User",
                   "Identity" => user_id
                 },
                 { "__type" => "Date",
                   "Year" => entry_date.year,
                   "Month" => entry_date.month,
                   "Day" => entry_date.day
                 }],
      "Load" => [ { "Relationship" => "TimeRows",
                    "Load" => [{"Relationship" => "Activity"},
                               {"Relationship" => "Cells"}
                              ]
                  }
                ]
  }]
end

# Add a timesheet row that specifies that billing is at a department rate to an existing timesheet.
def add_timesheet_row_with_billing_by_department
  [{
      "Action" => "Edit",
      "Type" => "Replicon.TimeSheet.Domain.Timesheet",
      "Identity" => "46",
      "Operations" => [{ "__operation" => "CollectionAdd",
                         "Collection" => "TimeRows",
                         "Operations" => [{ "__operation" => "SetProperties",
                                            "Task" => { "__type" => "Replicon.Project.Domain.Task",
                                                        "Identity" => "8"},
                                            "Client" => { "__type" => "Replicon.Project.Domain.Client",
                                                          "Identity" => "2"}
                                          },
                                          { "__operation" => "SetTaskRowBilling",
                                            "BillingType" => { "__type" => "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                                                               "Identity" => "DepartmentOverrideRate"},
                                            "BillingDepartment" => { "__type" => "Replicon.Domain.Department",
                                                                     "Identity" => "2"},
                                            "Project" => { "__type" => "Replicon.Project.Domain.Project",
                                                                       "Identity" => "1"}
                                          }
                                         ]
                       }
                      ]
    }
  ]
end

# login_id = "188"
# comment = "test api"
# task_id =
# project_id = 489
# hours = 3
# minutes = 30
# year = 2014
# month = 7
# day = 7

def add_timesheet_entry(login_id, project_id, task_id, entry_date, time_in, time_out, comment)
  [{  "Action" => "Edit",
      "Type" => "Replicon.Suite.Domain.EntryTimesheet",
      "Identity" => login_id,
      "Operations" => [
         {  "__operation" => "CollectionAdd",
            "Collection" => "TimeEntries",
            "Operations" => [
               {  "__operation" => "SetProperties",
                  "CalculationModeObject" => { "__type" => "Replicon.TimeSheet.Domain.CalculationModeObject", "Identity" => "CalculateDuration" },
                  "EntryDate" => { "__type" => "Date", "Year" => entry_date.year, "Month" => entry_date.month, "Day" => entry_date.day },
                  "TimeIn" => { "__type" => "Time", "Hour" => time_in.hour, "Minute" => time_in.min },
                  "TimeOut" => {"__type" => "Time", "Hour" => time_out.hour, "Minute" => time_out.min },
                  "Comments" => comment,
                  "Task" => { "Identity" => task_id },
                  "Activity" => { "Identity" => "1" }
               },
               {  "__operation" => "SetTimeEntryBilling",
                  "BillingType" => { "__type" => "Replicon.Project.Domain.Timesheets.TimesheetBillingType", "Identity" => "NonBillable" },
                  "Project" => { "__type" => "Replicon.Project.Domain.Project", "Identity" => project_id }
               }
            ]
         }
      ]
   }
  ]
end

def add_timesheet_entry_no_project(login_id, task_id, entry_date, time_in, time_out, comment)
  req = [{  "Action" => "Edit",
      "Type" => "Replicon.Suite.Domain.EntryTimesheet",
      "Identity" => login_id,
      "Operations" => [
         {  "__operation" => "CollectionAdd",
            "Collection" => "TimeEntries",
            "Operations" => [
               {  "__operation" => "SetProperties",
                  "CalculationModeObject" => { "__type" => "Replicon.TimeSheet.Domain.CalculationModeObject", "Identity" => "CalculateDuration" },
                  "EntryDate" => { "__type" => "Date", "Year" => entry_date.year, "Month" => entry_date.month, "Day" => entry_date.day },
                  "TimeIn" => { "__type" => "Time", "Hour" => time_in.hour, "Minute" => time_in.min },
                  "TimeOut" => {"__type" => "Time", "Hour" => time_out.hour, "Minute" => time_out.min },
                  "Comments" => comment,
                  "Activity" => { "Identity" => "1" }
               }
            ]
         }
      ]
   }
  ]
end
