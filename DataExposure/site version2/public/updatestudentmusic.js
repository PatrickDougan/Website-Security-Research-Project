function updateStudentMusic(id){
    $.ajax({
        url: '/test_site2/student-music/' + id,
        type: 'PUT',
        data: $('#update-student-music').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
