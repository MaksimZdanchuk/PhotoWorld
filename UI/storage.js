const storage = (function() {
    function parsePost(raw) {
        const post = Object.assign({}, raw);
        post.createdAt = new Date(post.createdAt);
        return post;
    }

    function loadPosts() {
        if (localStorage.getItem('posts')) {
            JSON.parse(localStorage.getItem('posts'))
                .map(parsePost)
                .forEach(post => posts.addPost(post));
            return true;
        } else {
            return false;
        }
    }

    function updatePosts() {
        localStorage.setItem('posts', JSON.stringify(posts.getArray()));
    }

    function getUser() {
        const user = localStorage.getItem('user');
        if (user === 'null') {
            return null;
        } 
        return user;
    }

    function setUser(user) {
        localStorage.setItem('user', user);
    }

    return  {
        loadPosts,
        updatePosts,
        getUser,
        setUser,
    }
})();