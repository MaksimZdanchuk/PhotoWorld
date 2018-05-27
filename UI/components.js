var components = (function() {
    var templates = document.getElementById("templates");

    function render(html) {
        var template = document.createElement('template');
        template.innerHTML = html;
        return template.content.firstChild;
    }

    // function getTemplate(name) {
    //     var template =  templates.querySelector(`#${name}`).cloneNode();
    // }

    function Post(post) {
        var dateString = post.createdAt.toLocaleString().split(',')[0];
        var html = `
        <div class="block" id="postTemplate">
            <div class="nickname">${post.author}</div>
            <div class="posted">${dateString}</div>
            <img class="image" src="${post.photoLink}">
            <br/>
            <div class="like"><i class="fas fa-heart" style="font-size:2em"></i></div>
            <div class="count">${post.likes.length}</div>
            <div class="comment">
                Comment:&nbsp
                <span class="description">${post.description}</span>&nbsp
                <span class="tag">${post.tag ? ('#' + post.tag) : ''}</span>
            </div>
        </div>
        `.trim();
        var element = render(html);
        return element;
    }

    return {
        Post
    };
})();