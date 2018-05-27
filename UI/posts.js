var posts = (function () {
    var posts = [];
    var idCounter = 0;


    function generateId() {
        var id = idCounter.toString();
        idCounter++;
        return id;
    }

    // function isLengthIn(s, from, to) {
    //     return s.length >= from && (to ? s.length <= to : true);
    // }

    function isSameDate(d1, d2) {
        return d1.toISOString().slice(0, 10) == d2.toISOString().slice(0, 10);
    }

    function likePost(id, user) {
        var post = posts.find(thisId => id === thisId);
        var likeInd = post.likes.find(thisUser => thisUser === user);
        if (likeInd) {
            post.likes.splice(likeInd, 1);
        } else {
            post.likes.push(user);
        }
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
            var result = [];
            for (var i = 0; i < posts.length; i++) {
                if (isMatchesConfig(posts[i], filterConfig)) {
                    result.push(post);
                }
            }
            return result.slice(skip, skip + top);
        }
    }

    function getPost(id) {
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                return posts[i];
            }
        }
        return null;
    }

    function validatePost(post) {
        if (!post.id || !post.description || !post.createdAt || !post.author || !post.photoLink) {
            return false;
        }
        if (typeof post.id !== 'string' || post.id.length === 0) {
            return false;
        }
        if (typeof post.description !== 'string' || 
            post.description.length < 1 || post.description.length > 200) {
            return false;
        }
        if (!post.createdAt instanceof Date) {
            return false;
        }
        if (typeof post.author !== 'string' || post.author.length === 0) {
            return false;
        }
        if (typeof post.photoLink !== 'string' || post.photoLink.length === 0) {
            return false;
        }
        if (post.tag && (typeof post.tag !== 'string' || post.tag.length === 0)) {
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
        var ind = posts.findIndex(thisId => thisId === id);
        if (!ind) {
            return false;
        }
        posts.splice(ind, 1);
        return true;
    }

    function editPost(id, postFields) {
        var ind = posts.find(thisId => thisId === id);
        if (!ind) {
            return false;
        }
        var editedPost = Object.assign({}, posts[ind], postFields);
        if (!validatePost(editedPost)) {
            return false;
        }
        posts[ind] = editedPost;
        return true;
    }

    return {
        addPost,
        editPost,
        getPost,
        getPosts,
        removePost,
        validatePost
    }
})();