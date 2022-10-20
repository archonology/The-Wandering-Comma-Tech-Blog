const commentFormHandler = async (event) => {
    event.preventDefault();
  
    //how to get the user id in this method?
    const comment = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector("#blog-id").value;
  
    if (comment && blog_id) {
      // do I have the path I need in routes?
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment, blog_id }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('comment posted');
        document.location.replace('/');
      } else {
        alert('Failed to post comment.');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
  
  