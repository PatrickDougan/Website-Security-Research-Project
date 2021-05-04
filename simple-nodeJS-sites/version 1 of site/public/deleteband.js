function deleteBand(id){
    $.ajax({
        url: '/test_site/bands/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
