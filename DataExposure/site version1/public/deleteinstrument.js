function deleteInstrument(id){
    $.ajax({
        url: '/test_site/instruments/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
