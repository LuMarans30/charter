const table_header_color = "#485c28";
const table_content_color = "#59833a";

document.documentElement.setAttribute("data-bs-theme", "dark");

function openDialog() {
    document.getElementById("fileid").click();
}

var jsonObj = null;

function fileupload() {
    var json = "";

    let selected = document.getElementById("fileid").files[0];
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
        json = reader.result
        jsonObj = JSON.parse(json);
        document.getElementById("charter").innerHTML = "";
        jsonValidator(jsonObj).then(function (result) {
            if (result) {
                createTable(jsonObj);
            }
        });
    });

    reader.readAsText(selected);
}

async function jsonValidator(json) {

    const env = new djv();

    result = true;
    
    await fetch('https://raw.githubusercontent.com/LuMarans30/charter/master/schema/charter.json').then(function (response) {
        return response.json();
    }).then(function (schema) {
        env.addSchema('charter', schema);

        if (env.validate('charter', json) !== undefined) {
            console.log("JSON file is not valid");
            alert("JSON file is not valid");
            result = false;
        }
    });

    return result;
}

function createTable(jsonObj) {

    const header = jsonObj.charter[0].header;

    //default string

    /* 
    let PROGETTO = header.PROGETTO;
    let DATA_INIZIO = header['DATA INIZIO'];
    let NUM_REVISIONE = header['NUM REVISIONE']; float
    let CLIENTE = header.CLIENTE;
    let PROJECT_MANAGER = header['PROJECT MANAGER'];
    let SPONSOR = header.SPONSOR;
    */

    const content = jsonObj.charter[1].content;

    /*
    let OBIETTIVI = content.OBIETTIVI; array
    let REQUISITI = content.REQUISITI; array
    let DELIVERABLE = content.DELIVERABLE;
    let MILESTONE = content.MILESTONE; array
    let VINCOLI = content.VINCOLI; array
    let DIPENDENZE = content.DIPENDENZE; array
    let CALENDARIO = content.CALENDARIO; array
    let TEAM = content.TEAM; array
    let BUDGET = content.BUDGET; array of array (float)
    let RISCHI = content.RISCHI; array
    let FIRME = content.FIRME; array
    */

    const table = document.createElement("table");
    table.setAttribute("id", "charter-table");
    table.setAttribute("class", "table table-bordered table-dark");

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    //Title of the table (Project Charter)
    const tr1 = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.setAttribute("colspan", "2");
    th1.setAttribute("scope", "row");
    th1.setAttribute("style", `text-align: center; background-color: ${table_header_color}`);
    th1.setAttribute("id", "title");
    th1.innerHTML = "Project Charter";
    tr1.appendChild(th1);
    thead.appendChild(tr1);

    //Header of the table (project name, date, revision number, client, project manager, sponsor)
    for (var key in header) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.setAttribute("id", key);
        th.innerHTML = key;
        const td = document.createElement("td");
        td.setAttribute("id", key + "-value");
        td.innerHTML = header[key];
        tr.appendChild(th);
        tr.appendChild(td);
        thead.appendChild(tr);
    }

    //Horizontal separator
    const tr2 = document.createElement("tr");
    const th2 = document.createElement("th");
    th2.setAttribute("colspan", "2");
    th2.setAttribute("scope", "row");
    th2.setAttribute("id", "separator");
    th2.innerHTML = " ";
    tr2.appendChild(th2);
    thead.appendChild(tr2);

    //Table content (objectives, requirements, deliverables, milestones, constraints, dependencies, calendar, team, budget, risks, signatures)
    for (let key in content) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.setAttribute("id", key);
        th.setAttribute("style", `background-color: ${table_content_color};`);

        if (key == "FIRME") {
            th.setAttribute("style", `background-color: ${table_header_color};`);
        }

        th.innerHTML = key.toUpperCase() + ": ";
        const td = document.createElement("td");
        td.setAttribute("id", key + "-value");
        var value = content[key];
        if (key == "BUDGET") {

            /*
            "BUDGET": {
                "stima vendite addizionali": [
                    10000.0,
                    15000.0,
                    20000.0
                ],
                "Stima costi": [
                    400000.0,
                    500000.0,
                    600000.0
                ]
            }
            */

            const stimaVenditeAddizionali = content.BUDGET['stima vendite addizionali'];
            const stimaCosti = content.BUDGET['Stima costi'];

            const p1 = document.createElement("p");
            p1.innerHTML = "Stima vendite addizionali: ";
            const ul1 = document.createElement("ul");

            for (let i = 0; i < stimaVenditeAddizionali.length; i++) {
                const li1 = document.createElement("li");
                li1.innerHTML = stimaVenditeAddizionali[i];
                ul1.appendChild(li1);
            }

            p1.appendChild(ul1);
            td.appendChild(p1);

            const p2 = document.createElement("p");
            p2.innerHTML = "Stima costi: ";
            const ul2 = document.createElement("ul");
            for (let i = 0; i < stimaCosti.length; i++) {
                const li2 = document.createElement("li");
                li2.innerHTML = stimaCosti[i];
                ul2.appendChild(li2);
            }
            p2.appendChild(ul2);
            td.appendChild(p2);

        } else if (Array.isArray(value)) {
            //Unordered list of the array
            const ul = document.createElement("ul");
            for (let i = 0; i < value.length; i++) {
                const li = document.createElement("li");
                li.innerHTML = value[i];
                ul.appendChild(li);
            }
            td.appendChild(ul);
        } else {
            td.innerHTML = value;
        }

        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById("charter").appendChild(table);
    document.getElementById("button-download").hidden = false;
}

function downloadCharter() {

    var element = document.getElementById("charter");

    var table = document.getElementById("charter-table");

    if (document.getElementById("light").checked) {
        table.classList.remove("table-dark");
        table_header_color = "#9bbc67";
        table_content_color = "#abcf91";
        createTable(jsonObj);
    }

    html2canvas(element, { quality: 4, scale: 3 }).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
        console.log(doc);
        doc.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        doc.save('charter.pdf');
    });
}
