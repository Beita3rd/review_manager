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

});