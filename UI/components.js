const components = (function() {
    function render(html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    }

    function stub() {

    }

    function Post(post, user, { onRemove, onEdit, onLike }) {
        const dateString = post.createdAt.toLocaleString().split(',')[0];
        const isAuthor = user === post.author;
        const html = `
        <div class="block" id="post${post.id}">
            <div class="postHeader">
                <div class="nickname">${post.author}</div>
                <div class="posted">${dateString}</div>
            </div>
            <img class="image" src="${post.photoLink}">
            <br/>
            <div class="belowPhoto">
                <div>
                    <span class="like"><i class="fas fa-heart" style="font-size:2em"></i></span>
                    <div class="count">${post.likes.length}</div>
                </div>
                <div class="comment">
                    <span class="description">${post.description}</span>&nbsp
                    <span class="tag">${post.tag ? ('#' + post.tag) : ''}</span>
                </div>
                <div  class="${!isAuthor ? 'hide' : ''}">
                    <span class="editIcon"><i class="fas fa-edit" style="font-size:2em"></i></span>
                    <span class="removeIcon"><i class="fas fa-times" style="font-size:2em"></i></span>
                </div>
            </div>
        </div>
        `.trim();
        const element = render(html);
        element.querySelector('.editIcon').onclick = () => {
            onEdit(post.id);
        }
        element.querySelector('.removeIcon').onclick = () => {
            onRemove(post.id);
        }
        if (user) {
            element.querySelector('.like').onclick = () => {
                onLike(post.id, user);
            }
        }
        return element;
    }

    function PostEditor(post, { onSave = stub, onCancel = stub}) {
        const dateString = post.createdAt.toLocaleString().split(',')[0];
        const html = `
        <div class="block">
        <div class="postHeader" class>
            <div class="nickname">${post.author}</div>
            <div class="posted">${dateString}</div>
        </div>
        <div class="photoLinkEditor">
            <input type="text" class="photoLinkInput" value="${post.photoLink}"placeholder="photo link">
            <button class="previewButton">Preview</button>
        </div>
        <img class="image" src="${post.photoLink}">
        <br/>
        <div class="belowPhoto belowPhotoEditor">
            <div class="comment">
                <input type="text" 
                    class="descriptionInput" 
                    placeholder="description"
                    value="${post.description}">
                <br />
                <input
                    type="text"
                    class="tagInput" 
                    placeholder="#tag"
                    value="${post.tag}">
            </div>
            <div>
                <button class="savePost">Save</button>
                <button class="closeEditor">Cancel</button>
            </div>
        </div>
        `.trim();
        const element = render(html);
        element.querySelector('.savePost').onclick = () => {
            const photoLink = element.querySelector('.photoLinkInput').value;
            const description = element.querySelector('.descriptionInput').value;
            const tag = element.querySelector('.tagInput').value;
            const fields = { photoLink, description, tag };
            onSave(element, post, fields, (error) => alert(error));
        };
        element.querySelector('.closeEditor').onclick = () => {
            onCancel(element, post.id);
        }
        element.querySelector('.previewButton').onclick = () => {
            const photoLink = element.querySelector('.photoLinkInput').value;
            element.querySelector('.image').src = photoLink;
        }

        return element;
    }

    function updatePage(state) {
        document.getElementById('username').innerText = state.user || 'guest';
        const menu = document.getElementsByClassName('userMenu')[0];
        if (state.user) {
            menu.children[0].style.display = 'block';
            menu.children[1].style.display = 'none';
        } else {
            menu.children[0].style.display = 'none';
            menu.children[1].style.display = 'block';
        }
    }

    function clearPosts() {
        const container = document.getElementById('posts');
        const newContainer = document.createElement('div');
        newContainer.id = 'posts';
        container.parentNode.replaceChild(newContainer, container);
    }

    return {
        Post,
        PostEditor,
        updatePage,
        clearPosts,
    };
})();