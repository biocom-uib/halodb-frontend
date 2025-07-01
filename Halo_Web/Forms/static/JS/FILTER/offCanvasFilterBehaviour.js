/**
 * Replaces the first child in the header with a Bootstrap offcanvas toggle button
 * that opens the element with ID "filterOffcanvas".
 * This is typically used to control the filter panel in responsive layouts.
 */
function OffCanvasFilterBehaviour() {
    const headerDiv = document.querySelector('header').querySelector("div");

    // Remove existing first child (e.g., existing button or logo)
    headerDiv.removeChild(headerDiv.firstElementChild);

    // Create the new offcanvas toggle button
    const button = document.createElement("button");
    button.className = "ms-3 mb-3";
    button.style.background = "none";
    button.style.border = "none";
    button.style.height = "10dvh";
    button.style.width = "5dvw";
    button.setAttribute("data-bs-toggle", "offcanvas");
    button.setAttribute("data-bs-target", "#filterOffcanvas");
    button.innerHTML = `
        <p style="font-size:3rem">
            <i class="bi bi-list" style="color:white;"></i>
        </p>
    `;

    // Insert the new button at the beginning of the header
    headerDiv.prepend(button);
}
