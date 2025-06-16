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
                    setTimeout(() => {
                        helloText.textContent = '저희에 대해 소개해드릴게요!';
                    }, 2000);
                    setTimeout(() => {
                        document.body.style.overflow = '';
                    }, 1000);
                    observer.unobserve(entry.target);
                }
            })
        },
        { threshold: 0.6 }
    );
    obs.observe(helloSection);

    document.querySelectorAll('#univ-desc-sidebar .btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.desc-content').forEach(div => {
                div.classList.remove('active');
            });
            const targetId = this.getAttribute('data-content');
            document.getElementById(targetId).classList.add('active');
        });
    });
    document.getElementById("univ-info-1").classList.add("active");
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





