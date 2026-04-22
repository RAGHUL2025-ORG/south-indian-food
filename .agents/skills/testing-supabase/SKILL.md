# Testing Supabase Integration (Orders & Bookings)

## Overview
This skill covers end-to-end testing of the Annaporana app's Supabase integration — cart management, order submission, and table booking flows.

## Devin Secrets Needed
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (e.g. `https://xyz.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — JWT anon key (starts with `eyJhbGciOi...`)

## Setup
1. Ensure `.env.local` has the correct Supabase URL and **JWT anon key** (NOT the secret/service role key)
2. Start the dev server: `npm run dev -- -p 3000`
3. Verify the app loads at `http://localhost:3000` without console errors

## Key Gotcha: Anon Key vs Secret Key
- The Supabase JS client (`@supabase/supabase-js`) **blocks** secret/service role keys in the browser with error: `"Forbidden use of secret API key in browser"`
- Secret keys start with `sb_secret_...` — these must NEVER be used as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- The correct anon key is a long JWT starting with `eyJhbGciOi...`
- If the user provides a wrong key, use the Supabase MCP tool `get_publishable_keys` with the project ID to retrieve the correct JWT anon key programmatically
- The Supabase MCP might also inject a secret key via the secrets system — if so, override it by exporting the correct key before starting the dev server: `export NEXT_PUBLIC_SUPABASE_ANON_KEY=<correct_jwt>`

## Test Flows

### Order Flow
1. Navigate to Menu section
2. Click "Add to Order" on a menu item → expect toast notification and navbar badge count increment
3. Switch menu tabs and add another item → badge increments again
4. Click "Order Now" in navbar → cart drawer opens showing items with correct prices and total
5. Click "+" on an item → quantity increases, line price and total update correctly
6. Click "Proceed to Checkout" → checkout form appears with order summary
7. Fill name and phone (required), click "Place Order" → success toast, drawer closes, badge disappears
8. Verify in Supabase: `SELECT * FROM orders ORDER BY created_at DESC LIMIT 1;` — check customer_name, items (jsonb), total_price match

### Booking Flow
1. Click "Book a Table" (Hero section or OrderCTA section)
2. Booking modal opens with fields: name, phone, email (optional), date, time, guests, special requests
3. Fill required fields — for date inputs, use React-compatible JS: `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, value)` then dispatch `input` and `change` events
4. Click "Confirm Booking" → success toast, modal closes
5. Verify in Supabase: `SELECT * FROM bookings ORDER BY created_at DESC LIMIT 1;` — check all fields match

## Supabase Verification
- Use the Supabase MCP `execute_sql` tool with `project_id` to run SELECT queries
- Always check row counts before and after testing to confirm exact delta
- Verify the `status` field defaults to `"pending"`

## Database Tables
- `orders`: id, customer_name, customer_phone, customer_email, items (jsonb), total_price, status, notes, created_at
- `bookings`: id, customer_name, customer_phone, customer_email, date, time, guests, special_requests, status, created_at
- RLS policies allow anonymous inserts and selects (public restaurant website)

## Common Issues
- If order/booking submission silently fails, check the browser console for Supabase errors
- If you see `"Forbidden use of secret API key in browser"`, the anon key is wrong (see gotcha above)
- Date inputs in React may not respond to simple `.value = ...` — use the native value setter pattern
- The Supabase MCP `execute_sql` tool might be read-only for DDL operations — if tables need to be created, provide SQL to the user to run manually in the Supabase dashboard SQL Editor
