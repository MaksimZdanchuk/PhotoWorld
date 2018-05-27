(function () {
	exampleData.posts.forEach(post => posts.addPost(post));
	console.log(posts.getPosts());

	posts.getPosts().forEach((post) => {
		document.getElementById('content').appendChild(components.Post(post));
	});
})();

