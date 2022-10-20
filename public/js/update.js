//post updates
const updatePostFormHandler = async (event) => {
  event.preventDefault();

  
  const title = document.querySelector("#title").value.trim();
  const post = document.querySelector("#newPost").value.trim();
  const blog_id = document.querySelector("#blog-id").value;


  if (title && post && blog_id) {
    // do I have the path I need in routes?
    const response = await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify({ title, post, blog_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
      alert("Failed to update post.");
    }
  }
};

document
  .querySelector(".update-form")
  .addEventListener("submit", updatePostFormHandler);
