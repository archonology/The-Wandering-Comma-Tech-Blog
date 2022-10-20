//blog deletes
const deletePostFormHandler = async (event) => {
  event.preventDefault();

  const confirmDelete = document.querySelector("#confirmDelete").value;
  const blog_id = document.querySelector("#blog-id").value;

  console.log(confirmDelete);
  console.log(blog_id);

  if (confirmDelete == "Yes" && blog_id) {
    const response = await fetch('api/posts', {
      method: 'DELETE',
      body: JSON.stringify({ confirmDelete, blog_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      alert('post deleted');
      document.location.replace('/dashboard');
    } else {
      alert('Delete cancelled');
    }
  }
};


document
  .querySelector('.delete-form')
  .addEventListener('submit', deletePostFormHandler);
