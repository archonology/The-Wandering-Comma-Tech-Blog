//post updates
const updatePostFormHandler = async (event) => {
  event.preventDefault();

  
  const title = document.querySelector("#title").value.trim();
  const post = document.querySelector("#newPost").value.trim();

  if (title && post) {
    // do I have the path I need in routes?
    const response = await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify({ title, post }),
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
