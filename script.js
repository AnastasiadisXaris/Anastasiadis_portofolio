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

function loadBloggerPosts() {
    const blogID = "443892277432523371";
    const apiKey = "AIzaSyCMLzNxm7fU08dN7kZTupRV1IZjfU_Pqmk";
    const maxPosts = 5;
  
    fetch(`https://www.googleapis.com/blogger/v3/blogs/${blogID}/posts?key=${apiKey}&maxResults=${maxPosts}`)
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById("blog-posts");
        if (!container) return;
        let output = "<h3>📘 Πρόσφατα Άρθρα</h3><ul>";
        data.items.forEach(post => {
          output += `<li>
            <a href="${post.url}" target="_blank">${post.title}</a>
            <p>${post.content.substring(0, 150)}...</p>
          </li>`;
        });
        output += "</ul>";
        container.innerHTML = output;
      })
      .catch(err => {
        console.error("Σφάλμα:", err);
      });
  }
  
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
