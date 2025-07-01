/**
 * @module FILTER
 */

/**
 * Initializes the filter interface:
 * - Sets initial filter step
 * - Loads the sample list
 * - Configures text and advanced filter event handlers
 */
async function initFilter() {
    const advancedFilter = document.getElementById("aplyFilter");
    const searcherContainer = document.getElementById("textFilterContainer");
    const filter=window.location.pathname.split("/filter")[0]

    localStorage.setItem("filterStep", 0);
    setOffCanvasFilter("SAMPLE");
    generateListElements("sample",filter ? filter : null);
    showKomaSamples();

    searcherContainer.querySelector("button").addEventListener('click', async () => {
        generateListElements("sample", {
            type: "text",
            text: searcherContainer.querySelector("input").value
        });
    });

    advancedFilter.addEventListener('click', () => {
        const filterContainer = document.getElementById("filterAccordion");
        const filterInputs = Array.from(filterContainer.querySelectorAll("input, select"));
        const apliedFilter = filterInputs.filter(item => item.value);
        let filterList = [];
        apliedFilter.forEach(item => filterList.push({ key: item.id, value: item.value }));
        generateListElements("sample", { type: "advanced", filterList });
    });

    OffCanvasFilterBehaviour();
}

/**
 * Applies a filter to a list of table items.
 *
 * @param {string} table - Table name (uppercase expected)
 * @param {Array} tableList - List of item IDs from the table
 * @param {Object} filter - Filter object, either text or advanced type
 * @returns {Promise<Array>} Filtered list of items
 */
async function applyFilter(table, tableList, filter) {
    let sampleList = [];
    for (const id of tableList) {
        const response = await fetchSecureFile("GET", `public/${table}/${id}`);
        sampleList.push(response[table]);
    }

    if (filter.type === "text") {
        return sampleList.filter(item => item.name && item.name.toLowerCase().includes(filter.text.toLowerCase()));
    }

    filter.filterList.forEach(({ key, value }) => {
        sampleList = sampleList.filter(item => item[key] == value); // use '==' for type coercion, '===' if strict
    });

    return sampleList;
}

/**
 * Configures the OffCanvas filter by loading form elements
 * for the given table and displaying them in the filter panel.
 *
 * @param {String} table - Name of the table to filter
 */
async function setOffCanvasFilter(table) {
    const LIST_FILE_NAMES = ["rrname", "rrname2", "trname"];
    const filterContainer = document.getElementById("filterOffcanvas");
    const filterBody = filterContainer.querySelector(".row");
    filterBody.innerHTML = "";

    const aux = document.createElement("div");
    const DATA = await fetchSecureFile("static", `Forms/${table}.html`);
    aux.innerHTML = DATA;

    const inputList = aux.querySelectorAll("input");
    let filteredList = [...inputList].filter(element => element.type != "file" && !LIST_FILE_NAMES.includes(element.id));
    const selectItems = aux.querySelectorAll("select");
    getSelectedItems(selectItems);

    const completeList = filteredList.concat([...selectItems]);

    completeList.forEach(element => {
        const container = document.createElement("div");
        container.className = "col";

        const label = document.createElement("label");
        label.setAttribute("for", element.id);
        label.innerText = paramDict[element.id];

        container.appendChild(label);
        container.appendChild(element);
        filterBody.prepend(container);
    });
}

/**
 * Displays Koma sequence blocks and configures their behavior
 * so that clicking on one advances the filtering step.
 */
async function showKomaSamples() {
    const sequences = await fetchSecureFile("GET", "public/sequences");
    const resultContianer = document.getElementById("results").querySelector(".row");

    generateSequenceItems(resultContianer);
    const list = resultContianer.querySelectorAll(".col");

    list.forEach(async (element) => {
        const btnData = element.querySelector("a");
        const container = document.createElement("div");
        const msg = document.createElement("p");
        const title = document.createElement("h4");

        element.className = "col";
        container.className = "container flex-column h-100 justify-content-center " + btnData.className;
        title.innerText = btnData.innerText;
        msg.innerText="Number of experiments: "+await getKomaExperimentsNumber(btnData.innerText)

        element.addEventListener("click", () => {
            STEPS_NAME = sequences[title.innerText];
            setOffCanvasFilter(STEPS_NAME[localStorage.getItem("filterStep")]);
            localStorage.setItem("filterStep", Number(localStorage.getItem("filterStep")) + 1);
        });

        element.removeChild(element.firstChild);
        container.appendChild(title);
        container.appendChild(msg);
        element.appendChild(container);
    });
}

/**
 * Returns number of experiment entries for a specific sequence.
 *
 * @param {String} koma - Name of the sequence
 * @returns {Promise<number>} Number of experiments in that sequence
 */
async function getKomaExperimentsNumber(koma) {
    const DATA = await fetchSecureFile("GET", `public/public/raw reads`);
    if(!DATA.publics_ids)
        return 0
    getFilterList("raw reads")
    const FILTER = DATA.filter(element => element.sequence == koma);
    return FILTER.length;
}

/**
 * Updates the filter UI with experiment data from a given table.
 *
 * @param {String} table - Table name from which to retrieve experiment data
 */
async function updateFilterPage(table) {
    const resultContianer = document.getElementById("results");
    const DATA = await fetchSecureFile("GET", `public/${table}`);
    const experimentList = document.createElement("ul");

    setOffCanvasFilter(koma); 

    resultContianer.removeChild(resultContianer.firstChild);

    DATA.forEach(element => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");

        link.href = generatePath(`/infoDisplay/raw reads/${element.id}`);
        link.innerText = `${generarClasificador(element.src_id, element.id, table)}`;

        listItem.appendChild(link);
        experimentList.appendChild(listItem);
    });

    resultContianer.appendChild(experimentList);
}
