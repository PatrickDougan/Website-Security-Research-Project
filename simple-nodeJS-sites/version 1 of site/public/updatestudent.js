function updateStudent(id){
    $.ajax({
        url: '/test_site/students/' + id,
        type: 'PUT',
        data: $('#update-student').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
