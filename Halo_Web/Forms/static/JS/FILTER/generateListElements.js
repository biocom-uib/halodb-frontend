/**
 * Generates a list of HTML <li> elements inside the element with ID "elementList",
 * based on the contents of a specified table and an optional filter.
 *
 * @param {string} table - The name of the data table to retrieve items from.
 * @param {Object|null} filter - Optional filter criteria to apply when retrieving the list.
 */
async function generateListElements(table, filter = null) {
    const elementList = document.getElementById("elementList");
    const tableList = await getFilterList(table, filter);

    elementList.innerHTML = "";
    tableList.forEach(item => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `/public/infoDisplay/${table}/${item.id}`;
        link.innerText = item.name ? item.name : generarClasificador(table, item.source_id, item.id);
        listItem.className = "list-group-item";
        listItem.append(link);
        elementList.appendChild(listItem);
    });
}

/**
 * Retrieves a list of items from a given table, either filtered or full depending on the provided filter.
 *
 * @param {string} table - The name of the data table to retrieve.
 * @param {Object|null} filter - Optional filter criteria to limit the returned items.
 * @returns {Promise<Array>} A promise that resolves to an array of filtered or complete table items.
 */
async function getFilterList(table, filter) {
    const rawList = await fetchSecureFile("GET", `public/public/${table}`);
    let tableList = [];

    if (filter)
        return applyFilter(table.toUpperCase(), rawList.public_ids, filter);

    for (const id in rawList.public_ids) {
        const rawItem = await fetchSecureFile("GET", `public/${table}/${rawList.public_ids[id]}`);
        tableList.push(rawItem[table.toUpperCase()]);
    }

    return tableList;
}
