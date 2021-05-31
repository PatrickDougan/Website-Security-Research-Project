function deletePiece(id){
    $.ajax({
        url: '/test_site2/music/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
