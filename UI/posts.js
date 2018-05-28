const posts = (function () {
    const posts = [];
    let idCounter = 0;


    function isString(s) {
        return (typeof s === 'string') || (s instanceof String);
    }

    function generateId() {
        return (++idCounter).toString();
    }

    function isSameDate(d1, d2) {
        return d1.toISOString().slice(0, 10) === d2.toISOString().slice(0, 10);
    }

    function likePost(id, user) {
        const post = posts.find(post => post.id === id);
        if (!post) {
            return false;
        }
        const likeInd = post.likes.findIndex(likeFrom => likeFrom === user);
        if (likeInd !== -1) {
            post.likes.splice(likeInd, 1);
        } else {
            post.likes.push(user);
        }
        return true;
    }

    function isMatchesConfig(post, filterConfig) {
        if (filterConfig.author && post.author !== filterConfig.author) {
            return false;
        } 
        if (filterConfig.createdAt && !isSameDate(filterConfig.createdAt, post.createdAt)) {
            return false;
        }
        if (filterConfig.tag && !post.tag !== filterConfig.tag) {
            return false;
        }
        return true;
    }

    function getPosts(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || 10;
        if (!filterConfig) {
            return posts.slice(skip, skip + top);
        }
        else {
            const filter = post => isMatchesConfig(post, filterConfig);
            return posts.filter(filter).slice(skip, skip + top);
        }
    }

    function getPost(id) {
        return posts.find(post => post.id === id);
    }

    function validatePost(post) {
        if (!post.id || !post.description || !post.createdAt || !post.author || !post.photoLink) {
            return false;
        }
        if (!isString(post.id) || post.id.length === 0) {
            return false;
        }
        if (!isString(post.description) || 
            post.description.length < 1 || post.description.length > 200) {
            return false;
        }
        if (!post.createdAt instanceof Date) {
            return false;
        }
        if (!isString(post.author) || post.author.length === 0) {
            return false;
        }
        if (!isString(post.photoLink) || post.photoLink.length === 0) {
            return false;
        }
        if (post.tag && !isString(post.tag)) {
            return false;
        }
        return true;
    }

    function addPost(post) {
        if (validatePost(post)) {
            idCounter = Math.max(idCounter, post.id);
            if (!post.likes) {
                post.likes = [];
            }
            posts.push(post);
            return true;
        }
        return false;
    }

    function removePost(id) {
        const ind = posts.findIndex(post => post.id === id);
        if (ind === -1) {
            return false;
        }
        posts.splice(ind, 1);
        return true;
    }

    function editPost(id, postFields) {
        const ind = posts.findIndex(post => post.id === id);
        if (ind === -1) {
            return false;
        }
        const editedPost = Object.assign({}, posts[ind], postFields);
        if (!validatePost(editedPost)) {
            return false;
        }
        posts[ind] = editedPost;
        return true;
    }

    function createPost(author) {
        return {
            author,
            createdAt: new Date(),
            likes: [],
            tag: '',
            photoLink: '',
            description: '',
            id: generateId(),
        };
    }

    return {
        addPost,
        editPost,
        getPost,
        getPosts,
        removePost,
        validatePost,
        likePost,
        createPost,
    }
})();