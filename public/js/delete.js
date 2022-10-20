const deletePost = async (event) => {
  event.preventDefault();
  const blog_id = document.querySelector("#blog-id").value;

  console.log("The Blog id for deleting is " + blog_id);
  if (blog_id) {
    const response = await fetch('/api/posts', {
      method: 'DELETE',
      body: JSON.stringify({ blog_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('blog deleted');
      document.location.replace('/dashboard');
    } else {
      alert('delete cancelled');
    }
  }
};

document.getElementById("blog-id").addEventListener("click", deletePost);
