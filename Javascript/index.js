const fades = {
    In: "fade-in",
    Left: "fade-left",
    Right: "fade-right",
    Bottom: "fade-bottom"
};
Object.freeze(fades);

document.addEventListener("DOMContentLoaded", () => {
    const fadeClasses = Object.values(fades);
    const selector = fadeClasses.map(c => `.${c}`).join(",");
    document.querySelectorAll(selector).forEach(element => {
        observer.observe(element);
    });
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in");
            }
            else {
                entry.target.classList.remove("fade-in");
            }
        })
    },
    { threshold: 0.1 }
);

