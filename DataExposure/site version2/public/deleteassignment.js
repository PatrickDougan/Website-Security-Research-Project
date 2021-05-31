function deleteAssignment(bmid){
    $.ajax({
        url: '/test_site2/bands/remove_assignment/' + bmid,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
