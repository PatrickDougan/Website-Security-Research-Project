function deleteStudent(id){
    $.ajax({
        url: '/test_site2/students/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
