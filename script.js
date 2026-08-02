document.addEventListener("DOMContentLoaded", () => {
    const loaderContainer = document.getElementById('loader-container');
    const mainContent = document.getElementById('main-content');
    const loadingAudio = document.getElementById('loading-audio');

    // Check if user has already loaded the site in this session OR navigated internally between pages
    const hasLoadedBefore = sessionStorage.getItem('furqan_loaded');
    const isInternalNavigation = document.referrer && document.referrer.includes(window.location.host);

    if (hasLoadedBefore === 'true' || isInternalNavigation) {
        // Instant seamless navigation without showing loader or playing intro audio!
        if (loaderContainer) {
            loaderContainer.style.display = 'none';
            loaderContainer.style.opacity = '0';
        }
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.style.opacity = '1';
        }
        sessionStorage.setItem('furqan_loaded', 'true');
    } else {
        // First visit in session: play intro audio and show loading screen
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
                if (mainContent) {
                    mainContent.style.display = 'block';
                    void mainContent.offsetWidth;
                    mainContent.style.opacity = '1';
                }
                sessionStorage.setItem('furqan_loaded', 'true');
            }, 1000);
        }, 1800);
    }

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

    let bulkBaseKg = 15;
    let bulkBasePrice = 120;
    let bulkExtraKgPrice = 9;
    let currentWeight = 15; // base 15kg

    function updateModalDisplay() {
        if (displayWeight) displayWeight.textContent = currentWeight;
        let extraWeight = currentWeight - bulkBaseKg;
        let totalPrice = bulkBasePrice + (Math.max(0, extraWeight) * bulkExtraKgPrice);
        if (displayPrice) displayPrice.textContent = totalPrice;
        const baseInfoEl = document.querySelector('.base-info');
        if (baseInfoEl) {
            baseInfoEl.innerHTML = `Base: <strong>${bulkBaseKg}kg</strong> - £${bulkBasePrice}`;
        }
    }

    if (openBulkModalBtn && bulkModal) {
        const openBulk = (e) => {
            if (e) e.preventDefault();
            bulkModal.style.display = 'flex';
            currentWeight = bulkBaseKg; // Reset on open
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
            currentWeight = bulkBaseKg;
            updateModalDisplay();
        });
    }

    // ==========================================
    // DOJO SECURE CHECKOUT & RECEIPT LOGIC
    // ==========================================
    const dojoModal = document.getElementById('dojo-modal');
    const btnOpenDojo = document.getElementById('btn-open-dojo');
    const closeDojoBtn = document.querySelector('.close-dojo-modal');
    const btnCloseReceipt = document.getElementById('btn-close-dojo-receipt');
    const btnDojoPay = document.getElementById('btn-dojo-pay');
    const btnPrintReceipt = document.getElementById('btn-print-receipt');
    const btnWhatsAppReceipt = document.getElementById('btn-whatsapp-receipt');
    const dojoMethodBtns = document.querySelectorAll('.dojo-method-btn');
    const dojoCardFields = document.getElementById('dojo-card-fields');
    const dojoErrorMsg = document.getElementById('dojo-error-msg');

    let currentDojoOrder = {
        weight: 15,
        price: 140,
        ref: '',
        dateStr: '',
        name: '',
        phone: '',
        pickupDate: '',
        merchantId: 'sp218466ugbloc1'
    };

    if (btnOpenDojo) {
        btnOpenDojo.addEventListener('click', (e) => {
            e.preventDefault();
            alert("🔒 Online Card Checkout is Currently Offline (Coming Soon).\n\nPlease call us directly at 020 8838 3030 or 07956 911 759 to place your order!");
            return false;
        });
    }

        const closeDojo = () => {
            dojoModal.style.display = 'none';
        };

        if (closeDojoBtn) closeDojoBtn.addEventListener('click', closeDojo);
        if (btnCloseReceipt) btnCloseReceipt.addEventListener('click', closeDojo);
        window.addEventListener('click', (e) => {
            if (e.target === dojoModal) closeDojo();
        });

        // Method selector tabs
        dojoMethodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dojoMethodBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const method = btn.getAttribute('data-method');
                if (dojoCardFields) {
                    dojoCardFields.style.display = (method === 'card') ? 'block' : 'none';
                }
            });
        });

        // Card input auto-formatting & browser recognition
        const cardNumInput = document.getElementById('dojo-card-number');
        const cardExpInput = document.getElementById('dojo-card-expiry');
        const cardCvcInput = document.getElementById('dojo-card-cvc');

        if (cardNumInput) {
            cardNumInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '');
                let formatted = '';
                for (let i = 0; i < val.length; i++) {
                    if (i > 0 && i % 4 === 0) formatted += ' ';
                    formatted += val[i];
                }
                e.target.value = formatted.slice(0, 19);
            });
        }

        if (cardExpInput) {
            cardExpInput.addEventListener('input', (e) => {
                let val = e.target.value.replace(/\D/g, '');
                if (val.length >= 2) {
                    e.target.value = val.slice(0, 2) + ' / ' + val.slice(2, 4);
                } else {
                    e.target.value = val;
                }
            });
        }

        if (cardCvcInput) {
            cardCvcInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
            });
        }

        const dojoForm = document.getElementById('dojo-step-form');
        if (dojoForm) {
            dojoForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (btnDojoPay) btnDojoPay.click();
            });
        }

        // Pay button click
        if (btnDojoPay) {
            btnDojoPay.addEventListener('click', () => {
                const nameEl = document.getElementById('dojo-cust-name');
                const phoneEl = document.getElementById('dojo-cust-phone');
                const dateEl = document.getElementById('dojo-pickup-date');
                const nameVal = nameEl ? nameEl.value.trim() : '';
                const phoneVal = phoneEl ? phoneEl.value.trim() : '';
                const dateVal = dateEl ? dateEl.value.trim() : '';

                if (!nameVal || !phoneVal || !dateVal) {
                    if (dojoErrorMsg) {
                        dojoErrorMsg.textContent = "Please enter your Full Name, Phone Number, and Pickup Date to continue.";
                        dojoErrorMsg.style.display = 'block';
                    }
                    return;
                }

                let formattedDate = dateVal;
                if (dateVal && dateVal.includes('-')) {
                    const parts = dateVal.split('-');
                    if (parts.length === 3) {
                        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                    }
                }

                // Validate that selected date is at least 48 hours / 2 days from today
                const now = new Date();
                const minDateObj = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
                const selectedDateObj = new Date(dateVal + 'T00:00:00');
                if (selectedDateObj < minDateObj) {
                    if (dojoErrorMsg) {
                        dojoErrorMsg.innerHTML = "⚠️ <strong>48 Hours Advance Notice Required:</strong> Bulk orders must be placed at least 2 days in advance. For emergency or urgent orders, please call us immediately at <strong>020 8838 3030</strong>.";
                        dojoErrorMsg.style.display = 'block';
                    }
                    return;
                }

                const activeMethod = document.querySelector('.dojo-method-btn.active');
                const methodType = activeMethod ? activeMethod.getAttribute('data-method') : 'card';

                if (methodType === 'card') {
                    const cNum = document.getElementById('dojo-card-number');
                    const cExp = document.getElementById('dojo-card-expiry');
                    const cCvc = document.getElementById('dojo-card-cvc');
                    if (cNum && cExp && cCvc) {
                        const numVal = cNum.value.replace(/\D/g, '');
                        if (numVal.length < 13 || !cExp.value.trim() || cCvc.value.trim().length < 3) {
                            if (dojoErrorMsg) {
                                dojoErrorMsg.textContent = "Please enter valid bank card details (Card Number, Expiry, and CVC).";
                                dojoErrorMsg.style.display = 'block';
                            }
                            return;
                        }
                    }
                }
                if (dojoErrorMsg) dojoErrorMsg.style.display = 'none';

                currentDojoOrder.name = nameVal;
                currentDojoOrder.phone = phoneVal;
                currentDojoOrder.pickupDate = formattedDate;

                // Step 2: Show Processing animation
                document.getElementById('dojo-step-form').style.display = 'none';
                document.getElementById('dojo-step-processing').style.display = 'block';

                setTimeout(() => {
                    // Generate Official Receipt
                    const now = new Date();
                    const day = String(now.getDate()).padStart(2, '0');
                    const month = String(now.getMonth() + 1).padStart(2, '0');
                    const year = now.getFullYear();
                    const hrs = String(now.getHours()).padStart(2, '0');
                    const mins = String(now.getMinutes()).padStart(2, '0');
                    currentDojoOrder.dateStr = `${day}/${month}/${year}, ${hrs}:${mins}`;
                    
                    const rand4 = Math.floor(1000 + Math.random() * 9000);
                    currentDojoOrder.ref = `DOJO-FS-${year}${month}${day}-${rand4}`;

                    // Fill receipt HTML
                    const idEl = document.getElementById('receipt-id');
                    const dateEl = document.getElementById('receipt-date');
                    const cnameEl = document.getElementById('receipt-cust-name');
                    const cphoneEl = document.getElementById('receipt-cust-phone');
                    const cpickupEl = document.getElementById('receipt-pickup-date');
                    const itemWEl = document.getElementById('receipt-item-weight');
                    const itemTEl = document.getElementById('receipt-item-total');
                    const paidEl = document.getElementById('receipt-total-paid');

                    if (idEl) idEl.textContent = currentDojoOrder.ref;
                    if (dateEl) dateEl.textContent = currentDojoOrder.dateStr;
                    if (cnameEl) cnameEl.textContent = currentDojoOrder.name;
                    if (cphoneEl) cphoneEl.textContent = currentDojoOrder.phone;
                    if (cpickupEl) cpickupEl.textContent = currentDojoOrder.pickupDate;
                    if (itemWEl) itemWEl.textContent = currentDojoOrder.weight;
                    if (itemTEl) itemTEl.textContent = currentDojoOrder.price + '.00';
                    if (paidEl) paidEl.textContent = currentDojoOrder.price + '.00';

                    // Step 3: Show receipt
                    document.getElementById('dojo-step-processing').style.display = 'none';
                    document.getElementById('dojo-step-receipt').style.display = 'block';
                }, 2000);
            });
        }

        // Print receipt
        if (btnPrintReceipt) {
            btnPrintReceipt.addEventListener('click', () => {
                window.print();
            });
        }

        // Send via WhatsApp
        if (btnWhatsAppReceipt) {
            btnWhatsAppReceipt.addEventListener('click', () => {
                const msg = `Hello Furqan Sweets! I have just paid online for a Bulk Order via Dojo Secure.\n\n*Receipt Ref:* ${currentDojoOrder.ref}\n*Order:* Authentic Somali Halwa Bulk Bucket (${currentDojoOrder.weight}kg)\n*Total Paid:* £${currentDojoOrder.price}.00 GBP (Merchant: ${currentDojoOrder.merchantId})\n*Customer:* ${currentDojoOrder.name}\n*Phone:* ${currentDojoOrder.phone}\n*Pickup Date:* ${currentDojoOrder.pickupDate} (48h+ Advance Notice)\n\nPlease confirm my order!`;
                const enc = encodeURIComponent(msg);
                let phone = '+447956911759';
                try {
                    const crmStr = localStorage.getItem('furqan_crm_data');
                    if (crmStr) {
                        const parsed = JSON.parse(crmStr);
                        if (parsed && parsed.siteSettings && parsed.siteSettings.bulkPhone) {
                            phone = parsed.siteSettings.bulkPhone.replace(/\s+/g, '');
                            if (phone.startsWith('0')) phone = '+44' + phone.substring(1);
                        }
                    }
                } catch(e) {}
                window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${enc}`, '_blank');
            });
        }
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

            const SUPABASE_URL = "https://twzkccwkatbczcflyxet.supabase.co";
            const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3emtjY3drYXRiY3pjZmx5eGV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM2NDcsImV4cCI6MjEwMTA3OTY0N30.hx3N-k7Ptc3i4lYa1G3tLUxOq5PjEAw6UZ7ctHSXiXU";
            try {
                const res = await fetch(`${SUPABASE_URL}/rest/v1/store_config?id=eq.furqan-main&select=*`, {
                    headers: {
                        "apikey": SUPABASE_KEY,
                        "Authorization": `Bearer ${SUPABASE_KEY}`
                    }
                });
                if (res.ok) {
                    const rows = await res.json();
                    if (rows && rows.length > 0) {
                        const row = rows[0];
                        srvData = {
                            siteSettings: row.site_settings_json || {},
                            halwaVariants: row.halwa_variants_json || [],
                            snacks: row.snacks_json || []
                        };
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
                // Bulk Orders Pricing & Texts
                const bulkWeightEl = document.querySelector('.bulk-weight');
                if (bulkWeightEl && s.bulkWeight) bulkWeightEl.textContent = s.bulkWeight;
                const bulkPriceEl = document.querySelector('.bulk-price');
                if (bulkPriceEl && s.bulkPrice) bulkPriceEl.textContent = s.bulkPrice;
                const bulkDescEl = document.querySelector('.bulk-desc');
                if (bulkDescEl && s.bulkDesc) bulkDescEl.textContent = s.bulkDesc;
                const bulkTitleEl = document.querySelector('.bulk-content-left h2');
                if (bulkTitleEl && s.bulkTitle) {
                    bulkTitleEl.innerHTML = `${s.bulkTitle} <span class="translation" style="font-size: 0.6em; margin-top: 5px;">${s.bulkTitleSomali || ''}</span>`;
                }
                if (s.bulkModalTitle) {
                    const bModTitle = document.querySelector('#bulk-modal .modal-header h2');
                    if (bModTitle) bModTitle.textContent = s.bulkModalTitle;
                }
                if (s.bulkModalDesc) {
                    const bModDesc = document.querySelector('#bulk-modal .modal-desc');
                    if (bModDesc) bModDesc.textContent = s.bulkModalDesc;
                }
                if (s.bulkModalImage) {
                    const bModImg = document.querySelector('#bulk-modal .modal-halwa-img');
                    if (bModImg) bModImg.src = s.bulkModalImage;
                    const bCardImg = document.querySelector('.bulk-card-img');
                    if (bCardImg) bCardImg.src = s.bulkModalImage;
                }
                if (s.heroMainImage) {
                    const heroImg = document.querySelector('.main-halwa-img');
                    if (heroImg) heroImg.src = s.heroMainImage;
                }
                const addBtnsMod = document.querySelectorAll('#bulk-modal .add-btn');
                if (addBtnsMod[0] && s.bulkAddBtn1) {
                    addBtnsMod[0].setAttribute('data-weight', s.bulkAddBtn1);
                    addBtnsMod[0].textContent = '+' + s.bulkAddBtn1 + ' kg';
                }
                if (addBtnsMod[1] && s.bulkAddBtn2) {
                    addBtnsMod[1].setAttribute('data-weight', s.bulkAddBtn2);
                    addBtnsMod[1].textContent = '+' + s.bulkAddBtn2 + ' kg';
                }
                if (addBtnsMod[2] && s.bulkAddBtn3) {
                    addBtnsMod[2].setAttribute('data-weight', s.bulkAddBtn3);
                    addBtnsMod[2].textContent = '+' + s.bulkAddBtn3 + ' kg';
                }
                if (s.bulkPayBtnText) {
                    const bPayBtn = document.getElementById('btn-open-dojo');
                    if (bPayBtn) {
                        bPayBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="flex-shrink: 0;"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg> <span>' + s.bulkPayBtnText + '</span>';
                    }
                }
                if (s.bulkCallBtnText) {
                    const bCallBtn = document.querySelector('#bulk-modal .call-modal-trigger');
                    if (bCallBtn) bCallBtn.textContent = s.bulkCallBtnText;
                }
                if (s.bulkBaseKgNum) {
                    bulkBaseKg = parseFloat(s.bulkBaseKgNum) || 15;
                    currentWeight = bulkBaseKg;
                }
                if (s.bulkBasePriceNum) {
                    bulkBasePrice = parseFloat(s.bulkBasePriceNum) || 120;
                }
                if (s.bulkExtraKgPrice) {
                    bulkExtraKgPrice = parseFloat(s.bulkExtraKgPrice) || 9;
                }
                if (typeof updateModalDisplay === 'function') {
                    updateModalDisplay();
                }
                if (s.halwaBasePrice) {
                    document.querySelectorAll('.hero-variants .price').forEach(p => {
                        p.textContent = s.halwaBasePrice;
                    });
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
                        <div class="collection-card" onclick="window.location.href='shop.html'" title="Click to view in Shop">
                            <img src="${item.image}" alt="${item.name}" class="collection-img">
                            <h4 class="product-name">${item.name}</h4>
                            <p style="margin: 4px 0 0 0; color: #ff5e00; font-weight: 700; font-size: 0.95rem;">£${item.price}</p>
                        </div>
                    `).join('');
                }
                if (extraSnacksHome && extraList.length > 0) {
                    extraSnacksHome.innerHTML = extraList.map(item => `
                        <div class="collection-card" onclick="window.location.href='shop.html'" title="Click to view in Shop">
                            <img src="${item.image}" alt="${item.name}" class="collection-img">
                            <h4 class="product-name">${item.name}</h4>
                            <p style="margin: 4px 0 0 0; color: #ff5e00; font-weight: 700; font-size: 0.95rem;">£${item.price}</p>
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
