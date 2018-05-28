let state = {
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
	user: null,
	filterConfig: null,
	posts,
};


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
		document.getElementById('filterButton').onclick = () => {
			const createdAt = document.querySelector('.Sdata').value;
			const filterConfig = {
				author: document.querySelector('.Sname').value,
				tag: document.querySelector('.Stag').value,
				createdAt: createdAt !== '' ? new Date(createdAt) : null,
			};
			controllers.filter(filterConfig);
		}
		components.updatePage(state);
		controllers.showMorePosts();
	}

	if (!storage.loadPosts()) {
		exampleData.posts.forEach(post => posts.addPost(post));
		storage.updatePosts();
	}
	state.user = storage.getUser();
	
	initPage();
	
})()
