//blog deletes
const deletePostFormHandler = async (event) => {
  event.preventDefault();

 //how to get the user id in this method?
//  const title = document.querySelector('#title').value.trim();
//  const post = document.querySelector('#newPost').value.trim();
//  let user_id;

  if (event) {
    // do I have the path I need in routes?
    const response = await fetch('/posts/:id', {
      method: 'DELETE',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('post deleted');
    } else {
      alert('Failed to delete post.');
    }
  }
};


document
  .querySelector('.delete')
  .addEventListener('submit', deletePostFormHandler);
