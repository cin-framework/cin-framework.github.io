/**
 * CIN Framework JavaScript Core
 * @package CIN Framework
 * @author Mawi Man
 * @license Proprietary - All rights reserved to Ayoub Alarjani
 */

let cinCurrentLang = "en";

function setLanguage(lang) {
    cinCurrentLang = lang;
    const html = document.documentElement;
    
    try {
        localStorage.setItem("cin_preferred_language", lang);
    } catch (e) {}
    
    if (lang === "ar") {
        html.setAttribute("dir", "rtl");
        html.setAttribute("lang", "ar");
    } else {
        html.setAttribute("dir", "ltr");
        html.setAttribute("lang", "en");
    }
    
    document.querySelectorAll(".cin-lang-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    
    const activeBtn = document.querySelector(`[onclick="setLanguage('${lang}')"]`);
    if (activeBtn) activeBtn.classList.add("active");
    
    updateTranslations();
    
    const main = document.querySelector(".cin-main");
    if (main) {
        main.classList.add("cin-fade-in");
        setTimeout(() => {
            main.classList.remove("cin-fade-in");
        }, 600);
    }
}

function sanitizeHtml(html) {
    const allowedTags = ['strong', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(element => {
        if (!allowedTags.includes(element.tagName.toLowerCase())) {
            element.outerHTML = element.textContent;
        }
    });
    
    return temp.innerHTML;
}

function updateTranslations() {
    document.querySelectorAll("[data-translate]").forEach(element => {
        const arabicText = element.getAttribute("data-translate");
        
        if (cinCurrentLang === "ar") {
            element.innerHTML = sanitizeHtml(arabicText);
        } else {
            const englishText = element.getAttribute("data-original-text");
            if (englishText) {
                element.innerHTML = sanitizeHtml(englishText);
            }
        }
    });
    
    document.querySelectorAll("[data-translate-placeholder]").forEach(element => {
        const arabicPlaceholder = element.getAttribute("data-translate-placeholder");
        
        if (cinCurrentLang === "ar") {
            element.setAttribute("placeholder", arabicPlaceholder);
        } else {
            const englishPlaceholder = element.getAttribute("data-original-placeholder");
            if (englishPlaceholder) {
                element.setAttribute("placeholder", englishPlaceholder);
            }
        }
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) sidebar.classList.toggle("open");
}

function openModal() {
    const modal = document.getElementById("modalOverlay");
    if (modal) modal.classList.add("open");
}

function closeModal() {
    const modal = document.getElementById("modalOverlay");
    if (modal) modal.classList.remove("open");
}

function handleEmailSubmit(event) {
    event.preventDefault();
    const email = event.target.querySelector(".cin-input").value;
    const message = document.getElementById("subscriptionMessage");
    
    if (message) {
        message.textContent = cinCurrentLang === "ar" 
            ? `شكراً! تم تسجيل بريدك الإلكتروني: ${email}`
            : `Thank you! Your email has been registered: ${email}`;
        message.style.display = "block";
        setTimeout(() => {
            message.style.display = "none";
        }, 5000);
    }
    
    event.target.reset();
}

function copyCode(button) {
    const code = button.closest(".cin-code-block").querySelector("code").textContent;
    const textarea = document.createElement("textarea");
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        const success = document.execCommand("copy") ? "Copied!" : "Failed to copy!";
        button.textContent = success;
        setTimeout(() => {
            button.textContent = "Copy";
        }, 2000);
    } catch (err) {
        button.textContent = "Error!";
        setTimeout(() => {
            button.textContent = "Copy";
        }, 2000);
    }
    
    document.body.removeChild(textarea);
}

function updateQuantity(button, change) {
    const quantityElement = button.parentNode.querySelector(".cin-cart-quantity-value");
    let quantity = parseInt(quantityElement.textContent) + change;
    if (quantity < 0) quantity = 0;
    quantityElement.textContent = quantity;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function toggleAccordion(header) {
    const content = header.closest(".cin-accordion-item").querySelector(".cin-accordion-content");
    header.classList.toggle("active");
    
    if (content.classList.contains("open")) {
        content.style.maxHeight = null;
        content.classList.remove("open");
    } else {
        content.style.maxHeight = "9999px";
        content.classList.add("open");
    }
}

let slideIndex = 1;

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("cin-carousel-item");
    const indicators = document.getElementsByClassName("cin-carousel-indicator");
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(-${(slideIndex - 1) * 100}%)`;
        slides[i].classList.remove("active");
    }
    
    for (i = 0; i < indicators.length; i++) {
        indicators[i].classList.remove("active");
    }
    
    if (slides[slideIndex - 1]) slides[slideIndex - 1].classList.add("active");
    if (indicators[slideIndex - 1]) indicators[slideIndex - 1].classList.add("active");
}

function nextSlide() {
    showSlides(slideIndex += 1);
}

function prevSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function toggleCollapse(button) {
    const content = button.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove("open");
    } else {
        content.style.maxHeight = "9999px";
        content.classList.add("open");
    }
}

function toggleDropdown(button) {
    button.nextElementSibling.classList.toggle("show");
}

function getSavedLanguage() {
    try {
        const saved = localStorage.getItem("cin_preferred_language");
        return saved && ["en", "ar"].includes(saved) ? saved : "en";
    } catch (e) {
        return "en";
    }
}

window.onclick = function(event) {
    if (!event.target.matches(".cin-btn")) {
        const dropdowns = document.getElementsByClassName("cin-dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

document.addEventListener("click", function(event) {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.querySelector(".cin-menu-toggle");
    
    if (window.innerWidth <= 768 && sidebar && menuToggle && 
        !sidebar.contains(event.target) && !menuToggle.contains(event.target) && 
        sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
    }
});

window.addEventListener("resize", function() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && window.innerWidth > 768) {
        sidebar.classList.remove("open");
    }
    showSlides(slideIndex);
});

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("[data-translate]").forEach(element => {
        const englishText = element.textContent.trim();
        element.setAttribute("data-original-text", englishText);
    });
    
    document.querySelectorAll("[data-translate-placeholder]").forEach(element => {
        const englishPlaceholder = element.getAttribute("placeholder");
        if (englishPlaceholder) {
            element.setAttribute("data-original-placeholder", englishPlaceholder);
        }
    });
    
    const savedLang = getSavedLanguage();
    setLanguage(savedLang);
    
    document.querySelectorAll(".cin-card-feature").forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + "s";
    });
    
    const loadingScreen = document.getElementById("loadingScreen");
    if (loadingScreen) loadingScreen.classList.add("hidden");
    
    showSlides(slideIndex);
    
    if (typeof Prism !== "undefined") {
        Prism.plugins.autoloader;
    }
});

const CinFramework = {
    theme: {
        setDarkMode: () => {
            document.body.classList.add("cin-dark");
        },
        setLightMode: () => {
            document.body.classList.remove("cin-dark");
        }
    },
    utils: {
        addClass: (element, className) => {
            element.classList.add(className);
        },
        removeClass: (element, className) => {
            element.classList.remove(className);
        },
        toggleClass: (element, className) => {
            element.classList.toggle(className);
        }
    }
};

window.CinFramework = CinFramework;