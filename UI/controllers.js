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
            } else {
                onError('bad input');
            }
        } else {
            const postToSave = Object.assign({}, post, fields);
            if (posts.addPost(postToSave)) {
                closeEditor(editor, id);
            } else {
                onError('bad input');
            }
        }
    }

    return {
        createPostComponent,
        createPostEditor,
        removePost,
        editPost,
        closeEditor,
        addPost,
    }
})();