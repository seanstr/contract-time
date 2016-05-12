jQuery(function(){
  $('#add-button').click(function(){
     $('#form_div').toggle();
  });
});

jQuery(function(){
  $('#add-hash-button').click(function(){
     $('#form_hash_div').toggle();
  });
});

$(function(){
  $("input[name*=month]").change(function() {
    var filter_month = $(this).attr("value");
    var consultant_id = $("#filter_form_consultant_id").val();
    $.ajax({ url: '/time_entries/filter', type: 'POST',
             beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
             data: {consultant_id: consultant_id, month: filter_month},
             success: function(response) { $('#filter').html(response); }
    });
  });
});