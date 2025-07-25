document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Testimonial Carousel
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonials.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        updateDots(index);
    }

    function updateDots(index) {
        dotsContainer.innerHTML = ''; // Clear existing dots
        testimonials.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === index) {
                dot.classList.add('active');
            }
            dot.dataset.slide = i;
            dot.addEventListener('click', () => showTestimonial(i));
            dotsContainer.appendChild(dot);
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
        showTestimonial(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    });

    // Auto-advance carousel (optional)
    let testimonialInterval = setInterval(() => {
        currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    }, 5000); // Change testimonial every 5 seconds

    // Pause on hover
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
        testimonialCarousel.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
                showTestimonial(currentIndex);
            }, 5000);
        });
    }

    // Initialize the first testimonial and dots
    showTestimonial(currentIndex);
});