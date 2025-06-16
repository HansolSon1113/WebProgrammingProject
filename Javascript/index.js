const fades = {
    In: "fade",
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

    document.body.style.overflow = '';
    const helloSection = document.getElementById('hello');
    const helloText = document.getElementById('hello-text');

    const obs = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.style.overflow = 'hidden';
                    helloText.textContent = '저희에 대해 소개해드릴게요!';
                    setTimeout(() => {
                        helloText.textContent = "안녕하세요!"
                        document.body.style.overflow = '';
                    }, 2000);
                    observer.unobserve(entry.target);
                }
            })
        },
        { threshold: 0.5 }
    );
    obs.observe(helloSection);
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
    { threshold: 0.4 }
);





