let state = {};

(function () {
	function initPage() {
		document.querySelector('.addPost').onclick = () => {
			controllers.addPost();
		}
		document.getElementById('loadMore').onclick = () => {
			controllers.showMorePosts();
		}
		document.querySelector('.logout').onclick = () => {
			controllers.logout();
		}
		document.querySelector('.login').onclick = () => {
			const login = document.getElementById('loginInput').value;
			const password = document.getElementById('passwordInput').value;
			controllers.login(login, password, () => alert('wrong login or password'));
		}
		components.updatePage(state);
		controllers.showMorePosts();
	}


	state = {
		user: 'martin.ksu',
		users: [
			{
				login: 'martin.ksu',
				password: '1234',
			},
			{
				login: 'test',
				password: 'test',
			}
		],
		// user: null,
		filterConfig: null,
		posts,
	};

	exampleData.posts.forEach(post => posts.addPost(post));
	initPage();
	
})()
