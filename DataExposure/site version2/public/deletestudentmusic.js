function deleteStudentMusic(id){
    $.ajax({
        url: '/test_site2/student-music/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
