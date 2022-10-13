//blog deletes
const updatePostFormHandler = async (event) => {
  event.preventDefault();

  //how to get the user id in this method?
  const title = document.querySelector("#title").value.trim();
  const post = document.querySelector("#newPost").value.trim();
  let user_id;

  if (event) {
    // do I have the path I need in routes?
    const response = await fetch("/posts/:id", {
      method: "PUT",
      body: JSON.stringify({ title, post, user_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("post deleted");
    } else {
      alert("Failed to delete post.");
    }
  }
};

document
  .querySelector(".update")
  .addEventListener("submit", updatePostFormHandler);
