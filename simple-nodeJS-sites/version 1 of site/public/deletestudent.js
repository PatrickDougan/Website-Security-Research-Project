function deleteStudent(id){
    $.ajax({
        url: '/test_site/students/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
