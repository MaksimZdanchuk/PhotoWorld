const controllers = (function () {
    function createPostComponent(post) {
        return components.Post(post, state.user, {
            onRemove: removePost,
            onEdit: editPost,
            onLike: likePost,
        });
    }

    function createPostEditor(post) {
        return components.PostEditor(post, {
            onSave: savePost,
            onCancel: closeEditor
        });
    }

    function removePost(id) {
        const postNode = document.getElementById(`post${id}`);
        postNode.parentNode.removeChild(postNode);
        posts.removePost(id);
        storage.updatePosts();
    }

    function addPost() {
        const post = posts.createPost(state.user);
        const editor = createPostEditor(post);
        const content = document.getElementById('content');
        content.insertBefore(editor, content.firstChild);
    }

    function editPost(id) {
        const postNode = document.getElementById(`post${id}`);
        const post = posts.getPost(id);
        const postEditor = createPostEditor(post);
        postNode.parentNode.replaceChild(postEditor, postNode);
    }

    function likePost(id, user) {
        const post = posts.getPost(id);
        const postNode = document.getElementById(`post${id}`);
        if (posts.likePost(id, user)) {
            postNode.querySelector('.count').innerText = post.likes.length;
            storage.updatePosts();
        }
    }

    function closeEditor(editor, id) {
        const post = posts.getPost(id);
        if (post) {
            const postNode = createPostComponent(post);
            editor.parentNode.replaceChild(postNode, editor);
        } else {
            editor.parentNode.removeChild(editor);
        }
    }

    function savePost(editor, post, fields, onError) {
        const id = post.id;
        if (posts.getPost(id)) {
            if (posts.editPost(id, fields)) {
                closeEditor(editor, id)
                storage.updatePosts();
            } else {
                onError('bad input');
            }
        } else {
            const postToSave = Object.assign({}, post, fields);
            if (posts.addPost(postToSave)) {
                closeEditor(editor, id);
                storage.updatePosts();
            } else {
                onError('bad input');
            }
        }
    }

    function showMorePosts() {
        const container = document.getElementById('posts');
        const cnt = container.children.length;
        const postsToShow = posts.getPosts(cnt, 10, state.filterConfig);
        postsToShow.forEach(post => container.appendChild(createPostComponent(post)));
    }

    function logout() {
        state.user = null;
        storage.setUser(null);
        reloadPage();
    }

    function reloadPage() {
        components.clearPosts();
        components.updatePage(state);
        showMorePosts();
    }

    function login(login, password, onError) {
        if (state.users.find((user) => user.login === login && user.password === password)) {
            state.user = login;
            storage.setUser(login);
            reloadPage();
        } else {
            onError();
        }
    }

    function filter(filterConfig) {
        state.filterConfig = filterConfig;
        components.clearPosts();
        showMorePosts();
        if (document.getElementById('posts').children.length === 0) {
            state.filterConfig = null;
            showMorePosts();
            alert('no posts found!');
        }
    }

    return {
        createPostComponent,
        createPostEditor,
        removePost,
        editPost,
        closeEditor,
        addPost,
        showMorePosts,
        logout,
        login,
        filter,
    }
})();