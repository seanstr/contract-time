require 'net/http'
require 'net/https'
require 'json'
require 'uri'
require 'pp'

def symbolize(obj)
    return obj.inject({}){|memo,(k,v)| memo[k.to_sym] =  symbolize(v); memo} if obj.is_a? Hash
    return obj.inject([]){|memo,v    | memo           << symbolize(v); memo} if obj.is_a? Array
    return obj
end

# Search for timesheets for a date range by user (188)
json_value = %q/[ {"Action": "Query", "QueryType": "TimesheetByUserDateRange", 
"DomainType": "Replicon.TimeSheet.Domain.Timesheet", "Args": [ {"__type": "Replicon.Domain.User", "Identity": "188"}, 
{"__type": "Date", "Past": true, "Year": 2012, "Month": 9,"Day": 1}, 
{"__type": "Date", "Future": true, "Year": 2012, "Month": 9,"Day": 30}], 
"Load": [ {"Relationship": "TimeRows", "Load": [ {"Relationship": "Activity"}, {"Relationship": "Cells"}]}]}]/


[{"Action"=>"Query",
  "QueryType"=>"TimesheetByUserDateRange",
  "DomainType"=>"Replicon.TimeSheet.Domain.Timesheet",
  "Args"=>
   [{"__type"=>"Replicon.Domain.User", "Identity"=>"188"},
    {"__type"=>"Date", "Year"=>2012, "Month"=>9, "Day"=>1},
    {"__type"=>"Date", "Year"=>2012, "Month"=>9, "Day"=>30}],
  "Load"=>
   [{"Relationship"=>"TimeRows",
     "Load"=>[{"Relationship"=>"Activity"}, {"Relationship"=>"Cells"}]}]}]
     
[{"Action"=>"Query",
  "QueryType"=>"TimesheetByUserDate",
  "DomainType"=>"Replicon.TimeSheet.Domain.Timesheet",
  "Args"=>
   [{"__type"=>"Replicon.Domain.User", "Identity"=>"188"},
    {"__type"=>"Date", "Past"=>true, "Year"=>2012, "Month"=>9, "Day"=>1},
    {"__type"=>"Date", "Future"=>true, "Year"=>2012, "Month"=>9, "Day"=>30}],
  "Load"=>
   [{"Relationship"=>"TimeRows",
     "Load"=>[{"Relationship"=>"Activity"}, {"Relationship"=>"Cells"}]}]}]     

JSON.parse(json_value)
 
# Modify these to point at your Replicon instance 
$url = URI.parse("https://na1.replicon.com/Axia/RemoteAPI/RemoteAPI.ashx/8.29.4/testmode") 
$companyKey = "axia" 
$loginname = "smatthews" 
$password = "Sean0405?0" 
 
# Do the dirty work of performing an API request 
def perform_api_request(query) 
    request = Net::HTTP::Post.new( 
        $url.path + ($url.query != nil ? ("?" + $url.query) : ""), 
        initheader = {"Content-Type" => "application/json", 
            "X-Replicon-Security-Context" => "User"}) 
    request.basic_auth($companyKey + "\\" + $loginname, $password) 
    request.body = JSON.generate(query) 
 
    server = Net::HTTP.new($url.host, $url.port) 
    server.use_ssl = $url.scheme == "https" 
    response = server.start {|http| http.request(request)} 
 
    http_code = response.code.to_i 
    if http_code != 200 
        puts response.body 
        raise "Expected success code 200, but was #{http_code}" 
    end 
 
    return JSON.parse(response.body) 
end 
 
# Perform an API request, validate that Status is OK, and return the Values 
# from the API query. 
def get_api_values(query) 
    retval = perform_api_request(query) 
    if retval["Status"] != "OK" 
        puts response.body 
        raise "Expected status OK, but was #{retval["Status"]}" 
    end 
    return retval["Value"] 
end 

users = get_api_values({"Action"=>"Query","DomainType"=>"Replicon.Domain.User","QueryType"=>"UserByLoginName","Args"=>["smatthews"]})

# Fetch all users from the API 
users = get_api_values({"Action" => "Query", 
    "DomainType" => "Replicon.Domain.User", 
    "QueryType" => "UserAll", 
    "Args" => [], 
    "SortBy" => [ "LastName", "FirstName" ]}) 

[{"Action" => "Query",
    "QueryType" => "TimesheetByUserDate",
    "DomainType" => "Replicon.TimeSheet.Domain.Timesheet",
    "Args" => [
      {"__type" => "Replicon.Domain.User",
        "Identity" => "188"},
      {"__type" => "Date", "Year" => 2012,
        "Month" => 9,
        "Day" => 5}],
    "Load" => [
      {"Relationship" => "TimeRows",
        "DomainType" => "Replicon.Project.Domain.Timesheets.TimesheetTaskRow",
        "Load" => [
          {"Relationship" => "Activity"},
          {"Relationship" => "Cells"},
          {"Relationship" => "Task"},
          {"Relationship" => "Client"}]}]}]
 
# Print out the user's names 
users.each {|user| 
    puts user["Properties"]["LastName"] + ", " + user["Properties"]["FirstName"]} 

[ {"Action": "Query", "QueryType": "TimesheetTimeRowAll", "DomainType": "Replicon.TimeSheet.Domain.TimesheetTimeRow", "Args": []}]


json_qry = %q/[{"Action": "Query",
    "QueryType": "TimesheetByUserDate",
    "DomainType": "Replicon.TimeSheet.Domain.Timesheet",
    "Args": [{"__type": "Replicon.Domain.User","Identity": "188"},
             {"__type": "Date", "Year": 2012, "Month": 9,"Day": 1}],
    "Load": [{"Relationship": "TimeRows","Load": [{"Relationship": "Activity"},{"Relationship": "Cells"},{"Relationship": "Task"}]}]}]/

json_res = %q/ {"Status": "OK",
  "Value": [{"Type": "Replicon.TimeSheet.Domain.Timesheet",
      "Identity": "6417",
      "Properties": {"Paid": false,
        "ESignature": null,
        "BankOvertime": false,
        "DisclaimerAccepted": null,
        "Id": 6417,
        "SavedOn": {"Type": "DateTime","Year": 2012, "Month": 10,"Day": 1,"Hour": 10,"Minute": 1,"Second": 18},
        "SavedOnUtc": {"Type": "DateTime","Year": 2012, "Month": 10,"Day": 1,"Hour": 16,"Minute": 1,"Second": 18},
        "DueDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 9},
        "StartDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 1},
        "EndDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 9},
        "TotalHours": {"Type": "Timespan", "Hours": 44, "Minutes": 30, "Seconds": 0, "Milliseconds": 0}},
      "Relationships": {"TimeRows": [
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22190",
            "Properties": {"RowPosition": 0, "ClientFilter": 0, "Id": 22190},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL", "Description": null, "Enabled": true, "Id": 1}},
              "Cells": [
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49843",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 7},
                    "RowPosition": 0,
                    "Id": 49843,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 1, "Minute": 30, "Second": 0},
                    "Duration": {"Type": "Timespan", "Hours": 1, "Minutes": 30, "Seconds": 0, "Milliseconds": 0},
                    "Comments": "walk ups by Laurie Ann and Lindsay"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}}],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22191",
            "Properties": {"RowPosition": 1, "ClientFilter": 0, "Id": 22191},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour", "Code": "GL", "Description": null, "Enabled": true, "Id": 1}},
              "Cells": [],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22192",
            "Properties": {"RowPosition": 2, "ClientFilter": 0, "Id": 22192},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22193",
            "Properties": {"RowPosition": 3, "ClientFilter": 0, "Id": 22193},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22194",
            "Properties": {"RowPosition": 4,"ClientFilter": 0,"Id": 22194},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22195",
            "Properties": {"RowPosition": 5,"ClientFilter": 0,"Id": 22195},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22196",
            "Properties": {"RowPosition": 6,"ClientFilter": 0,"Id": 22196},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49844",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 4},
                    "RowPosition": 0,
                    "Id": 49844,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 10,"Minute": 0, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 10,"Minutes": 0, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "iteration 1 data loading"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}},
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49845",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 5},
                    "RowPosition": 0,
                    "Id": 49845,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 12, "Minute": 0, "Second": 0},
                    "Duration": {"Type": "Timespan", "Hours": 12,"Minutes": 0, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "iteration 1 data load"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}},
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49846",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 6},
                    "RowPosition": 0,
                    "Id": 49846,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 8,"Minute": 30, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 8,"Minutes": 30, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "data load"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime","Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}},
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49847",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 7},
                    "RowPosition": 1,
                    "Id": 49847,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 1,"Minute": 0, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 1,"Minutes": 0, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "data upload"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}}],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable", "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22197",
            "Properties": {"RowPosition": 7,"ClientFilter": 0,"Id": 22197},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49848",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 6},
                    "RowPosition": 1,
                    "Id": 49848,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 1,"Minute": 0, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 1,"Minutes": 0, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "Data load review"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}},
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49849",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 7},
                    "RowPosition": 2,
                    "Id": 49849,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 1,"Minute": 0, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 1,"Minutes": 0, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "discussion of SD data extract"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}}],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22198",
            "Properties": {"RowPosition": 8,"ClientFilter": 0,"Id": 22198},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49850",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 6},
                    "RowPosition": 2,
                    "Id": 49850,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 3,"Minute": 0, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 3,"Minutes": 0, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "iteration 1 data load"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}},
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49851",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 7},
                    "RowPosition": 3,
                    "Id": 49851,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 4,"Minute": 30, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 4,"Minutes": 30, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "iteration 1 data finalization"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}}],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22199",
            "Properties": {"RowPosition": 9,"ClientFilter": 0,"Id": 22199},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL", "Description": null, "Enabled": true, "Id": 1}},
              "Cells": [
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49852",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 4},
                    "RowPosition": 1,
                    "Id": 49852,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 0,"Minute": 30, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 0,"Minutes": 30, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "scrum"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}},
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49853",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 5},
                    "RowPosition": 1,
                    "Id": 49853,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 0,"Minute": 30, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 0,"Minutes": 30, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "scrum"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}},
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49854",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 6},
                    "RowPosition": 3,
                    "Id": 49854,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 0,"Minute": 30, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 0,"Minutes": 30, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "scrum"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}},
                {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeCell",
                  "Identity": "49855",
                  "Properties": {"EntryDate": {"Type": "Date", "Year": 2012, "Month": 9,"Day": 7},
                    "RowPosition": 4,
                    "Id": 49855,
                    "TimeIn": {"Type": "Time","Hour": 0,"Minute": 0, "Second": 0},
                    "TimeOut": {"Type": "Time","Hour": 0,"Minute": 30, "Second": 0},
                    "Duration": {"Type": "Timespan","Hours": 0,"Minutes": 30, "Seconds": 0,"Milliseconds": 0},
                    "Comments": "scrum"},
                  "UserDefinedFields": {"Location": "Canada"},
                  "Relationships": {"CalculationModeObject": {"Type": "Replicon.TimeSheet.Domain.CalculationModeObject",
                      "Identity": "CalculateInOutTime",
                      "Properties": {"Name": "CalculationModeObject_CalculateInOutTime"}}}}],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22202",
            "Properties": {"RowPosition": 10,"ClientFilter": 0,"Id": 22202},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22203",
            "Properties": {"RowPosition": 11,"ClientFilter": 0,"Id": 22203},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {
                "Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}},
          {"Type": "Replicon.TimeSheet.Domain.TimesheetTimeRow",
            "Identity": "22204",
            "Properties": {"RowPosition": 12,"ClientFilter": 0,"Id": 22204},
            "UserDefinedFields": {"Pay": "Regular Time"},
            "Relationships": {"Activity": {"Type": "Replicon.Domain.Activity",
                "Identity": "1",
                "Properties": {"Name": "General Labour","Code": "GL","Description": null,"Enabled": true,"Id": 1}},
              "Cells": [],
              "RowBillable": {"Type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType",
                "Identity": "NonBillable",
                "Properties": {"Name": "Non-Billable"}}}}],
        "ApprovalStatus": {"Type": "Replicon.Domain.Approvals.ApprovalStatus",
          "Identity": "Waiting",
          "Properties": {"Name": "Waiting"}}}}]} 
/

res = JSON.parse(json_res)
Hash[res.map{|(k,v)| [k.to_sym,v]}]

json_res = %q/{
  "Status": "OK",
  "Value": [
    {
      "Type": "Replicon.TimeSheet.Domain.Timesheet",
      "Identity": "7009",
      "Properties": {
        "Paid": false,
        "ESignature": null,
        "BankOvertime": false,
        "DisclaimerAccepted": null,
        "Id": 7009,
        "SavedOn": null,
        "SavedOnUtc": null,
        "DueDate": {
          "Type": "Date",
          "Year": 2012,
          "Month": 10,
          "Day": 7
        },
        "StartDate": {
          "Type": "Date",
          "Year": 2012,
          "Month": 10,
          "Day": 1
        },
        "EndDate": {
          "Type": "Date",
          "Year": 2012,
          "Month": 10,
          "Day": 7
        },
        "TotalHours": {
          "Type": "Timespan",
          "Hours": 0,
          "Minutes": 0,
          "Seconds": 0,
          "Milliseconds": 0
        }
      },
      "Relationships": {
        "TimeRows": [],
        "ApprovalStatus": {
          "Type": "Replicon.Domain.Approvals.ApprovalStatus",
          "Identity": "Open",
          "Properties": {
            "Name": "Open"
          }
        }
      }
    }
  ]
}/

#add time row
json_add = %q/[ { "Action": "Edit", "Type": "Replicon.TimeSheet.Domain.Timesheet", "Identity": "46", "Operations": [ { "__operation": 
"CollectionAdd", "Collection": "TimeRows", "Operations": [ { "__operation": "SetProperties", "Task": { "__type": 
"Replicon.Project.Domain.Task", "Identity": "8" }, "Client": { "__type": "Replicon.Project.Domain.Client", "Identity": "2" } }, { 
"__operation": "SetTaskRowBilling", "BillingType": { "__type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType", "Identity": 
"ProjectRate" }, "Project": { "__type": "Replicon.Project.Domain.Project", "Identity": "1" } } ] } ] } ]/

        { "__operation": "SetTimeEntryBilling", 
          "BillingType": 
           { "__type": "Replicon.Project.Domain.Timesheets.TimesheetBillingType", 
             "Identity": "RoleRate" }, 
          "Project": { "__type": "Replicon.Project.Domain.Project", "Identity": "1" }, 
          "ProjectRole": { "Identity": "1" } 
        } 


add = JSON.parse(json_add.)symbolise