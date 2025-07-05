document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projects = document.querySelectorAll(".project");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            projects.forEach(project => {
                if (category === "all" || project.dataset.category === category) {
                    project.classList.remove("hidden");
                } else {
                    project.classList.add("hidden");
                }
            });
        });
    });
});

// script.js
async function loadBloggerPosts() {
    try {
      const res = await fetch('/api/blog');
      if (!res.ok) throw new Error('Failed to load posts');
      const data = await res.json();
  
      // Κάνε εδώ render τα posts όπως θέλεις
      console.log(data);
  
      // Παράδειγμα: εμφάνιση τίτλων σε λίστα
      const list = document.getElementById('posts-list');
      list.innerHTML = '';
      data.items.forEach(post => {
        const li = document.createElement('li');
        li.textContent = post.title;
        list.appendChild(li);
      });
  
    } catch (error) {
      console.error(error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadBloggerPosts);
  
  
  // Εκτελείται μόνο αν υπάρχει το div blog-posts στη σελίδα
  document.addEventListener("DOMContentLoaded", loadBloggerPosts);
  

  fetch('https://anastasiadisxaris.blogspot.com/feeds/posts/default?alt=json&max-results=500')
  .then(response => response.json())
  .then(data => {
    const entries = data.feed.entry || [];
    const labelSet = new Set();

    entries.forEach(entry => {
      const categories = entry.category || [];
      categories.forEach(cat => {
        if (cat.term) labelSet.add(cat.term);
      });
    });

    const labelList = document.getElementById('label-list');
    labelSet.forEach(label => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = label;
      a.classList.add('label-link');
      li.appendChild(a);
      labelList.appendChild(li);
    });

    // (Εδώ μπορείς να προσθέσεις και event listeners για φιλτράρισμα)
  })
  .catch(err => console.error('Σφάλμα στο φόρτωμα feed:', err));
