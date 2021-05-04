function updateStudent(id){
    $.ajax({
        url: '/test_site2/students/' + id,
        type: 'PUT',
        data: $('#update-student').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
