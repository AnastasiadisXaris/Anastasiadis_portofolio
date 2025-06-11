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

