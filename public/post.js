const postComment = async (event) => {
    event.preventDefault();
    if (event.target.hasAttribute('data-id')) {
        const post_id = event.target.getAttribute('data-id');
        const content = document.querySelector(`#comment${post_id}`).value;
        
        if (content) {
            const response = await fetch(`/api/comments`, {
              method: 'POST',
              body: JSON.stringify({ content, post_id  }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              window.location.reload();
            } else {
              alert('Failed to post comment');
            }
        }
    }
  }
  
  document
    .querySelector('#commentButton')
    .addEventListener('click', postComment);