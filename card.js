document.addEventListener("DOMContentLoaded", () => {
    // 0. CINEMATIC LOADING SCREEN & AUDIO (SAYS FURQAN SWEETS OUT LOUD!)
    const loaderContainer = document.getElementById('loader-container');
    const loadingAudio = document.getElementById('loading-audio');

    if (loadingAudio) {
        loadingAudio.currentTime = 0;
        loadingAudio.volume = 1.0;
        loadingAudio.play().catch(e => {
            console.warn("Browser prevented autoplay. Will play on first interaction.", e);
            const playOnTouch = () => {
                loadingAudio.currentTime = 0;
                loadingAudio.volume = 1.0;
                loadingAudio.play().catch(() => {});
                window.removeEventListener('touchstart', playOnTouch);
                window.removeEventListener('click', playOnTouch);
            };
            window.addEventListener('touchstart', playOnTouch, { once: true });
            window.addEventListener('click', playOnTouch, { once: true });
        });
    }

    if (loaderContainer) {
        setTimeout(() => {
            if (loaderContainer) loaderContainer.style.opacity = '0';
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
                }, 50);
            }
            setTimeout(() => {
                if (loaderContainer) loaderContainer.style.display = 'none';
            }, 1000);
        }, 1800);
    }

    // 1. INITIALIZE LUCIDE REACT-STYLE SVG ICONS
    function initIcons() {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }
    initIcons();

    // 2. SERVICE WORKER FOR PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(err => console.warn(err));
    }

    // 3. TOAST HELPER
    const toast = document.getElementById('card-toast');
    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // 4. GENERATE & DOWNLOAD UPGRADED LUXURY VCARD (.VCF) WITH LOGO ON WHITE BACKGROUND AS PROFILE PHOTO
    async function getLogoBase64() {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = 300;
                    canvas.height = 300;
                    const ctx = canvas.getContext('2d');
                    // Draw clean white background for the contact profile photo
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillRect(0, 0, 300, 300);
                    // Center the SVG logo horizontally & vertically
                    // SVG viewBox is 331 x 61.45 (~5.38 aspect ratio)
                    const drawWidth = 260;
                    const drawHeight = 260 * (61.45 / 331); // ~48.2px
                    const posX = (300 - drawWidth) / 2;
                    const posY = (300 - drawHeight) / 2;
                    ctx.drawImage(img, posX, posY, drawWidth, drawHeight);
                    const dataURL = canvas.toDataURL('image/png');
                    const base64 = dataURL.split(',')[1];
                    resolve(base64);
                } catch (e) {
                    resolve(null);
                }
            };
            img.onerror = () => resolve(null);
            // Use the brand SVG logo to render onto the white profile canvas
            img.src = 'assets/furqansweets_logo.svg';
        });
    }

    async function downloadVCard() {
        const logoBase64 = await getLogoBase64();

        const vcfLines = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            // BRAND NAME AS THE CONTACT NAME
            "FN:Furqan Sweets",
            "N:Furqan Sweets;;;;",
            "NICKNAME:Somali Halwa Shop, Xalwo, Stonebridge Sweets",
            "ORG:Furqan Sweets",
            "TITLE:Authentic Somali Sweets & Bakery London",
            // TWO NUMBERS: STORE NUMBER IS MAIN (PREF)
            "TEL;TYPE=WORK,VOICE,PREF:020 8838 3030",
            "TEL;TYPE=CELL,VOICE:07956 911 759",
            // EMAIL & WEBSITE LINK
            "EMAIL;TYPE=WORK,INTERNET,PREF:owner@furqansweets.co.uk",
            "URL;TYPE=WORK:https://www.furqansweets.co.uk/card.html",
            // ADDRESS
            "ADR;TYPE=WORK:;;175 Hillside;London;;NW10 8LL;United Kingdom",
            // ALL RELEVANT KEYWORD TAGS
            "CATEGORIES:somali,shop,halwa,stonebridge,wedding,eid,xalwo,bakery,sweets,london,wholesale,kakawood,sambusa",
            "NOTE:Furqan Sweets — Authentic Somali Halwa (Xalwo)\\, Bakery & Sweets Shop in Stonebridge London.\\nSpecializing in Weddings\\, Eid celebrations\\, and wholesale orders.\\nTags: somali\\, shop\\, halwa\\, stonebridge\\, wedding\\, eid\\, xalwo\\, bakery\\, kakawood\\, sambusa\\nStore (Main): 020 8838 3030 | Wholesale/Mobile: 07956 911 759\\nAddress: 175 Hillside\\, London NW10 8LL\\nWebsite: https://www.furqansweets.co.uk/card.html"
        ];

        if (logoBase64) {
            vcfLines.push("PHOTO;ENCODING=b;TYPE=PNG:" + logoBase64);
        } else {
            vcfLines.push("PHOTO;VALUE=URI;TYPE=PNG:https://www.furqansweets.co.uk/assets/halwa_main.png");
        }

        vcfLines.push("REV:" + new Date().toISOString());
        vcfLines.push("END:VCARD");

        const vcfData = vcfLines.join("\r\n");
        const blob = new Blob([vcfData], { type: "text/vcard;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Furqan_Sweets.vcf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast("Furqan Sweets Contact (.vcf) Saved to Contacts!");
    }

    document.querySelectorAll('.btn-save-vcard').forEach(btn => {
        btn.addEventListener('click', downloadVCard);
    });

    // 4.5 CUSTOM LUXURY PHONE ACTION MODAL (ZERO SYSTEM POPUPS!)
    const phoneModal = document.getElementById('phone-action-modal');
    const phoneModalTitle = document.getElementById('phone-modal-title');
    const btnPhoneSaveVcf = document.getElementById('btn-phone-save-vcf');
    const btnPhoneCallDirect = document.getElementById('btn-phone-call-direct');
    const phoneCallBtnText = document.getElementById('phone-call-btn-text');
    let selectedPhoneVal = "+4402088383030";

    document.querySelectorAll('.phone-trigger-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            selectedPhoneVal = btn.getAttribute('data-phone') || "+4402088383030";
            const labelVal = btn.getAttribute('data-label') || "Furqan Sweets Line";

            if (phoneModalTitle) phoneModalTitle.textContent = labelVal;
            if (phoneCallBtnText) phoneCallBtnText.textContent = `Call Directly (${selectedPhoneVal.replace('+44', '0')})`;

            if (phoneModal) {
                phoneModal.style.display = 'flex';
                initIcons();
            }
        });
    });

    if (btnPhoneSaveVcf) {
        btnPhoneSaveVcf.addEventListener('click', () => {
            downloadVCard();
            if (phoneModal) phoneModal.style.display = 'none';
        });
    }

    if (btnPhoneCallDirect) {
        btnPhoneCallDirect.addEventListener('click', () => {
            if (phoneModal) {
                phoneModal.style.display = 'none';
            }
            // Trigger actual tel call ONLY after user explicitly chooses the Call button inside our modal
            window.location.href = `tel:${selectedPhoneVal}`;
        });
    }

    // 5. 3D CARD FLIPPING FOR QR CODES (TOP RIGHT BUTTON)
    const flipper = document.getElementById('black-box-flipper');
    const btnFlipQr = document.getElementById('btn-flip-qr');
    const btnFlipBack = document.getElementById('btn-flip-back');

    if (btnFlipQr && flipper) {
        btnFlipQr.addEventListener('click', () => {
            flipper.classList.add('flipped');
            renderBackQRCodes();
            initIcons();
        });
    }
    if (btnFlipBack && flipper) {
        btnFlipBack.addEventListener('click', () => {
            flipper.classList.remove('flipped');
        });
    }

    // 5.4 PWA STANDALONE DETECTOR & INSTALL BUTTON HANDLER
    function checkPwaInstalledStatus() {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                             window.navigator.standalone === true;
        const btnInstallPwaEl = document.getElementById('btn-install-pwa');
        if (btnInstallPwaEl) {
            if (isStandalone) {
                // Already running inside installed PWA app -> hide install button
                btnInstallPwaEl.style.display = 'none';
            } else {
                // In normal browser tab -> ALWAYS show download/install button so user can install again!
                btnInstallPwaEl.style.display = 'flex';
            }
        }
    }
    checkPwaInstalledStatus();
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkPwaInstalledStatus);

    let deferredPwaPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPwaPrompt = e;
    });

    const btnInstallPwa = document.getElementById('btn-install-pwa');
    const pwaModal = document.getElementById('pwa-install-modal');
    const btnTriggerPwaInstall = document.getElementById('btn-trigger-pwa-install');

    const isStandaloneApp = () => {
        return window.matchMedia('(display-mode: standalone)').matches ||
               window.navigator.standalone === true;
    };

    const handlePwaInstallRequest = async () => {
        if (isStandaloneApp()) {
            showToast("✓ App is already installed and running on your device!");
            return;
        }

        // 1) Try Native 1-Click Browser Install Prompt (Android / Chrome / Desktop)
        const promptObj = deferredPwaPrompt || window.deferredPwaPrompt;
        if (promptObj) {
            promptObj.prompt();
            const { outcome } = await promptObj.userChoice;
            if (outcome === 'accepted') {
                showToast("✓ Installing Furqan Sweets App to your Home Screen...");
                if (btnInstallPwa) btnInstallPwa.style.display = 'none';
                if (pwaModal) pwaModal.style.display = 'none';
            }
            deferredPwaPrompt = null;
            if (window.deferredPwaPrompt) window.deferredPwaPrompt = null;
            return;
        }

        // 2) If native prompt is not ready (iPhone iOS Safari, or custom browser), open our clean Sleek App Card!
        // NEVER call navigator.share()!
        if (pwaModal) {
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            const iosHint = document.getElementById('pwa-ios-hint');
            if (iosHint) {
                iosHint.style.display = isIOS ? 'block' : 'none';
            }
            pwaModal.style.display = 'flex';
            initIcons();
        }
    };

    if (btnInstallPwa) {
        btnInstallPwa.addEventListener('click', async (e) => {
            e.preventDefault();
            await handlePwaInstallRequest();
        });
    }

    if (btnTriggerPwaInstall) {
        btnTriggerPwaInstall.addEventListener('click', async (e) => {
            e.preventDefault();
            const promptObj = deferredPwaPrompt || window.deferredPwaPrompt;
            if (promptObj) {
                promptObj.prompt();
                const { outcome } = await promptObj.userChoice;
                if (outcome === 'accepted') {
                    showToast("✓ Installing Furqan Sweets App to your Home Screen...");
                    if (btnInstallPwa) btnInstallPwa.style.display = 'none';
                }
                deferredPwaPrompt = null;
                if (window.deferredPwaPrompt) window.deferredPwaPrompt = null;
                if (pwaModal) pwaModal.style.display = 'none';
            } else {
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                if (isIOS) {
                    showToast("Tap Share ↑ in Safari's bottom menu and select Add to Home Screen (+)");
                } else {
                    showToast("Tap your browser menu ⋮ at the top right and select Install App");
                }
                if (pwaModal) pwaModal.style.display = 'none';
            }
        });
    }

    // 5.5 DESKTOP & MOBILE PREVIEW POPUP FOR VISIT WEBSITE BUTTON (TOGGLES ON/OFF AND DISAPPEARS WHEN CLICKING LINK AGAIN OR OUTSIDE)
    const hoverWrapper = document.querySelector('.website-hover-wrapper');
    const hoverCard = document.querySelector('.website-hover-card');
    const btnWebsitePreview = document.getElementById('btn-website-preview');
    let isPreviewShown = false;

    const openWebsiteUrl = () => {
        window.open('index.html?from=card', '_blank', 'noopener,noreferrer');
    };

    const setPreviewActive = (active) => {
        const stageEl = document.getElementById('card-stage');
        const boxLidEl = document.getElementById('box-lid');
        const boxFrontEl = document.querySelector('.box-front');
        if (active) {
            if (hoverCard) hoverCard.classList.add('show-preview');
            if (stageEl) stageEl.classList.add('preview-active');
            if (boxLidEl) boxLidEl.classList.add('preview-active');
            if (boxFrontEl) boxFrontEl.classList.add('preview-active');
            isPreviewShown = true;
        } else {
            if (hoverCard) hoverCard.classList.remove('show-preview');
            if (stageEl) stageEl.classList.remove('preview-active');
            if (boxLidEl) boxLidEl.classList.remove('preview-active');
            if (boxFrontEl) boxFrontEl.classList.remove('preview-active');
            isPreviewShown = false;
        }
    };

    const closePreviewPopup = () => {
        setPreviewActive(false);
    };

    if (btnWebsitePreview) {
        btnWebsitePreview.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isPreviewShown && hoverCard) {
                // First click: show the hover preview popup & hide box lid
                setPreviewActive(true);
            } else {
                // Second click on the link button: disappear/hide the preview popup!
                closePreviewPopup();
            }
        });
    }

    if (hoverCard) {
        hoverCard.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            openWebsiteUrl();
        });
    }

    const handleOutsideClickOrTouch = (e) => {
        if (hoverWrapper && !hoverWrapper.contains(e.target) && isPreviewShown) {
            closePreviewPopup();
        }
    };

    document.addEventListener('click', handleOutsideClickOrTouch);
    document.addEventListener('touchstart', handleOutsideClickOrTouch, { passive: true });

    // 6. THE OPENING LID (`#box-lid`) -> WHITE CARD EXPANDS & REPLACES INFO VIEW WITH PREVIEWS!
    const boxLid = document.getElementById('box-lid');
    const btnCloseInCard = document.getElementById('btn-close-in-card');
    const showcaseGridInCard = document.getElementById('showcase-grid-in-card');
    let isLidOpened = false;

    const top6Products = [
        {
            id: 1,
            title: "Classic Somali Halwa",
            price: "£10 / kg",
            rating: "4.9 / 5.0",
            image: "assets/halwa_main.png",
            url: "index.html#halwa",
            status: "AVAILABLE NOW",
            desc: "Experience the authentic taste of Mogadishu with our Classic Somali Halwa. Handcrafted with golden butter, aromatic spices, and roasted sesame seeds for an unforgettable rich melt-in-your-mouth texture.",
            notesTitle: "INGREDIENTS & NOTES",
            notesVal: "Golden Butter, Fragrant Cardamom, Nutmeg, Roasted Sesame",
            servingVal: "1kg tub serves approx 8 - 10 guests comfortably",
            storageVal: "Freshly made — stays fresh for up to 4 weeks at room temp"
        },
        {
            id: 2,
            title: "Special Cardamom & Nut",
            price: "£15 / kg",
            rating: "5.0 / 5.0",
            image: "assets/halwa_plain.png",
            url: "index.html#halwa",
            status: "BEST SELLER",
            desc: "Our royal recipe loaded with extra crunchy cashew nuts and double aromatic green cardamom. Crafted specifically for weddings, Eid celebrations, and prestigious gatherings.",
            notesTitle: "INGREDIENTS & NOTES",
            notesVal: "Royal Cashews, Double Cardamom, Golden Clarified Butter",
            servingVal: "1kg tub serves approx 8 - 10 guests comfortably",
            storageVal: "Freshly made — stays fresh for up to 4 weeks at room temp"
        },
        {
            id: 3,
            title: "Qumbo Caano (Coconut)",
            price: "£2.50",
            rating: "4.9 / 5.0",
            image: "assets/qumbo caano.jpeg",
            url: "shop.html",
            status: "AVAILABLE NOW",
            desc: "Traditional Somali coconut and milk sweet bites. Perfectly sweetened, chewy, and deeply nostalgic. The ultimate accompaniment to your afternoon Somali shaah (spiced tea).",
            notesTitle: "INGREDIENTS & NOTES",
            notesVal: "Fresh Flaked Coconut, Creamy Condensed Milk, Sugar",
            servingVal: "1 bag serves 2 - 4 people",
            storageVal: "Store in a cool, dry place for up to 3 weeks"
        },
        {
            id: 4,
            title: "Traditional Kakawood",
            price: "£2.50",
            rating: "4.8 / 5.0",
            image: "assets/use as is.jpg",
            url: "shop.html",
            status: "AVAILABLE NOW",
            desc: "Crispy, freshly baked Somali Kakawood biscuits. Gently spiced with cardamom and cinnamon, baked to a golden perfection. Perfect for dipping in hot tea or coffee.",
            notesTitle: "INGREDIENTS & NOTES",
            notesVal: "Wheat Flour, Cardamom, Cinnamon, Pure Butter",
            servingVal: "Full biscuit bag (approx 12 - 15 biscuits)",
            storageVal: "Keeps crispy for 3-4 weeks in an airtight container"
        },
        {
            id: 5,
            title: "Sisin (Sesame Snack)",
            price: "£2.50",
            rating: "4.9 / 5.0",
            image: "assets/sisin.jpeg",
            url: "shop.html",
            status: "AVAILABLE NOW",
            desc: "Crunchy roasted sesame seed clusters caramelized in golden syrup. High in natural energy and bursting with nutty flavor.",
            notesTitle: "INGREDIENTS & NOTES",
            notesVal: "Whole Roasted Sesame Seeds, Golden Caramel Syrup",
            servingVal: "1 bag serves 2 - 4 people",
            storageVal: "Stays fresh and crunchy for up to 4 weeks"
        },
        {
            id: 6,
            title: "Spiced Somali Sambusa",
            price: "£8.00",
            rating: "4.9 / 5.0",
            image: "assets/furqansweets_logo.svg",
            url: "shop.html",
            status: "HOT & FRESH",
            desc: "Authentic triangular Somali pastry stuffed with finely minced spiced beef, green onions, and fragrant xawaash spice mix. Crisp outside, savory inside.",
            notesTitle: "INGREDIENTS & NOTES",
            notesVal: "Minced Beef, Green Onion, Somali Xawaash Spice, Crispy Pastry",
            servingVal: "12 pieces per freshly prepared pack",
            storageVal: "Best enjoyed warm — can be refrigerated & reheated"
        }
    ];

    function renderShowcaseInCard() {
        if (!showcaseGridInCard) return;
        showcaseGridInCard.innerHTML = "";

        top6Products.forEach((prod) => {
            const card = document.createElement('div');
            card.className = 'showcase-card-item';
            card.innerHTML = `
                <img src="${prod.image}" alt="${prod.title}" class="showcase-card-img">
                <div class="showcase-card-title">${prod.title}</div>
                <div class="showcase-card-price">${prod.price}</div>
            `;
            card.addEventListener('click', () => openProductDetailModal(prod));
            showcaseGridInCard.appendChild(card);
        });
    }

    renderShowcaseInCard();

    function toggleUnboxState(open) {
        isLidOpened = open;
        if (isLidOpened) {
            boxLid?.classList.add('opened');
            flipper?.classList.remove('flipped');
            flipper?.classList.add('expanded-showcase');
            const lidText = boxLid?.querySelector('.lid-text');
            if (lidText) lidText.textContent = "CLOSE PREVIEWS";
        } else {
            boxLid?.classList.remove('opened');
            flipper?.classList.remove('expanded-showcase');
            const lidText = boxLid?.querySelector('.lid-text');
            if (lidText) lidText.textContent = "UNBOX PREVIEWS";
        }
        initIcons();
    }

    if (boxLid && flipper) {
        boxLid.addEventListener('click', () => {
            toggleUnboxState(!isLidOpened);
        });
    }

    if (btnCloseInCard) {
        btnCloseInCard.addEventListener('click', () => {
            toggleUnboxState(false);
        });
    }

    // 7. PRODUCT DETAIL MODAL
    const prodModal = document.getElementById('product-detail-modal');
    function openProductDetailModal(prod) {
        if (!prodModal) return;
        document.getElementById('prod-modal-badge').textContent = prod.status;
        document.getElementById('prod-modal-title').textContent = prod.title;
        document.getElementById('prod-modal-price').textContent = prod.price;
        document.getElementById('prod-modal-desc').textContent = prod.desc;

        document.getElementById('prod-notes-label').textContent = prod.notesTitle;
        document.getElementById('prod-notes-val').textContent = prod.notesVal;
        document.getElementById('prod-serving-val').textContent = prod.servingVal;
        document.getElementById('prod-storage-val').textContent = prod.storageVal;

        const shopBtn = document.getElementById('prod-modal-shop-btn');
        if (shopBtn) {
            shopBtn.href = prod.url;
            shopBtn.target = "_blank";
            shopBtn.rel = "noopener noreferrer";
        }

        prodModal.style.display = 'flex';
        initIcons();
    }

    // 8. CONTACT OPTIONS MODAL
    const btnContactOptions = document.getElementById('btn-contact-options');
    const contactModal = document.getElementById('contact-modal');
    if (btnContactOptions && contactModal) {
        btnContactOptions.addEventListener('click', () => {
            contactModal.style.display = 'flex';
            initIcons();
        });
    }

    // 9. EMAIL US MODAL & CUSTOM LUXURY INPUT FORM
    const btnEmailOptions = document.getElementById('btn-email-options');
    const emailModal = document.getElementById('email-modal');
    const defaultButtons = document.getElementById('email-default-buttons');
    const vipFormContainer = document.getElementById('vip-custom-form-container');
    const vipInput = document.getElementById('vip-custom-input');

    if (btnEmailOptions && emailModal) {
        btnEmailOptions.addEventListener('click', () => {
            if (defaultButtons) defaultButtons.style.display = 'flex';
            if (vipFormContainer) vipFormContainer.style.display = 'none';
            emailModal.style.display = 'flex';
            initIcons();
        });

        document.getElementById('btn-copy-email')?.addEventListener('click', () => {
            navigator.clipboard.writeText('owner@furqansweets.co.uk').then(() => {
                showToast("Email address copied to clipboard!");
            });
            emailModal.style.display = 'none';
        });

        document.getElementById('btn-send-email')?.addEventListener('click', () => {
            window.location.href = 'mailto:owner@furqansweets.co.uk?subject=Inquiry%20from%20Furqan%20Sweets%20VIP%20Card';
            emailModal.style.display = 'none';
        });

        document.getElementById('btn-show-vip-form')?.addEventListener('click', () => {
            if (defaultButtons) defaultButtons.style.display = 'none';
            if (vipFormContainer) vipFormContainer.style.display = 'block';
            setTimeout(() => vipInput?.focus(), 100);
            initIcons();
        });

        document.getElementById('btn-cancel-vip-form')?.addEventListener('click', () => {
            if (defaultButtons) defaultButtons.style.display = 'flex';
            if (vipFormContainer) vipFormContainer.style.display = 'none';
        });

        document.getElementById('btn-submit-vip-custom')?.addEventListener('click', () => {
            const emailVal = vipInput?.value?.trim() || "";
            if (emailVal && emailVal.includes('@')) {
                showToast("Thank you! " + emailVal + " added to VIP mailing list.");
                if (vipInput) vipInput.value = "";
                emailModal.style.display = 'none';
            } else {
                showToast("Please enter a valid email address.");
                vipInput?.focus();
            }
        });

        // Submit on Enter key inside custom input
        vipInput?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('btn-submit-vip-custom')?.click();
            }
        });
    }

    // Close modals
    document.querySelectorAll('.close-modal-btn, .btn-close-modal, .btn-back-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.card-modal-overlay').forEach(m => m.style.display = 'none');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('card-modal-overlay')) {
            e.target.style.display = 'none';
        }
    });

    // 11. RENDER COVER-FLOW QR CODES (LARGE MAIN CENTER + BLURRED SIDES!)
    let qrRendered = false;
    function renderBackQRCodes() {
        if (qrRendered) return;
        function renderQR(id, url) {
            const el = document.getElementById(id);
            if (!el) return;
            const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=2&ecc=M&data=${encodeURIComponent(url)}`;
            el.innerHTML = `<img src="${apiUrl}" alt="QR Code">`;
        }
        renderQR("qr-maps", "https://maps.google.com/?q=Furqan+Sweets+175+Hillside+London+NW10+8LL");
        renderQR("qr-reviews", "https://www.google.com/search?q=Furqan+Sweets+London+Reviews");
        const currentCardUrl = (window.location.origin && window.location.origin.startsWith('http'))
            ? window.location.href.split('#')[0]
            : "https://www.furqansweets.co.uk/card.html";
        renderQR("qr-card", currentCardUrl);
        qrRendered = true;
    }

    // COVER-FLOW QR CAROUSEL LOGIC
    let activeQrIndex = 0;
    const qrSlides = document.querySelectorAll('.qr-slide');
    const qrDots = document.querySelectorAll('.qr-dot');
    const btnPrevQr = document.getElementById('qr-prev-btn');
    const btnNextQr = document.getElementById('qr-next-btn');

    function updateQrCarousel(idx) {
        activeQrIndex = (idx + 3) % 3;
        qrSlides.forEach((slide, i) => {
            slide.classList.remove('active', 'side-left', 'side-right');
            if (i === activeQrIndex) {
                slide.classList.add('active');
            } else if (i === (activeQrIndex + 2) % 3) {
                slide.classList.add('side-left');
            } else {
                slide.classList.add('side-right');
            }
        });

        qrDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeQrIndex);
        });
    }

    if (btnPrevQr && btnNextQr) {
        btnPrevQr.addEventListener('click', () => updateQrCarousel(activeQrIndex - 1));
        btnNextQr.addEventListener('click', () => updateQrCarousel(activeQrIndex + 1));
    }

    qrSlides.forEach((slide, i) => {
        slide.addEventListener('click', () => {
            if (i !== activeQrIndex) {
                // Clicking a blurred side slide brings it smoothly to the center!
                updateQrCarousel(i);
            } else {
                // Clicking the active center QR code opens its target link in a new tab!
                const url = slide.getAttribute('data-url');
                if (url && url !== "window") {
                    window.open(url, '_blank', 'noopener,noreferrer');
                } else if (url === "window") {
                    showToast("Scan with mobile camera to open & share this VIP card!");
                }
            }
        });
    });

    qrDots.forEach((dot, i) => {
        dot.addEventListener('click', () => updateQrCarousel(i));
    });
});
