const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#comment').value.trim();
    const username = document.querySelector('#username').value.trim();
  
    if (comment && username) {
      // do I have the path I need in routes?
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, username }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('comment posted');
      } else {
        alert('Failed to post comment.');
      }
    }
  };
  
  document
    .querySelector('.comment-form')
    .addEventListener('submit', commentFormHandler);
  
  