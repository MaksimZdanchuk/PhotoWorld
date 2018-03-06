var photoFunc = ( function() {
	var Posts = [
{
	id: '1',
	description: 'Всем привет!',
	createdAt: new Date('2018-01-23T21:00:00'),
	author: 'youngboy88',
	photoLink: 'http;//.../.../....jpg'
},
{
	id: '2',
	description: 'Рада бы дома;)',
	createdAt: new Date('2018-01-23T18:00:00'),
	author: 'martin.ksu',
	photoLink: 'http:// '
},
{
	id: '3',
	description: 'Happy Birthday!',
	createdAt: new Date('2018-01-22T17:00:00'),
	author: 'martin.ksu',
	photoLink: 'http:// '
},
{
	id: '4',
	description: 'Рада бы дома;)',
	createdAt: new Date('2018-01-23T18:00:00'),
	author: 'martin.ksu',
	photoLink: 'http:// '
},
{
	id: '5',
	description: 'hi!',
	createdAt: new Date('2018-01-23T10:00:00'),
	author: 'coolstory',
	photoLink: 'http;//.../.../....jpg'
},
{
	id: '6',
	description: 'new album',
	createdAt: new Date('2018-01-23T09:00:00'),
	author: 'music2018',
	photoLink: 'http;//.../.../....jpg'
},
{
	id: '7',
	description: 'HOW!?',
	createdAt: new Date('2018-01-23T08:00:00'),
	author: 'daddy222',
	photoLink: 'http;//.../.../....jpg'
},
{
	id: '8',
	description: '17 y.o.',
	createdAt: new Date('2018-01-23T07:00:00'),
	author: 'youngboy88',
	photoLink: 'http;//.../.../....jpg'
},
{
	id: '9',
	description: 'kak dela???',
	createdAt: new Date('2018-01-23T06:00:00'),
	author: 'martin.ksu',
	photoLink: 'http;//.../.../....jpg'
},
{
	id: '10',
	description: 'dadada',
	createdAt: new Date('2018-01-23T05:00:00'),
	author: 'youngboy88',
	photoLink: 'http;//.../.../....jpg'
},
{
	id: '11',
	description: 'nice!',
	createdAt: new Date('2018-01-23T05:00:00'),
	author: 'news',
	photoLink: 'http;//.../.../....jpg'
}
];

function getPosts(skip, top, filterConfig){
	skip = skip || 0;
	top = top || 10;
	if (filterConfig == undefined){
		return Posts.slice(skip,skip+top);
	}
	else{
		var resault;
		for(var i=0;i<Posts.length;i++){
			if(Posts[i].author == filterConfig.author){
				resault.push(Posts[i]);
			}
		}	
		return resault.slice(skip,skip+top);
	}
}
function getPost (id){
	for( var i = 0; i<Posts.length; i++){
		if(Posts[i].id == id){
			return Posts[i];
		}
	}
	return null;
}

function validatePost(Post){
	if (Post.id === undefined || Post.description === undefined || Post.createdAt === undefined || Post.author === undefined || Post.photoLink === undefined){
		return false;
	}	
	if (typeof Post.id !== 'string'){
		return false;
	}
	if (typeof Post.description !== 'string'){
		return false;
	}
	if (typeof Post.createdAt !== 'string'){
		return false;
	}
	if (typeof Post.author !== 'string'){
		return false;
	}
	if (typeof Post.photoLink !== 'string'){
		return false;
	}
	return true;
}

function addPost (Post){
	if (validatePost(Post) == true){
	Posts.push(Post);
	return true;
	}
	else {
		return false;
		}
}
function removePost(id){
	var ele;
	for( var i = 0; i<Posts.length; i++){
		if(Posts[i].id == id){
			ele = i;
		}
	}
	Posts.splice(ele,1);
}
function editPost(id, Post){
	for( var i = 0; i<Posts.length; i++){
		if(Posts[i].id == id){
			Posts[i] = Post;
		}
	}
	if (validatePost(Post) == true){
	return true;
	} 
	else {return false;}
}

return {
	addPost,
	editPost,
	getPost,
	getPosts,
	removePost,
	validatePost
}
}
)();

