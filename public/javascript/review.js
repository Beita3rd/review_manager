$(function(){
  
  $('#doneModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var study_contents = button.data('study_contents')
    var review_contents_id = button.data('review_contents_id')
    var user_id = button.data('user_id')
    var modal = $(this)
    modal.find('.modal-body').text(study_contents)
    $('#doneBtn').attr("href", "/review/"+user_id+"/"+review_contents_id)
  })

  $('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) 
    var study_contents = button.data('study_contents')
    var study_contents_id = button.data('study_contents_id')
    var user_id = button.data('user_id')
    var created_at = button.data('created_at')
    var modal = $(this)
    modal.find('.modal-body form').attr("action", "/study/edit/"+study_contents_id)
    $('#studyContents').val(study_contents)
    $('#studyDate').attr("value", created_at)
    $('#destroy').attr("data-study_contents_id", study_contents_id)
    $('#destroy').attr("data-study_contents", study_contents)
  })

  $('#destroyModal').on('show.bs.modal', function (event) {
    $('#editModal').modal('hide')
    var button = $(event.relatedTarget) 
    var study_contents = button.data('study_contents')
    var study_contents_id = button.data('study_contents_id')
    var modal = $(this)
    modal.find('.modal-body').text(study_contents)
    modal.find('.modal-footer a').attr("href", "/study/destroy/"+study_contents_id)
  })
});