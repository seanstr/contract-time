[ 
 { 
  "Action": "Edit", 
  "Type": "Replicon.Suite.Domain.EntryTimesheet", 
  "Identity": "6417", 
  "Operations": 
   [ 
    { "__operation": "CollectionAdd", 
      "Collection": "TimeEntries", 
      "Operations": 
       [ 
        { "__operation": "SetProperties", 
          "Duration":
           { "__type": "Timespan", "Hours": 1, "Minutes": 30 }
          "EntryDate": 
           { "__type": "Date", "Year": 2012, "Month": 9, "Day": 5 }, 
          "Comments": "hello 123", 
          "Task": { "Identity": "1" }, 
          "Activity": { "Identity": "1" } 
        }, 
        { "__operation": "SetTimeEntryBilling", 
          "BillingType": 
           { "__type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType", 
             "Identity": "RoleRate" }, 
          "Project": { "__type": "Replicon.Project.Domain.Project", "Identity": "1" }, 
          "ProjectRole": { "Identity": "1" } 
        } 
      ] 
    } 
  ] 
 }
]

*****************************************************************************

[ 
 { "Action": "Edit", 
   "Type": "Replicon.TimeSheet.Domain.Timesheet", 
   "Identity": "6417", 
   "Operations": 
    [ { "__operation": "CollectionAdd", 
        "Collection": "TimeRows", 
        "Operations": 
         [ 
          { "__operation": "SetProperties", 
            "Task": { "__type": "Replicon.Project.Domain.Task", "Identity": "1" }, 
            "Client": { "__type": "Replicon.Project.Domain.Client", "Identity": "2" } 
          }, 
          { "__operation": "SetTaskRowBilling", 
            "BillingType": { "__type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType", 
                            "Identity": "UserOverrideRate" 
                           }, 
            "User": { "__type": "Replicon.Domain.User", "Identity": "2" }, 
            "Project": { "__type": "Replicon.Project.Domain.Project", 
                         "Identity": "1" 
                       } 
          } 
         ] 
       } 
    ] 
 } 
]

[ { "Action": "Query", "QueryType": "AllOpenTasksByUser", "DomainType": "Replicon.Project.Domain.Task", "Args": [ { "__type": "Replicon.Domain.User", "Identity": "188" } ] } ]


"Id": 129, "Name": "A1 Service Delivery Program",
"Id": 201, "Name": "A1 Customer Portal",

Activities
"Identity": "1",  "Name": "General Labour",  "Code": "GL",
"Identity": "4",  "Name": "Training",  "Code": "T",  "Description": "Off-site courses, learning/training",
"Identity": "9",  "Name": "Team Event",  "Code": null,  "Description": "Team Building, Social Committee, etc",
"Identity": "11",  "Name": "SR&ED",

Tasks
"Identity": "178",  "Name": "A1 Service Delivery Program"
"Identity": "204",  "Name": "Public Line Rate Service Development"
"Identity": "207",  "Name": "Internet Gateway Service Development"
"Identity": "268",  "Name": "IT - Infrastructure"
"Identity": "320",  "Name": "IT - Applications and Business Systems"
"Identity": "332",  "Name": "A1 Customer Portal"
"Identity": "337",  "Name": "SuperNet Direct - Assessment Prototype"
"Identity": "340",  "Name": "IT Projects"
"Identity": "355",  "Name": "IT Enterprise Services"
"Identity": "271",  "Name": "Project: Citrix Rollout"
"Identity": "272",  "Name": "Cloud Services"
"Identity": "273",  "Name": "Communication and Reporting"
"Identity": "274",  "Name": "Desktop Initiatives"
"Identity": "275",  "Name": "IT Documentation"
"Identity": "276",  "Name": "IT Governance"
"Identity": "277",  "Name": "Network Management"
"Identity": "278",  "Name": "IT Storage Management"
"Identity": "279",  "Name": "IT Training"
"Identity": "280",  "Name": "IT Wireless"
"Identity": "282",  "Name": "Project: Office 365"
"Identity": "283",  "Name": "Project: Bring Your Own Device (BYOD)"
"Identity": "284",  "Name": "Security and Monitoring"
"Identity": "286",  "Name": "Account Management"
"Identity": "288",  "Name": "Helpdesk Support Services"
"Identity": "289",  "Name": "Backup Restore Management"
"Identity": "290",  "Name": "Server Management"
"Identity": "291",  "Name": "Email Services"
"Identity": "292",  "Name": "Asset Management"
"Identity": "293",  "Name": "Printer Management"
"Identity": "294",  "Name": "Hosting Services"
"Identity": "295",  "Name": "Phone Services"
"Identity": "296",  "Name": "Web/Video Conferencing Services"
"Identity": "315",  "Name": "100 Pair Audit"
"Identity": "360",  "Name": "GDRU"
"Identity": "326",  "Name": "Mac Support"
"Identity": "325",  "Name": "BYOD - Macs"
-----------------------------------------------------------------------------
--- Sample with a project
[{"Action": "Edit", 
  "Type": "Replicon.Suite.Domain.EntryTimesheet", 
  "Identity": "6417", 
  "Operations": [
   { "__operation": "CollectionAdd", 
      "Collection": "TimeEntries", 
      "Operations": 
       [{ "__operation": "SetProperties", 
          "CalculationModeObject": { "__type": "Replicon.TimeSheet.Domain.CalculationModeObject", "Identity": "CalculateInOutTime" },       
          "Duration": { "__type": "Timespan", "Hours": "1", "Minutes": "30" },
          "EntryDate": { "__type": "Date", "Year": "2012", "Month": "9", "Day": "5" }, 
          "Comments": "hello 123", 
          "Task": { "__type": "Replicon.Project.Domain.Task", "Identity": "178" },
          "Activity": { "Identity": "1" } 
        }, 
        { "__operation": "SetTimeEntryBilling", 
          "BillingType": { "__type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType", "Identity": "RoleRate" }, 
          "Project": { "__type": "Replicon.Project.Domain.Project", "Identity": "129" }
        } ] 
    } ] 
} ]

--- Sample without a project
[
  {
    "Action": "Edit",
    "Type": "Replicon.Suite.Domain.EntryTimesheet",
    "Identity": "6417",
    "Operations": [
      {
        "__operation": "CollectionAdd",
        "Collection": "TimeEntries",
        "Operations": [
          {
            "__operation": "SetProperties",
            "CalculationModeObject": {
              "__type": "Replicon.TimeSheet.Domain.CalculationModeObject",
              "Identity": "CalculateInOutTime"
            },
            "Duration": {
              "__type": "Timespan",
              "Hours": "2",
              "Minutes": "00"
            },
            "EntryDate": {
              "__type": "Date",
              "Year": "2012",
              "Month": "9",
              "Day": "7"
            },
            "Comments": "test 2",
            "Activity": {
              "Identity": "1"
            }
          }
        ]
      }
    ]
  }
]

--- Search for timesheets for a date range by user (188)
[ { "Action": "Query", "QueryType": "TimesheetByUserDateRange", "DomainType": "Replicon.TimeSheet.Domain.Timesheet", "Args": [ { "__type": "Replicon.Domain.User", "Identity": "188" }, { "__type": "Date", "Past": true, "Year": 2012, "Month": 9, "Day": 1 }, { "__type": "Date", "Future": true, "Year": 2012, "Month": 9, "Day": 30 } ], "Load": [ { "Relationship": "TimeRows", "Load": [ { "Relationship": "Activity" }, { "Relationship": "Cells" } ] } ] } ]

--- Response
{
  "Status": "OK",
  "Value": [
    {"Type": "Replicon.TimeSheet.Domain.Timesheet",
      "Identity": "6417",
      "Properties": {
        "Paid": false,
        "ESignature": null,
        "BankOvertime": false,
        "DisclaimerAccepted": null,
        "Id": 6417,
        "SavedOn": { "Type": "DateTime", "Year": 2012, "Month": 9, "Day": 19, "Hour": 12, "Minute": 30, "Second": 51 },
        "SavedOnUtc": {"Type": "DateTime", "Year": 2012, "Month": 9, "Day": 19, "Hour": 18, "Minute": 30, "Second": 51 },
        "DueDate": {"Type": "Date", "Year": 2012, "Month": 9, "Day": 9 },
        "StartDate": {"Type": "Date", "Year": 2012, "Month": 9, "Day": 1 },
        "EndDate": {"Type": "Date", "Year": 2012, "Month": 9, "Day": 9 },
        "TotalHours": { "Type": "Timespan", "Hours": 1, "Minutes": 30, "Seconds": 0, "Milliseconds": 0 }},
      "Relationships": {
        "TimeRows": [ 
          { "Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22190",
            "Properties": { "RowPosition": 0, "ClientFilter": 0,"Id": 22190 },
            "UserDefinedFields": { "Pay": "Regular Time"  },
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour", "Code": "GL", "Description": null, "Enabled": true, "Id": 1 }},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": { "Name": "Non-Billable" }}}},
          { "Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22191",
            "Properties": {"RowPosition": 1,"ClientFilter": 0,"Id": 22191},
            "UserDefinedFields": { "Pay": "Regular Time" },
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL", "Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22192",
            "Properties": {"RowPosition": 2,"ClientFilter": 0,"Id": 22192},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22193",
            "Properties": {"RowPosition": 3,"ClientFilter": 0,"Id": 22193},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22194",
            "Properties": {"RowPosition": 4,"ClientFilter": 0,"Id": 22194},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22195",
            "Properties": {"RowPosition": 5,"ClientFilter": 0,"Id": 22195},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22196",
            "Properties": {"RowPosition": 6,"ClientFilter": 0,"Id": 22196},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {
                  "Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22197",
            "Properties": {"RowPosition": 7,"ClientFilter": 0,"Id": 22197},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22198",
            "Properties": {"RowPosition": 8,"ClientFilter": 0,"Id": 22198},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22199",
            "Properties": {"RowPosition": 9,"ClientFilter": 0,"Id": 22199},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22200",
            "Properties": {"RowPosition": 10,"ClientFilter": 0,"Id": 22200},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22201",
            "Properties": {"RowPosition": 11,"ClientFilter": 0,"Id": 22201},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22202",
            "Properties": {"RowPosition": 12,"ClientFilter": 0,"Id": 22202},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22203",
            "Properties": {"RowPosition": 13,"ClientFilter": 0,"Id": 22203},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22204",
            "Properties": {"RowPosition": 14,"ClientFilter": 0,"Id": 22204},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22205",
            "Properties": {"RowPosition": 15,"ClientFilter": 0,"Id": 22205},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
                "Cells": [{
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "47884",
                  "Properties": {"EntryDate": {"Type": "Date","Year": 2012,"Month": 9,"Day": 5},
                    "RowPosition": 0,
                    "Id": 47884,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0,"Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 1,"Minute": 30,"Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 1,"Minutes": 30,"Seconds": 0,"Milliseconds": 0},
                    "Comments": "hello 123"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}}],
                "RowBillable": {
                  "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                  "Identity": "NonBillable",
                  "Properties": {"Name": "Non-Billable"}}}}],
        "ApprovalStatus": {
          "Type": "Replicon.Domain.Approvals.ApprovalStatus","Identity": "Open","Properties": {"Name": "Open"}}}},
    {"Type": "Replicon.TimeSheet.Domain.Timesheet",
      "Identity": "6571",
      "Properties": {
        "Paid": false,
        "ESignature": null,
        "BankOvertime": false,
        "DisclaimerAccepted": null,
        "Id": 6571,
        "SavedOn": null,
        "SavedOnUtc": null,
        "DueDate": {"Type": "Date","Year": 2012,"Month": 9,"Day": 16},
        "StartDate": {"Type": "Date","Year": 2012,"Month": 9,"Day": 10},
        "EndDate": {"Type": "Date","Year": 2012,"Month": 9,"Day": 16},
        "TotalHours": {"Type": "Timespan","Hours": 0,"Minutes": 0,"Seconds": 0,"Milliseconds": 0}},
      "Relationships": {
        "TimeRows": [],
        "ApprovalStatus": {
          "Type": "Replicon.Domain.Approvals.ApprovalStatus","Identity": "Open","Properties": {"Name": "Open"}}}},
    {"Type": "Replicon.TimeSheet.Domain.Timesheet",
      "Identity": "6721",
      "Properties": {
        "Paid": false,
        "ESignature": null,
        "BankOvertime": false,
        "DisclaimerAccepted": null,
        "Id": 6721,
        "SavedOn": null,
        "SavedOnUtc": null,
        "DueDate": {"Type": "Date","Year": 2012,"Month": 9,"Day": 23},
        "StartDate": {"Type": "Date","Year": 2012,"Month": 9,"Day": 17},
        "EndDate": {"Type": "Date","Year": 2012,"Month": 9,"Day": 23},
        "TotalHours": {"Type": "Timespan","Hours": 0,"Minutes": 0,"Seconds": 0,"Milliseconds": 0}},
      "Relationships": {
        "TimeRows": [],
        "ApprovalStatus": {
          "Type": "Replicon.Domain.Approvals.ApprovalStatus","Identity": "Open","Properties": {"Name": "Open"}}}}]}
                            
*****************************************************************************

{
  "Status": "OK",
  "Value": [
    {
      "Type": "Replicon.Project.Domain.Project",
      "Identity": "129",
      "Properties": {
        "Id": 129,
        "Name": "A1 Service Delivery Program",
        "ProjectCode": "25-000-1598",
        "Description": "Service Delivery Program",
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "ApprovalRequired": true,
        "TimeEntryAllowed": true,
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ClosedStatus": false,
        "AllAssignments": false,
        "ArchivedStatus": false,
        "TimeEntryCapPercent": null
      },
      "Relationships": {
        "ProjectClients": [],
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowNonBillable",
          "Properties": {
            "Name": "Non-billable"
          }
        },
        "ClientBillingAllocationMethod": {
          "Type": "Replicon.Project.Domain.ClientBillingAllocationMethod",
          "Identity": "None",
          "Properties": {
            "Name": "None"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Project",
      "Identity": "155",
      "Properties": {
        "Id": 155,
        "Name": "Public Line Rate Service Development",
        "ProjectCode": null,
        "Description": "To provide a pricing refresh and a bandwidth upgrade to Axia Public Sector Customers, with commitment to 3 year and 5 year terms.",
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "ApprovalRequired": true,
        "TimeEntryAllowed": true,
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ClosedStatus": false,
        "AllAssignments": false,
        "ArchivedStatus": false,
        "TimeEntryCapPercent": null
      },
      "Relationships": {
        "ProjectClients": [],
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowNonBillable",
          "Properties": {
            "Name": "Non-billable"
          }
        },
        "ClientBillingAllocationMethod": {
          "Type": "Replicon.Project.Domain.ClientBillingAllocationMethod",
          "Identity": "None",
          "Properties": {
            "Name": "None"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Project",
      "Identity": "158",
      "Properties": {
        "Id": 158,
        "Name": "Internet Gateway Service Development",
        "ProjectCode": null,
        "Description": "Develop a service to provide Internet Gateway Service to the Private Sector using a low cost network interface from RackForce",
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "ApprovalRequired": true,
        "TimeEntryAllowed": true,
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ClosedStatus": false,
        "AllAssignments": false,
        "ArchivedStatus": false,
        "TimeEntryCapPercent": null
      },
      "Relationships": {
        "ProjectClients": [],
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowNonBillable",
          "Properties": {
            "Name": "Non-billable"
          }
        },
        "ClientBillingAllocationMethod": {
          "Type": "Replicon.Project.Domain.ClientBillingAllocationMethod",
          "Identity": "None",
          "Properties": {
            "Name": "None"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Project",
      "Identity": "178",
      "Properties": {
        "Id": 178,
        "Name": "IT - Infrastructure",
        "ProjectCode": "02-099",
        "Description": null,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "ApprovalRequired": true,
        "TimeEntryAllowed": true,
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ClosedStatus": false,
        "AllAssignments": false,
        "ArchivedStatus": false,
        "TimeEntryCapPercent": null
      },
      "Relationships": {
        "ProjectClients": [],
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        },
        "ClientBillingAllocationMethod": {
          "Type": "Replicon.Project.Domain.ClientBillingAllocationMethod",
          "Identity": "None",
          "Properties": {
            "Name": "None"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Project",
      "Identity": "197",
      "Properties": {
        "Id": 197,
        "Name": "IT - Applications and Business Systems",
        "ProjectCode": "02-099",
        "Description": null,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "ApprovalRequired": true,
        "TimeEntryAllowed": true,
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ClosedStatus": false,
        "AllAssignments": false,
        "ArchivedStatus": false,
        "TimeEntryCapPercent": null
      },
      "Relationships": {
        "ProjectClients": [],
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        },
        "ClientBillingAllocationMethod": {
          "Type": "Replicon.Project.Domain.ClientBillingAllocationMethod",
          "Identity": "None",
          "Properties": {
            "Name": "None"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Project",
      "Identity": "201",
      "Properties": {
        "Id": 201,
        "Name": "A1 Customer Portal",
        "ProjectCode": "25-000-1596",
        "Description": null,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "ApprovalRequired": true,
        "TimeEntryAllowed": true,
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ClosedStatus": false,
        "AllAssignments": false,
        "ArchivedStatus": false,
        "TimeEntryCapPercent": null
      },
      "Relationships": {
        "ProjectClients": [],
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        },
        "ClientBillingAllocationMethod": {
          "Type": "Replicon.Project.Domain.ClientBillingAllocationMethod",
          "Identity": "None",
          "Properties": {
            "Name": "None"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Project",
      "Identity": "202",
      "Properties": {
        "Id": 202,
        "Name": "SuperNet Direct - Assessment Prototype",
        "ProjectCode": null,
        "Description": null,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "ApprovalRequired": true,
        "TimeEntryAllowed": true,
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ClosedStatus": false,
        "AllAssignments": true,
        "ArchivedStatus": false,
        "TimeEntryCapPercent": null
      },
      "Relationships": {
        "ProjectClients": [],
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        },
        "ClientBillingAllocationMethod": {
          "Type": "Replicon.Project.Domain.ClientBillingAllocationMethod",
          "Identity": "None",
          "Properties": {
            "Name": "None"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Project",
      "Identity": "204",
      "Properties": {
        "Id": 204,
        "Name": "IT Projects",
        "ProjectCode": "02-099",
        "Description": null,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "ApprovalRequired": true,
        "TimeEntryAllowed": true,
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ClosedStatus": false,
        "AllAssignments": true,
        "ArchivedStatus": false,
        "TimeEntryCapPercent": null
      },
      "Relationships": {
        "ProjectClients": [],
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        },
        "ClientBillingAllocationMethod": {
          "Type": "Replicon.Project.Domain.ClientBillingAllocationMethod",
          "Identity": "None",
          "Properties": {
            "Name": "None"
          }
        }
      }
    }
  ]
}

*****************************************

{
  "Status": "OK",
  "Value": [
    {
      "Type": "Replicon.Domain.Activity",
      "Identity": "1",
      "Properties": {
        "Name": "General Labour",
        "Code": "GL",
        "Description": null,
        "Enabled": true,
        "Id": 1
      }
    },
    {
      "Type": "Replicon.Domain.Activity",
      "Identity": "4",
      "Properties": {
        "Name": "Training",
        "Code": "T",
        "Description": "Off-site courses, learning/training",
        "Enabled": true,
        "Id": 4
      }
    },
    {
      "Type": "Replicon.Domain.Activity",
      "Identity": "9",
      "Properties": {
        "Name": "Team Event",
        "Code": null,
        "Description": "Team Building, Social Committee, etc",
        "Enabled": true,
        "Id": 9
      }
    },
    {
      "Type": "Replicon.Domain.Activity",
      "Identity": "10",
      "Properties": {
        "Name": "Travel",
        "Code": "Travel",
        "Description": "Time while travelling",
        "Enabled": true,
        "Id": 10
      }
    },
    {
      "Type": "Replicon.Domain.Activity",
      "Identity": "11",
      "Properties": {
        "Name": "SR&ED",
        "Code": null,
        "Description": null,
        "Enabled": true,
        "Id": 11
      }
    }
  ]
}

**************************************************
Query for my timesheet of (randomly picked) Apr 5 2012
[
  {
    "Action": "Query",
    "QueryType": "TimesheetByUserDate",
    "DomainType": "Replicon.TimeSheet.Domain.Timesheet",
    "Args": [
      {
        "__type": "Replicon.Domain.User",
        "Identity": "188"
      },
      {
        "__type": "Date",
        "Year": 2012,
        "Month": 4,
        "Day": 5
      }
    ],
    "Load": [
      {
        "Relationship": "TimeRows",
        "DomainType": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
        "Load": [
          {
            "Relationship": "Activity"
          },
          {
            "Relationship": "Cells"
          },
          {
            "Relationship": "Task"
          },
          {
            "Relationship": "Client"
          }
        ]
      }
    ]
  }
]

require 'json'
value =

[{"Action": "Query",
  "QueryType": "TimesheetByUserDate",
  "DomainType": "Replicon.TimeSheet.Domain.Timesheet",
  "Args": [{"__type": "Replicon.Domain.User",
            "Identity": "188"},
           {"__type": "Date",
            "Year": 2012,
            "Month": 4,
            "Day": 5}]}]


Response:
---------
{
  "Status": "OK",
  "Value": [
    {
      "Type": "Replicon.TimeSheet.Domain.Timesheet",
      "Identity": "3150",
      "Properties": {
        "Paid": false,
        "ESignature": null,
        "BankOvertime": false,
        "DisclaimerAccepted": null,
        "Id": 3150,
        "SavedOn": {"Type": "DateTime","Year": 2012,"Month": 4,"Day": 17,"Hour": 11,"Minute": 47,"Second": 29},
        "SavedOnUtc": {
          "Type": "DateTime",
          "Year": 2012,
          "Month": 4,
          "Day": 17,
          "Hour": 17,
          "Minute": 47,
          "Second": 29
        },
        "DueDate": {
          "Type": "Date",
          "Year": 2012,
          "Month": 4,
          "Day": 8
        },
        "StartDate": {
          "Type": "Date",
          "Year": 2012,
          "Month": 4,
          "Day": 1
        },
        "EndDate": {
          "Type": "Date",
          "Year": 2012,
          "Month": 4,
          "Day": 8
        },
        "TotalHours": {
          "Type": "Timespan",
          "Hours": 32,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        }
      },
      "Relationships": {
        "TimeRows": [
          {
            "Type": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
            "Identity": "9892",
            "Properties": {"RowPosition": 0,"ClientFilter": 0,"Id": 9892},
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1},
              "Cells": [
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22570",
                  "Properties": {
                    "EntryDate": {"Type": "Date","Year": 2012,"Month": 4,"Day": 2},
                    "RowPosition": 0,
                    "Id": 22570,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0,"Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 2,"Minute": 30,"Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 2,"Minutes": 30,"Seconds": 0,"Milliseconds": 0},
                    "Comments": "SC #72022"
                  },
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}
                    }
                  }
                },
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22571",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 3
                    },
                    "RowPosition": 0,
                    "Id": 22571,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 5,
                      "Minute": 0,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 5,
                      "Minutes": 0,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": ""
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                },
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22572",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 4
                    },
                    "RowPosition": 0,
                    "Id": 22572,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 2,
                      "Minute": 0,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 2,
                      "Minutes": 0,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": ""
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                },
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22573",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 5
                    },
                    "RowPosition": 0,
                    "Id": 22573,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 2,
                      "Minute": 0,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 2,
                      "Minutes": 0,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": ""
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                }
              ],
              "Task": null,
              "Client": null,
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"
                }
              }
            }
          },
          {
            "Type": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
            "Identity": "9893",
            "Properties": {
              "RowPosition": 1,
              "ClientFilter": 0,
              "Id": 9893
            },
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {
                  "Name": "General Labour",
                  "Code": "GL",
                  "Description": null,
                  "Enabled": true,
                  "Id": 1
                }
              },
              "Cells": [
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22574",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 2
                    },
                    "RowPosition": 1,
                    "Id": 22574,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 4,
                      "Minute": 30,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 4,
                      "Minutes": 30,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": "SC #71460 (CLP)"
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                },
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22575",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 3
                    },
                    "RowPosition": 1,
                    "Id": 22575,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 3,
                      "Minute": 0,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 3,
                      "Minutes": 0,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": "SC #71461 (CLP)"
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                },
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22645",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 4
                    },
                    "RowPosition": 1,
                    "Id": 22645,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 1,
                      "Minute": 30,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 1,
                      "Minutes": 30,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": "Apps Team Meeting"
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                },
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22646",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 5
                    },
                    "RowPosition": 1,
                    "Id": 22646,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 2,
                      "Minute": 0,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 2,
                      "Minutes": 0,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": "CLP"
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                }
              ],
              "Task": null,
              "Client": null,
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"
                }
              }
            }
          },
          {
            "Type": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
            "Identity": "9894",
            "Properties": {
              "RowPosition": 2,
              "ClientFilter": 0,
              "Id": 9894
            },
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {
                  "Name": "General Labour",
                  "Code": "GL",
                  "Description": null,
                  "Enabled": true,
                  "Id": 1
                }
              },
              "Cells": [
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22577",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 3
                    },
                    "RowPosition": 2,
                    "Id": 22577,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 1,
                      "Minute": 0,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 1,
                      "Minutes": 0,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": ""
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                }
              ],
              "Task": {
                "Type": "Replicon.Project.Domain.Task",
                "Identity": "204",
                "Properties": {
                  "TaskCode": null,
                  "Description": "To provide a pricing refresh and a bandwidth upgrade to Axia Public Sector Customers, with commitment to 3 year and 5 year terms.",
                  "TimeEntryAllowed": true,
                  "EstimatedHours": {
                    "Type": "Timespan",
                    "Hours": 0,
                    "Minutes": 0,
                    "Seconds": 0,
                    "Milliseconds": 0
                  },
                  "EntryStartDate": {
                    "Type": "Date",
                    "Past": true
                  },
                  "EntryEndDate": {
                    "Type": "Date",
                    "Future": true
                  },
                  "ExpenseEntryStartDate": {
                    "Type": "Date",
                    "Past": true
                  },
                  "ExpenseEntryEndDate": {
                    "Type": "Date",
                    "Future": true
                  },
                  "ApprovalRequired": true,
                  "Id": 204,
                  "ClosedCount": 0,
                  "ClosedStatus": false,
                  "InheritedClosedStatus": false,
                  "AssignedToCurrentUser": true,
                  "HierarchyTaskName": "Public Line Rate Service Development",
                  "Name": "Public Line Rate Service Development"
                },
                "Relationships": {
                  "Billable": {
                    "Type": "Replicon.Project.Domain.TaskAllowBilling",
                    "Identity": "AllowNonBillable",
                    "Properties": {
                      "Name": "Non-billable"
                    }
                  }
                }
              },
              "Client": null,
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"
                }
              }
            }
          },
          {
            "Type": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
            "Identity": "9895",
            "Properties": {
              "RowPosition": 3,
              "ClientFilter": 0,
              "Id": 9895
            },
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {
                  "Name": "General Labour",
                  "Code": "GL",
                  "Description": null,
                  "Enabled": true,
                  "Id": 1
                }
              },
              "Cells": [
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22647",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 4
                    },
                    "RowPosition": 2,
                    "Id": 22647,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 3,
                      "Minute": 30,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 3,
                      "Minutes": 30,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": ""
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                },
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22648",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 5
                    },
                    "RowPosition": 2,
                    "Id": 22648,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 1,
                      "Minute": 30,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 1,
                      "Minutes": 30,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": "Migration followup"
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                }
              ],
              "Task": {
                "Type": "Replicon.Project.Domain.Task",
                "Identity": "178",
                "Properties": {
                  "TaskCode": "25-000-1598",
                  "Description": "Service Delivery Program",
                  "TimeEntryAllowed": true,
                  "EstimatedHours": {
                    "Type": "Timespan",
                    "Hours": 0,
                    "Minutes": 0,
                    "Seconds": 0,
                    "Milliseconds": 0
                  },
                  "EntryStartDate": {
                    "Type": "Date",
                    "Past": true
                  },
                  "EntryEndDate": {
                    "Type": "Date",
                    "Future": true
                  },
                  "ExpenseEntryStartDate": {
                    "Type": "Date",
                    "Past": true
                  },
                  "ExpenseEntryEndDate": {
                    "Type": "Date",
                    "Future": true
                  },
                  "ApprovalRequired": true,
                  "Id": 178,
                  "ClosedCount": 0,
                  "ClosedStatus": false,
                  "InheritedClosedStatus": false,
                  "AssignedToCurrentUser": true,
                  "HierarchyTaskName": "A1 Service Delivery Program",
                  "Name": "A1 Service Delivery Program"
                },
                "Relationships": {
                  "Billable": {
                    "Type": "Replicon.Project.Domain.TaskAllowBilling",
                    "Identity": "AllowNonBillable",
                    "Properties": {
                      "Name": "Non-billable"
                    }
                  }
                }
              },
              "Client": null,
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"
                }
              }
            }
          },
          {
            "Type": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
            "Identity": "9896",
            "Properties": {
              "RowPosition": 4,
              "ClientFilter": 0,
              "Id": 9896
            },
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {
                  "Name": "General Labour",
                  "Code": "GL",
                  "Description": null,
                  "Enabled": true,
                  "Id": 1
                }
              },
              "Cells": [
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22649",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 5
                    },
                    "RowPosition": 3,
                    "Id": 22649,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 1,
                      "Minute": 0,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 1,
                      "Minutes": 0,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": "Tool selection discussion"
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                }
              ],
              "Task": {
                "Type": "Replicon.Project.Domain.Task",
                "Identity": "332",
                "Properties": {
                  "TaskCode": "25-000-1596",
                  "Description": null,
                  "TimeEntryAllowed": true,
                  "EstimatedHours": {
                    "Type": "Timespan",
                    "Hours": 0,
                    "Minutes": 0,
                    "Seconds": 0,
                    "Milliseconds": 0
                  },
                  "EntryStartDate": {
                    "Type": "Date",
                    "Past": true
                  },
                  "EntryEndDate": {
                    "Type": "Date",
                    "Future": true
                  },
                  "ExpenseEntryStartDate": {
                    "Type": "Date",
                    "Past": true
                  },
                  "ExpenseEntryEndDate": {
                    "Type": "Date",
                    "Future": true
                  },
                  "ApprovalRequired": true,
                  "Id": 332,
                  "ClosedCount": 0,
                  "ClosedStatus": false,
                  "InheritedClosedStatus": false,
                  "AssignedToCurrentUser": true,
                  "HierarchyTaskName": "A1 Customer Portal",
                  "Name": "A1 Customer Portal"
                },
                "Relationships": {
                  "Billable": {
                    "Type": "Replicon.Project.Domain.TaskAllowBilling",
                    "Identity": "AllowBoth",
                    "Properties": {
                      "Name": "Both"
                    }
                  }
                }
              },
              "Client": null,
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"
                }
              }
            }
          },
          {
            "Type": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
            "Identity": "9897",
            "Properties": {
              "RowPosition": 5,
              "ClientFilter": 0,
              "Id": 9897
            },
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {
                  "Name": "General Labour",
                  "Code": "GL",
                  "Description": null,
                  "Enabled": true,
                  "Id": 1
                }
              },
              "Cells": [
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22650",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 4
                    },
                    "RowPosition": 3,
                    "Id": 22650,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 1,
                      "Minute": 30,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 1,
                      "Minutes": 30,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": "CLP"
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                }
              ],
              "Task": null,
              "Client": null,
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"
                }
              }
            }
          },
          {
            "Type": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
            "Identity": "9898",
            "Properties": {
              "RowPosition": 6,
              "ClientFilter": 0,
              "Id": 9898
            },
            "Relationships": {
              "Activity": {
                "Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {
                  "Name": "General Labour",
                  "Code": "GL",
                  "Description": null,
                  "Enabled": true,
                  "Id": 1
                }
              },
              "Cells": [
                {
                  "Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "22651",
                  "Properties": {
                    "EntryDate": {
                      "Type": "Date",
                      "Year": 2012,
                      "Month": 4,
                      "Day": 5
                    },
                    "RowPosition": 4,
                    "Id": 22651,
                    "TimeIn": {
                      "Type": "Time",
                      "Hour": 0,
                      "Minute": 0,
                      "Second": 0
                    },
                    "TimeOut": {
                      "Type": "Time",
                      "Hour": 1,
                      "Minute": 0,
                      "Second": 0
                    },
                    "Duration": {
                      "Type": "Timespan",
                      "Hours": 1,
                      "Minutes": 0,
                      "Seconds": 0,
                      "Milliseconds": 0
                    },
                    "Comments": "Billing Integration"
                  },
                  "UserDefinedFields": {
                    "Location": "Canada"
                  },
                  "Relationships": {
                    "CalculationModeObject": {
                      "Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {
                        "Name": "CalculationModeObject_CalculateInOutTime"
                      }
                    }
                  }
                }
              ],
              "Task": {
                "Type": "Replicon.Project.Domain.Task",
                "Identity": "178",
                "Properties": {
                  "TaskCode": "25-000-1598",
                  "Description": "Service Delivery Program",
                  "TimeEntryAllowed": true,
                  "EstimatedHours": {
                    "Type": "Timespan",
                    "Hours": 0,
                    "Minutes": 0,
                    "Seconds": 0,
                    "Milliseconds": 0
                  },
                  "EntryStartDate": {
                    "Type": "Date",
                    "Past": true
                  },
                  "EntryEndDate": {
                    "Type": "Date",
                    "Future": true
                  },
                  "ExpenseEntryStartDate": {
                    "Type": "Date",
                    "Past": true
                  },
                  "ExpenseEntryEndDate": {
                    "Type": "Date",
                    "Future": true
                  },
                  "ApprovalRequired": true,
                  "Id": 178,
                  "ClosedCount": 0,
                  "ClosedStatus": false,
                  "InheritedClosedStatus": false,
                  "AssignedToCurrentUser": true,
                  "HierarchyTaskName": "A1 Service Delivery Program",
                  "Name": "A1 Service Delivery Program"
                },
                "Relationships": {
                  "Billable": {
                    "Type": "Replicon.Project.Domain.TaskAllowBilling",
                    "Identity": "AllowNonBillable",
                    "Properties": {
                      "Name": "Non-billable"
                    }
                  }
                }
              },
              "Client": null,
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"
                }
              }
            }
          },
          {
            "Type": "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
            "Identity": "9928",
            "Properties": {
              "RowPosition": 7,
              "ClientFilter": 0,
              "Id": 9928
            },
            "Relationships": {
              "Activity": null,
              "Cells": [],
              "Task": null,
              "Client": null,
              "RowBillable": {
                "Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {
                  "Name": "Non-Billable"
                }
              }
            }
          }
        ],
        "ApprovalStatus": {
          "Type": "Replicon.Domain.Approvals.ApprovalStatus",
          "Identity": "Approved",
          "Properties": {
            "Name": "Approved"
          }
        }
      }
    }
  ]
}



-------  Query all tasks by me  (188)
Request:
[
  {
    "Action": "Query",
    "QueryType": "AllOpenTasksByUser",
    "DomainType": "Replicon.Project.Domain.Task",
    "Args": [
      {
        "__type": "Replicon.Domain.User",
        "Identity": "188"
      }
    ]
  }
]

Response:
{
  "Status": "OK",
  "Value": [
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "178",
      "Properties": {
        "TaskCode": "25-000-1598",
        "Description": "Service Delivery Program",
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 178,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "A1 Service Delivery Program",
        "Name": "A1 Service Delivery Program"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowNonBillable",
          "Properties": {
            "Name": "Non-billable"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "204",
      "Properties": {
        "TaskCode": null,
        "Description": "To provide a pricing refresh and a bandwidth upgrade to Axia Public Sector Customers, with commitment to 3 year and 5 year terms.",
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 204,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "Public Line Rate Service Development",
        "Name": "Public Line Rate Service Development"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowNonBillable",
          "Properties": {
            "Name": "Non-billable"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "207",
      "Properties": {
        "TaskCode": null,
        "Description": "Develop a service to provide Internet Gateway Service to the Private Sector using a low cost network interface from RackForce",
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 207,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "Internet Gateway Service Development",
        "Name": "Internet Gateway Service Development"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowNonBillable",
          "Properties": {
            "Name": "Non-billable"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "268",
      "Properties": {
        "TaskCode": "02-097",
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 268,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure",
        "Name": "IT - Infrastructure"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "320",
      "Properties": {
        "TaskCode": "02-098",
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 320,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Applications and Business Systems",
        "Name": "IT - Applications and Business Systems"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "332",
      "Properties": {
        "TaskCode": "25-000-1596",
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 332,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "A1 Customer Portal",
        "Name": "A1 Customer Portal"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "337",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 337,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "SuperNet Direct - Assessment Prototype",
        "Name": "SuperNet Direct - Assessment Prototype"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "340",
      "Properties": {
        "TaskCode": "02-099",
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 340,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT Projects",
        "Name": "IT Projects"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "355",
      "Properties": {
        "TaskCode": "02-301",
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": true,
        "Id": 355,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT Enterprise Services",
        "Name": "IT Enterprise Services"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "271",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 271,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Project: Citrix Rollout",
        "Name": "Project: Citrix Rollout"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "272",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 272,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Cloud Services",
        "Name": "Cloud Services"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "273",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 273,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Communication and Reporting",
        "Name": "Communication and Reporting"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "274",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 274,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Desktop Initiatives",
        "Name": "Desktop Initiatives"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "275",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 275,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / IT Documentation",
        "Name": "IT Documentation"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "276",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 276,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / IT Governance",
        "Name": "IT Governance"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "277",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 277,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Network Management",
        "Name": "Network Management"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "278",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 278,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / IT Storage Management",
        "Name": "IT Storage Management"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "279",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 279,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / IT Training",
        "Name": "IT Training"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "280",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 280,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / IT Wireless",
        "Name": "IT Wireless"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "282",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 282,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Project: Office 365",
        "Name": "Project: Office 365"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "283",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 283,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Project: Bring Your Own Device (BYOD)",
        "Name": "Project: Bring Your Own Device (BYOD)"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "284",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 284,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Security and Monitoring",
        "Name": "Security and Monitoring"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "286",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 286,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Account Management",
        "Name": "Account Management"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "288",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 288,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Helpdesk Support Services",
        "Name": "Helpdesk Support Services"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "289",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 289,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Backup Restore Management",
        "Name": "Backup Restore Management"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "290",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 290,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Server Management",
        "Name": "Server Management"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "291",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 291,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Email Services",
        "Name": "Email Services"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "292",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 292,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Asset Management",
        "Name": "Asset Management"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "293",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 293,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Printer Management",
        "Name": "Printer Management"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "294",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 294,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Hosting Services",
        "Name": "Hosting Services"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "295",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 295,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Phone Services",
        "Name": "Phone Services"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "296",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 296,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Web/Video Conferencing Services",
        "Name": "Web/Video Conferencing Services"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "315",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 315,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / 100 Pair Audit",
        "Name": "100 Pair Audit"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "360",
      "Properties": {
        "TaskCode": null,
        "Description": "Great Documentation Round Up",
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 360,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT Projects / GDRU",
        "Name": "GDRU"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowNonBillable",
          "Properties": {
            "Name": "Non-billable"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "326",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 326,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Desktop Initiatives / Mac Support",
        "Name": "Mac Support"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    },
    {
      "Type": "Replicon.Project.Domain.Task",
      "Identity": "325",
      "Properties": {
        "TaskCode": null,
        "Description": null,
        "TimeEntryAllowed": true,
        "EstimatedHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        },
        "EntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "EntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ExpenseEntryStartDate": {
          "Type": "Date",
          "Past": true
        },
        "ExpenseEntryEndDate": {
          "Type": "Date",
          "Future": true
        },
        "ApprovalRequired": false,
        "Id": 325,
        "ClosedCount": 0,
        "ClosedStatus": false,
        "InheritedClosedStatus": false,
        "AssignedToCurrentUser": true,
        "HierarchyTaskName": "IT - Infrastructure / Project: Bring Your Own Device (BYOD) / BYOD - Macs",
        "Name": "BYOD - Macs"
      },
      "Relationships": {
        "Billable": {
          "Type": "Replicon.Project.Domain.TaskAllowBilling",
          "Identity": "AllowBoth",
          "Properties": {
            "Name": "Both"
          }
        }
      }
    }
  ]
}