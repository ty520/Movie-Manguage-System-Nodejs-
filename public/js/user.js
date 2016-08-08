//用户管理系统页面
(function(){
	$('.del').click(function(e){
		var target = $(event.target);
		var id = target.data('id');
		var tr = $('item-id-' + id);
		$.ajax({
			type: 'DELETE',
			url: '/admin/userlist?id='+id
		})
		.done(function(results){
			if(results.success === 1){
				if(tr.length > 1)
				{
					tr.remove();
				}
			}
		})
	});
})();