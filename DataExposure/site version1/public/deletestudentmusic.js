function deleteStudentMusic(id){
    $.ajax({
        url: '/test_site/student-music/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
