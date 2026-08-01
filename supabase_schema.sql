-- ====================================================================
-- FURQAN SWEETS — SUPABASE DATABASE SCHEMA
-- Paste this SQL into your Supabase Dashboard -> SQL Editor and click RUN
-- ====================================================================

-- 1. Create the store_config table to hold website settings and product catalogs
CREATE TABLE IF NOT EXISTS public.store_config (
    id TEXT PRIMARY KEY DEFAULT 'furqan-main',
    store_name TEXT DEFAULT 'Furqan Sweets',
    site_settings_json JSONB NOT NULL DEFAULT '{}'::jsonb,
    halwa_variants_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    snacks_json JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.store_config ENABLE ROW LEVEL SECURITY;

-- 3. Create public Read access policy so your storefront can read store configuration
CREATE POLICY "Allow public read access for storefront"
    ON public.store_config
    FOR SELECT
    USING (true);

-- 4. Create Write access policy (for anon / service role key via CRM Dashboard)
CREATE POLICY "Allow update and insert for store CRM"
    ON public.store_config
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 5. Insert initial Furqan Sweets default configuration if table is empty
INSERT INTO public.store_config (
    id,
    store_name,
    site_settings_json,
    halwa_variants_json,
    snacks_json
)
VALUES (
    'furqan-main',
    'Furqan Sweets',
    '{
        "storeName": "Furqan Sweets",
        "logo": "assets/furqansweets_logo.svg",
        "openHours": "9am - 10pm",
        "phoneNumber": "020 8838 3030",
        "phoneTel": "tel:+4402088383030",
        "bulkPhone": "07956 911 759",
        "bulkPhoneTel": "tel:+447956911759",
        "heroTitle": "Craving Authentic Somali Sweets?",
        "heroTitleSomali": "Ma u xiistay Macmacaan Soomaaliyeed?",
        "heroSubtitle": "Freshly made, perfectly sweet, deeply rich.",
        "heroSubtitleSomali": "Cusub, macaan oo si fiican loo sameeyay.",
        "adminPin": "2026",
        "ownerEmail": "owner@furqansweets.co.uk",
        "masterRecoveryKey": "FURQAN-2026-RECOVERY"
    }'::jsonb,
    '[
        {
            "id": "h_01",
            "name": "Classic Halwa",
            "somali": "Xalwo Caadi ah",
            "price": "10",
            "unit": "kg",
            "image": "assets/halwa_main.png"
        },
        {
            "id": "h_02",
            "name": "Special Cardamom & Nut Halwa",
            "somali": "Xalwo Dheeraad ah",
            "price": "15",
            "unit": "kg",
            "image": "assets/halwa_plain.png"
        }
    ]'::jsonb,
    '[
        {
            "id": "s_01",
            "name": "Traditional Kakawood (Somali Biscuits)",
            "price": "2.50",
            "image": "assets/use as is.jpg",
            "category": "Biscuits Bags"
        },
        {
            "id": "s_02",
            "name": "Spiced Somali Sambusa (12 Pack)",
            "price": "8.00",
            "image": "assets/furqansweets_logo.svg",
            "category": "Extra Snacks"
        }
    ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- ====================================================================
-- READY! Your Supabase database table is now configured.
-- ====================================================================
