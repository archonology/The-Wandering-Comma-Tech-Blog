const deleteFormHandler = async (event) => {
    event.preventDefault();
  
    // const comment = document.querySelector('#comment').value.trim();
    // const username = document.querySelector('#username').value.trim();
  
    if (event) {
      // do I have the path I need in routes?
      const response = await fetch('/posts/:id', {
        method: 'POST',
        body: JSON.stringify({ comment, username }),
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
    .addEventListener('submit', deleteFormHaandler);
  
  