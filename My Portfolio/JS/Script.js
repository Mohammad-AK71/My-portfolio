
 document.addEventListener("DOMContentLoaded", () => {

 
    const nav = document.querySelector(".nav");
    const navList = document.querySelector(".nav ul");

    if (nav && navList) {

        const menuBtn = document.createElement("button");

        menuBtn.className = "menu-toggle";
        menuBtn.innerHTML = "☰";
        menuBtn.setAttribute("aria-label", "Toggle navigation");
        menuBtn.setAttribute("aria-expanded", "false");

        nav.prepend(menuBtn);

        menuBtn.addEventListener("click", () => {

            const isOpen = navList.classList.toggle("active");

            menuBtn.innerHTML = isOpen ? "✕" : "☰";
            menuBtn.setAttribute("aria-expanded", isOpen);

        });

        // Close menu after clicking a link

        navList.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navList.classList.remove("active");

                menuBtn.innerHTML = "☰";
                menuBtn.setAttribute("aria-expanded", "false");

            });

        });
    }

 

    const sections = document.querySelectorAll(
        ".stack-section"
    );

    const navLinks = document.querySelectorAll(".nav ul a");

    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + currentId
                        );

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );

    sections.forEach(section => {
        if (section.id) {
            sectionObserver.observe(section);
        }
    });

 

    const revealElements = document.querySelectorAll(
        ".heroHeaderLeft, .heroHeaderRight, " +
        ".aboutMeFirst, .aboutMeSecond, " +
        ".skillsTop, .skillCard, " +
        ".projectsLeft, .contactLeft, .contactBox"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });

 

    const typingElement = document.querySelector(".typing-text");

    if (typingElement) {

        const words = [
            "Frontend Developer",
            "Web Designer",
            "Creative Coder"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (deleting) {

                charIndex--;

            } else {

                charIndex++;

            }

            typingElement.textContent =
                currentWord.substring(0, charIndex);

            let speed = deleting ? 55 : 110;

            if (!deleting && charIndex === currentWord.length) {

                deleting = true;
                speed = 1300;

            } else if (deleting && charIndex === 0) {

                deleting = false;

                wordIndex = (wordIndex + 1) % words.length;

                speed = 400;

            }

            setTimeout(typeEffect, speed);

        }

        typeEffect();
    }
 

    const progressBar = document.createElement("div");

    progressBar.className = "scroll-progress";

    document.body.appendChild(progressBar);

    function updateProgress() {

        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            scrollHeight > 0
                ? (scrollTop / scrollHeight) * 100
                : 0;

        progressBar.style.width = progress + "%";

    }

    window.addEventListener("scroll", updateProgress, {
        passive: true
    });

    updateProgress();
 

    const topButton = document.createElement("button");

    topButton.className = "back-to-top";
    topButton.innerHTML = "↑";
    topButton.setAttribute("aria-label", "Back to top");

    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {

        topButton.classList.toggle(
            "visible",
            window.scrollY > 400
        );

    }, { passive: true });

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

 

    const contactForm = document.querySelector(".contactBox");

    if (contactForm) {

        const statusMessage = document.createElement("p");

        statusMessage.className = "form-status";

        statusMessage.setAttribute("role", "status");
        statusMessage.setAttribute("aria-live", "polite");

        contactForm.appendChild(statusMessage);

        contactForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name = contactForm.querySelector("#name").value.trim();
            const email = contactForm.querySelector("#email").value.trim();
            const subject = contactForm.querySelector("#subject").value.trim();
            const message = contactForm.querySelector("#message").value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!name || !email || !subject || !message) {

                statusMessage.textContent =
                    "Please fill in all fields.";

                statusMessage.className = "form-status error";

                return;
            }

            if (!emailPattern.test(email)) {

                statusMessage.textContent =
                    "Please enter a valid email address.";

                statusMessage.className = "form-status error";

                return;
            }

            statusMessage.textContent =
                "Your form is valid! Connect an email service to send your message.";

            statusMessage.className = "form-status success";

        });

    }

 

    const footerText = document.querySelector(".footerSecond p");

    if (footerText) {

        footerText.textContent =
            `© ${new Date().getFullYear()} MAK's Portfolio. All rights reserved.`;

    }
 

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                button.blur();
            }

        });

    });


    console.log("MAK's Portfolio JavaScript Loaded Successfully!");

});
