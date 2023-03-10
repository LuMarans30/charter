function loadJson() {
    document.getElementById("fileid").click();
}

function generateCharter() {
    var json = "";

    let selected = document.getElementById("fileid").files[0];
    let reader = new FileReader();
    reader.addEventListener("loadend", () => {
        json = reader.result
        var jsonObj = JSON.parse(json);
        createTable(jsonObj);
    });

    reader.readAsText(selected);
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
    table.setAttribute("class", "table table-bordered");

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    //First row of the table (header) 

    //Title Project Charter
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.setAttribute("colspan", "2");
    th.setAttribute("id", "title");
    th.setAttribute("scope", "row");
    th.innerHTML = "Project Charter";
    th.setAttribute("style", "text-align: center; background-color: #afd095 ");
    tr.appendChild(th);
    thead.appendChild(tr);

    //Second row of the table (header)

    //Project Name

    const tr1 = document.createElement("tr");
    const th1 = document.createElement("th");
    th1.setAttribute("id", "project-name");
    th1.setAttribute("scope", "row");
    th1.innerHTML = "PROGETTO: ";
    const td1 = document.createElement("td");
    td1.setAttribute("id", "project-name-value");
    td1.innerHTML = header.PROGETTO;
    tr1.appendChild(th1);
    tr1.appendChild(td1);

    //Third row of the table (header)

    //Two columns: Data Inizio and Num Revisione

    const tr2 = document.createElement("tr");
    const th2 = document.createElement("th");
    th2.setAttribute("id", "data-inizio");
    th2.innerHTML = "DATA INIZIO: ";
    th2.setAttribute("scope", "row");
    const td2 = document.createElement("td");
    td2.setAttribute("id", "data-inizio-value");
    td2.innerHTML = header['DATA INIZIO'];
    tr2.appendChild(th2);
    tr2.appendChild(td2);

    const tr3 = document.createElement("tr");
    const th3 = document.createElement("th");
    th3.setAttribute("id", "num-revisione");
    th3.innerHTML = "NUM REVISIONE: ";
    th3.setAttribute("scope", "row");
    const td3 = document.createElement("td");
    td3.setAttribute("id", "num-revisione-value");
    td3.innerHTML = header['NUM REVISIONE'];
    tr3.appendChild(th3);
    tr3.appendChild(td3);

    //Fourth row of the table (header)

    //Client

    const tr4 = document.createElement("tr");
    const th4 = document.createElement("th");
    th4.setAttribute("id", "client");
    th4.innerHTML = "CLIENTE: ";
    th4.setAttribute("scope", "row");
    const td4 = document.createElement("td");
    td4.setAttribute("id", "client-value");
    td4.innerHTML = header.CLIENTE;
    tr4.appendChild(th4);
    tr4.appendChild(td4);

    //Fifth row of the table (header)

    //Two columns: Project Manager name and Sponsor

    //Project Manager

    const tr5 = document.createElement("tr");
    const th5 = document.createElement("th");
    th5.setAttribute("id", "project-manager");
    th5.innerHTML = "PROJECT MANAGER: ";
    th5.setAttribute("scope", "row");
    const td5 = document.createElement("td");
    td5.setAttribute("id", "project-manager-value");
    td5.innerHTML = header['PROJECT MANAGER'];
    tr5.appendChild(th5);
    tr5.appendChild(td5);

    //Sponsor

    const tr6 = document.createElement("tr");
    const th6 = document.createElement("th");
    th6.setAttribute("id", "sponsor");
    th6.innerHTML = "SPONSOR: ";
    th6.setAttribute("scope", "row");
    const td6 = document.createElement("td");
    td6.setAttribute("id", "sponsor-value");
    td6.innerHTML = header.SPONSOR;
    tr6.appendChild(th6);
    tr6.appendChild(td6);


    //Horizontal separator

    const tr7 = document.createElement("tr");
    const th7 = document.createElement("th");
    th7.setAttribute("colspan", "2");
    th7.setAttribute("scope", "row");
    th7.setAttribute("id", "separator");
    th7.innerHTML = " ";
    tr7.appendChild(th7);

    //Sixth row of the table (content)

    for (let key in content) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.setAttribute("id", key);
        th.setAttribute("style", "background-color: #dde8cb");

        if (key == "FIRME") {
            th.setAttribute("style", "background-color: #afd095");
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

    thead.appendChild(tr1);
    thead.appendChild(tr2);
    thead.appendChild(tr3);
    thead.appendChild(tr4);
    thead.appendChild(tr5);
    thead.appendChild(tr6);
    thead.appendChild(tr7);

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById("charter").appendChild(table);

    document.getElementById("button-download").hidden = false;
} 

function downloadCharter() {
    var element = document.getElementById("charter");
    
    html2canvas(element, {quality: 4, scale: 5}).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'pt', [canvas.width, canvas.height]);
        console.log(doc);
        doc.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        doc.save('charter.pdf');
    });
}