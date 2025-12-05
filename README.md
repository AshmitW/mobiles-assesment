# Frontend Assessment

Mobiles.co.uk PLP with some bugs that need fixing.

## Rules

- Complete Issue #1 first
- Only use these sites for reference:
  - https://developer.mozilla.org
  - https://tailwindcss.com/docs
  - https://css-tricks.com
- No AI tools (ChatGPT, Claude, Copilot, etc.)

## Issues to fix

1. Fetch products from API - The products are hardcoded in HTML right now which is outdated. Fetch the data from `/api/products.json` instead and render dynamically. Show a loading state while fetching and handle errors gracefully. The static HTML shows you exactly how each product card should look.


2. Broken images - Two product images are showing broken image icons. The image files exist but something's wrong with how they're referenced.

3. Sort doesn't work properly - The sort by price dropdown has options for low to high and high to low, but both options produce wrong results. There's a logic error in the sort function.

4. Prices display wrong - Some product prices display with floating point errors like 29.990000000002. Fix it so all prices display with exactly 2 decimal places.

5. Cards break at 768px - At around 768px width, the product cards have layout issues. The Add to Cart button overflows its container.

6. Category filter buggy - The category filter buttons (All, Apple, Samsung, Google, Motorola) trigger a filter function, but filtering doesn't work correctly. Clicking "Google" shows some Apple products too.

7. Quantity selector bugs - The quantity selector on product cards has multiple bugs: quantity can go below 1 (negative values possible), no maximum limit, the input field accepts letters and special characters, and there's a bug causing all quantity selectors to share state.

8. Grid not responsive - The product grid layout is not properly responsive. It uses a desktop-first approach and doesn't adapt well to all screen sizes. Implement a mobile-first responsive grid (1 column on mobile, 2 on tablet, 3-4 on desktop).

## Notes

- Tailwind CSS is set up if you want to use it
- Axios is installed if you prefer it over fetch
- Look at the static HTML to see how cards should look
