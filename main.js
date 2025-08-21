// Function to load blog posts dynamically
const blogContainer = document.querySelector('#blog .grid');
const tabButtons = document.querySelectorAll(".tab-btn");
let allPosts = [];

// Fetch posts from JSON
fetch("./data/blog/posts.json")
.then(res => res.json())
.then(data => {
    allPosts = data; renderPosts(allPosts);
});

function renderPosts(posts) {
    const latestPosts = posts.slice().reverse().slice(0, 4);
    blogContainer.innerHTML = "";

    latestPosts.forEach((post, index) => {
        const postElement = document.createElement("a");
        postElement.href = `./data/blog/${post.slug}`;
        postElement.className = "post-card bg-gray-900 p-6 mb-3 rounded-lg border border-green-800 hover:border-green-500 transition-all block";
        postElement.innerHTML = `
            <div class="flex items-center mb-3">
                <div class="w-2 h-2 rounded-full ${post.color || 'bg-blue-500'} mr-2"></div>
                <h3 class="text-xl font-mono">${post.title}</h3>
            </div>
            <p class="text-gray-300">${post.description}</p>
            <p class="text-xs mb-2">${post.date}</p>
            <div class="mt-3 text-xs text-green-400">${post.tags}</div>
        `;

        blogContainer.appendChild(postElement);

        setTimeout(() => {
            postElement.classList.add("show");
        }, index * 150);
    });
}

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("bg-green-800"));
        tabButtons[0].classList.remove("bg-green-700");
        btn.classList.add("bg-green-800");

        const category = btn.dataset.category;
        if (category === "all") {
            renderPosts(allPosts);
        } else {
            const filtered = allPosts.filter(post => post.category.toLowerCase().includes(category.toLowerCase()));
            renderPosts(filtered);
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    loadCertificatesCarousel();
    // Typing animation for name
    const nameElement = document.getElementById('name');
    const titleElement = document.getElementById('title');

    const nameText = ">_ Mazen Ahmed";
    const titles = ["Ethical Hacker", "Penetration Tester", "Cybersecurity Student", "CTF Fighter", "Learning Enthusiast", "Bug Hunter"];
    let titleIndex = 0;
    let nameIndex = 0;

    function typeName() {
        if (nameIndex < nameText.length) {
            nameElement.textContent += nameText.charAt(nameIndex);
            nameIndex++;
            setTimeout(typeName, 100);
        } else {
            setTimeout(typeTitle, 500);
        }
    }

    function typeTitle() {
        titleElement.textContent = "";
        let titleText = titles[titleIndex];
        let titleCharIndex = 0;

        function typeTitleChars() {
            if (titleCharIndex < titleText.length) {
                titleElement.textContent += titleText.charAt(titleCharIndex);
                titleCharIndex++;
                setTimeout(typeTitleChars, 100);
            } else {
                titleIndex = (titleIndex + 1) % titles.length;
                setTimeout(typeTitle, 2000); // Wait before typing the next title
            }
        }
        typeTitleChars();
    }

    setTimeout(typeName, 500);
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById("backToTop");
window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.classList.remove("hidden");
    } else {
        backToTopButton.classList.add("hidden");
    }
};

backToTopButton.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


const toggleBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


function openPopup(imageSrc, title) {
    const popup = document.getElementById('imagePopup');
    const popupImg = document.getElementById('popupImage');
    const popupTitle = document.getElementById('popupTitle');

    popupImg.src = imageSrc;
    popupTitle.textContent = title;
    popup.classList.remove('hidden');
}

function closePopup(event) {
    const popup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');

    // Only close if click target is the popup background (not the image or title)
    if (event.target === popup) {
        popup.classList.add('hidden');
    }
}


function loadCertificatesCarousel(limit = 5) {
    fetch('./data/certificates.json')
        .then(response => response.json())
        .then(certificates => {
            const container = document.getElementById('certificates-carousel');
            const sectCerts = certificates.filter(cert => cert.category.toLowerCase().includes('security'));
            const latest = sectCerts.slice().reverse().slice(0, limit);

            latest.forEach(cert => {
                const card = document.createElement('div');
                card.className = "min-w-[260px] md:min-w-[300px] snap-start flex-shrink-0 bg-gray-900 border border-green-800 rounded-lg p-3 hover:border-green-500 transition";

                card.innerHTML = `
                <img
                    src="${cert.image}"
                    alt="${cert.title}"
                    class="rounded w-full h-36 object-cover border border-green-700 cursor-pointer hover:opacity-90"
                    onclick="openPopup('${cert.image}', '${cert.title}')"
                />
                <h3 class="text-green-300 text-lg mt-2 font-mono truncate">${cert.title}</h3>
                <p class="text-gray-400 text-xs truncate">${cert.description}</p>
                <span class="text-xs text-green-500 mt-1 block">${cert.date}</span>
                `;

            container.appendChild(card);
            });
        });
}


// Education & Experience section

  function showTab(tabId) {
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.add('hidden');  
      panel.classList.remove('opacity-100');
      panel.classList.add('opacity-0');
    });


    document.querySelectorAll('.profile-tab-btn').forEach(tab => {
        tab.classList.remove('bg-green-700');
    })

    
    document.getElementById(`${tabId}-tab-btn`).classList.add('bg-green-700');

    const activeTab = document.getElementById(tabId);
    activeTab.classList.remove('hidden');
    setTimeout(() => {
      activeTab.classList.remove('opacity-0');
      activeTab.classList.add('opacity-100');
    }, 50);
  }

  // Show education by default
  showTab('education');




//   Blog section

