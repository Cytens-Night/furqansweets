document.addEventListener("DOMContentLoaded", () => {
    const loaderContainer = document.getElementById('loader-container');
    const mainContent = document.getElementById('main-content');
    const loadingAudio = document.getElementById('loading-audio');

    // Attempt to play the audio as soon as possible
    if (loadingAudio) {
        loadingAudio.play().catch(e => console.warn("Browser prevented autoplay. User interaction might be required.", e));
    }

    // Display the loading animation for 3.5 seconds
    setTimeout(() => {
        // Fade out the loader
        loaderContainer.style.opacity = '0';
        
        // Fade out the audio smoothly over 1 second to match the CSS opacity transition
        if (loadingAudio && !loadingAudio.paused) {
            let volume = 1.0;
            const fadeAudioInterval = setInterval(() => {
                volume -= 0.05;
                if (volume <= 0.01) {
                    loadingAudio.volume = 0;
                    loadingAudio.pause();
                    clearInterval(fadeAudioInterval);
                } else {
                    loadingAudio.volume = volume;
                }
            }, 50); // 20 intervals of 50ms = 1 second fade out
        }

        // Wait for the fade out to complete, then hide the loader and show main content
        setTimeout(() => {
            loaderContainer.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Trigger a small reflow to ensure the transition applies smoothly
            void mainContent.offsetWidth;
            
            // Fade in the main content
            mainContent.style.opacity = '1';
        }, 1000); // 1 second matching the CSS transition duration
    }, 3500); // Wait 3.5 seconds before starting the fade out

    // ==========================================
    // BULK MODAL LOGIC
    // ==========================================
    const bulkModal = document.getElementById('bulk-modal');
    const openBulkModalBtn = document.getElementById('open-bulk-modal');
    const footerBulkLink = document.getElementById('footer-bulk-link');
    const closeBulkModalBtn = document.querySelector('.close-modal');
    const displayWeight = document.getElementById('display-weight');
    const displayPrice = document.getElementById('display-price');
    const addBtns = document.querySelectorAll('.add-btn');
    const resetBtn = document.querySelector('.reset-btn');

    let currentWeight = 15; // base 15kg
    const basePrice = 140;
    const pricePerExtraKg = 9; // Bulk rate assumption

    function updateModalDisplay() {
        displayWeight.textContent = currentWeight;
        let extraWeight = currentWeight - 15;
        let totalPrice = basePrice + (extraWeight * pricePerExtraKg);
        displayPrice.textContent = totalPrice;
    }

    if (openBulkModalBtn && bulkModal) {
        const openBulk = (e) => {
            if (e) e.preventDefault();
            bulkModal.style.display = 'flex';
            currentWeight = 15; // Reset on open
            updateModalDisplay();
        };

        openBulkModalBtn.addEventListener('click', openBulk);
        if (footerBulkLink) footerBulkLink.addEventListener('click', openBulk);
        
        closeBulkModalBtn.addEventListener('click', () => {
            bulkModal.style.display = 'none';
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === bulkModal) {
                bulkModal.style.display = 'none';
            }
        });

        addBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const addVal = parseInt(btn.getAttribute('data-weight'));
                currentWeight += addVal;
                updateModalDisplay();
            });
        });

        resetBtn.addEventListener('click', () => {
            currentWeight = 15;
            updateModalDisplay();
        });
    }

    // ==========================================
    // POLICY MODAL LOGIC
    // ==========================================
    const policyLinks = document.querySelectorAll('.policy-link');
    const policyModal = document.getElementById('policy-modal');
    const closePolicyModalBtn = document.querySelector('.close-policy-modal');
    const policyModalTitle = document.getElementById('policy-modal-title');
    const policyModalBody = document.getElementById('policy-modal-body');

    const policies = {
        privacy: {
            title: "Privacy Policy",
            content: "<p>We value your privacy. We only collect the necessary information to process your orders and ensure the best experience possible.</p> <h3>Data Collection</h3> <p>Any personal details shared with us, such as phone numbers or addresses for bulk orders, are kept strictly confidential and are not shared with third parties.</p>"
        },
        terms: {
            title: "Terms of Service",
            content: "<p>Welcome to Furqan Sweets. By accessing this website or placing an order, you agree to our terms of service.</p> <h3>Ordering</h3> <p>All orders are subject to availability. Bulk orders require sufficient notice to prepare the highest quality halwa.</p>"
        },
        refund: {
            title: "Refund Policy",
            content: "<p>Due to the perishable nature of our freshly made sweets, all sales are final.</p> <h3>Exceptions</h3> <p>If there is an issue with your order upon arrival, please contact us immediately so we can make it right. Your satisfaction is our highest priority.</p>"
        }
    };

    if (policyModal) {
        policyLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const policyType = link.getAttribute('data-policy');
                if (policies[policyType]) {
                    policyModalTitle.textContent = policies[policyType].title;
                    policyModalBody.innerHTML = policies[policyType].content;
                    policyModal.style.display = 'flex';
                }
            });
        });

        if (closePolicyModalBtn) {
            closePolicyModalBtn.addEventListener('click', () => {
                policyModal.style.display = 'none';
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === policyModal) {
                policyModal.style.display = 'none';
            }
        });
    }

    // ==========================================
    // CALL MODAL LOGIC
    // ==========================================
    const callModal = document.getElementById('call-action-modal');
    const callModalTriggers = document.querySelectorAll('.call-modal-trigger');
    const closeCallModalBtn = document.querySelector('.call-close');
    const cancelCallBtn = document.getElementById('cancel-call-btn');
    const proceedCallBtn = document.getElementById('proceed-call-btn');
    const callToast = document.getElementById('call-toast');
    
    const callModalTitle = document.getElementById('call-modal-title');
    const callModalDesc = document.getElementById('call-modal-desc');
    const callModalNumber = document.getElementById('call-modal-number');
    
    let currentCallNumber = '+4402088383030'; // Default Regular

    if (callModal) {
        const openCallModal = (e) => {
            e.preventDefault();
            
            // Context aware logic
            const isBulk = e.currentTarget.getAttribute('data-call-type') === 'bulk';
            if (isBulk) {
                if(callModalTitle) callModalTitle.textContent = "Wholesale & Bulk Orders";
                if(callModalDesc) callModalDesc.textContent = "You are about to call our team to discuss your wholesale or bulk halwa order.";
                if(callModalNumber) callModalNumber.textContent = "07956 911 759";
                currentCallNumber = 'tel:+447956911759';
            } else {
                if(callModalTitle) callModalTitle.textContent = "Call Furqan Sweets";
                if(callModalDesc) callModalDesc.textContent = "You are about to call our team to place a regular order or ask a question. We're ready to help!";
                if(callModalNumber) callModalNumber.textContent = "020 8838 3030";
                currentCallNumber = 'tel:+4402088383030';
            }
            
            callModal.style.display = 'flex';
        };

        const closeCallModal = () => {
            callModal.style.display = 'none';
        };

        callModalTriggers.forEach(trigger => {
            trigger.addEventListener('click', openCallModal);
        });

        if (closeCallModalBtn) closeCallModalBtn.addEventListener('click', closeCallModal);
        if (cancelCallBtn) cancelCallBtn.addEventListener('click', closeCallModal);

        window.addEventListener('click', (e) => {
            if (e.target === callModal) closeCallModal();
        });

        if (proceedCallBtn) {
            proceedCallBtn.addEventListener('click', () => {
                // Show the toast indicator
                callToast.classList.add('show');
                
                // Hide modal
                closeCallModal();

                // Trigger actual phone call link after a tiny delay
                setTimeout(() => {
                    window.location.href = currentCallNumber;
                }, 500); 

                // Hide toast after a few seconds
                setTimeout(() => {
                    callToast.classList.remove('show');
                }, 4500);
            });
        }
    }

    // ==========================================
    // DYNAMIC CRM DATA LOADER
    // ==========================================
    async function loadStorefrontData() {
        try {
            let srvData = null;
            let savedLocal = null;
            try {
                const localStr = localStorage.getItem('furqan_crm_data');
                if (localStr) savedLocal = JSON.parse(localStr);
            } catch (e) {}

            try {
                const res = await fetch('/api/data');
                if (res.ok) {
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.indexOf("application/json") !== -1) {
                        srvData = await res.json();
                    }
                }
            } catch (e) {}

            if (!srvData) {
                try {
                    const res = await fetch('data.json');
                    if (res.ok) srvData = await res.json();
                } catch (e) {}
            }

            const data = savedLocal ? { ...srvData, ...savedLocal } : (srvData || null);
            if (!data) return;

            // 1. Apply Site Settings
            if (data.siteSettings) {
                const s = data.siteSettings;
                // Logos
                if (s.logo) {
                    document.querySelectorAll('.header-logo, .logo-image, .footer-logo').forEach(img => {
                        img.src = s.logo;
                    });
                }
                // Welcome Banner Hours & Phone
                const welcomeBanner = document.querySelector('.welcome-banner');
                if (welcomeBanner) {
                    const hoursP = welcomeBanner.querySelectorAll('p')[0];
                    if (hoursP && s.openHours) {
                        hoursP.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> <strong>Open Everyday:</strong> ${s.openHours} <span style="font-size: 0.8em; opacity: 0.8; margin-left: 5px;">(Times may vary)</span>`;
                    }
                    const phoneTrigger = welcomeBanner.querySelector('.call-modal-trigger');
                    if (phoneTrigger && s.phoneNumber) {
                        phoneTrigger.textContent = s.phoneNumber;
                    }
                }
                // Homepage Hero Titles
                const heroTitleEl = document.querySelector('.hero-cta h2');
                if (heroTitleEl && s.heroTitle) {
                    heroTitleEl.innerHTML = `${s.heroTitle} <span class="translation" style="margin-top: 10px; font-size: 0.6em;">${s.heroTitleSomali || ''}</span>`;
                }
                const heroSubEl = document.querySelector('.hero-cta p');
                if (heroSubEl && s.heroSubtitle) {
                    heroSubEl.innerHTML = `${s.heroSubtitle} <span class="translation">${s.heroSubtitleSomali || ''}</span>`;
                }
            }

            // 2. Render Homepage Halwa Variants
            if (data.halwaVariants && data.halwaVariants.length > 0) {
                const variantsContainer = document.querySelector('.hero-variants');
                if (variantsContainer) {
                    variantsContainer.innerHTML = data.halwaVariants.map(item => `
                        <div class="variant-card">
                            <img src="${item.image || 'assets/halwa_plain.png'}" alt="${item.name}" class="variant-img">
                            <div class="variant-info">
                                <h3>${item.name} <span class="translation">${item.somali || ''}</span></h3>
                                <p class="price">£${item.price} / ${item.unit || 'kg'}</p>
                            </div>
                        </div>
                    `).join('');
                }
            }

            // 3. Render Homepage Collections Rows (index.html)
            if (data.snacks && data.snacks.length > 0) {
                const biscuitsHome = document.querySelectorAll('.collections-row')[0];
                const extraSnacksHome = document.querySelectorAll('.collections-row')[1];

                const extraList = data.snacks.filter(s => s.category === 'Extra Snacks');
                const biscuitList = data.snacks.filter(s => s.category === 'Biscuits Bags');

                if (biscuitsHome && biscuitList.length > 0) {
                    biscuitsHome.innerHTML = biscuitList.map(item => `
                        <div class="collection-card">
                            <img src="${item.image}" alt="${item.name}" class="collection-img">
                            <h4 class="product-name">${item.name}</h4>
                        </div>
                    `).join('');
                }
                if (extraSnacksHome && extraList.length > 0) {
                    extraSnacksHome.innerHTML = extraList.map(item => `
                        <div class="collection-card">
                            <img src="${item.image}" alt="${item.name}" class="collection-img">
                            <h4 class="product-name">${item.name}</h4>
                        </div>
                    `).join('');
                }

                // 4. Render Shop Page Grids (shop.html)
                const shopCategories = document.querySelectorAll('.shop-category');
                if (shopCategories.length >= 2) {
                    const extraGrid = shopCategories[0].querySelector('.shop-grid');
                    const biscuitsGrid = shopCategories[1].querySelector('.shop-grid');

                    if (extraGrid && extraList.length > 0) {
                        extraGrid.innerHTML = extraList.map(item => `
                            <div class="shop-card">
                                <img src="${item.image}" alt="${item.name}" class="shop-card-img">
                                <div>
                                    <h4 class="shop-card-title">${item.name}</h4>
                                    <p class="shop-card-price">£${item.price}</p>
                                    <button class="shop-card-btn">Add to Cart</button>
                                </div>
                            </div>
                        `).join('');
                    }

                    if (biscuitsGrid && biscuitList.length > 0) {
                        biscuitsGrid.innerHTML = biscuitList.map(item => `
                            <div class="shop-card">
                                <img src="${item.image}" alt="${item.name}" class="shop-card-img">
                                <div>
                                    <h4 class="shop-card-title">${item.name}</h4>
                                    <p class="shop-card-price">£${item.price}</p>
                                    <button class="shop-card-btn">Add to Cart</button>
                                </div>
                            </div>
                        `).join('');
                    }
                }
            }
        } catch (err) {
            console.warn("Could not load CRM data dynamically:", err);
        }
    }

    loadStorefrontData();
});
