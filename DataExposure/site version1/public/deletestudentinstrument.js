function deleteStudentInstrument(siid){
    $.ajax({
        url: '/test_site/instruments/delete_assignment/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
