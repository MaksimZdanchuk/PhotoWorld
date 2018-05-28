let state = {};

(function () {
	state = {
		user: 'martin.ksu',
		// user: null,
		filterConfig: null,
		posts,
	};

	exampleData.posts.forEach(post => posts.addPost(post));
	components.updatePage(state);
	document.querySelector('.addPost').onclick = () => {
		controllers.addPost();
	}

	posts.getPosts().forEach((post) => {
		document.getElementById('posts').appendChild(controllers.createPostComponent(post));
	});
})();

