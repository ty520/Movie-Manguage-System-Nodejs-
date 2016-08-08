//detail页面点击用户头像后可进行回复
$('.comment').click(function(e){
	var toId = $(this).data('tid');
	var commentId = $(this).data('cid');
	if($('input[name = "comment[toId]"]').get(0)) //首先判断是否存在input[name = "comment[toId]和input[name = "comment[cId]"]
	{
		$('input[name = "comment[toId]"]')
			.attr({
			type: 'hidden',
			name: 'comment[toId]',
			value: toId
		});
		$('input[name = "comment[cId]"]')
			.attr({
			type: 'hidden',
			name: 'comment[cId]',
			value: commentId
		});
	}else{               //还是第一次点击头像时，添加toId和commentId属性
		$('<input>').attr({
			type: 'hidden',
			name: 'comment[toId]',
			value: toId
		}).appendTo('#commentForm');
		$('<input>').attr({
			type: 'hidden',
			name: 'comment[cId]',
			value: commentId
		}).appendTo('#commentForm');
	}
});