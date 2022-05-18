function showListCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities",
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += `<tr>
<td>${data[i].id}</td>
<td>${data[i].name}</td>
<td>${data[i].country.name}</td>
<td><button class="btn btn-warning" role="button" data-bs-toggle="modal" data-bs-target="#edit_modalCity" onclick="showFormEditCity(${data[i].id})">Edit</button></td>
<td><a href="${data[i].id}" onclick="deleteCity(this)"><button class="btn btn-danger">Delete</button></a></td>
<td><button class="btn btn-dark" role="button" data-bs-toggle="modal" data-bs-target="#detail_modalCity" onclick="showFormDetailCity(${data[i].id})">Detail</button></td>
</tr>`
            }
            $("#showListCity").html(content);
        }
    })
}

showListCity();

function showCreateFormCity() {
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="createCity()">Save</button>`;
    $("#create_footerCity").html(footer);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities",
        success: function () {
        }
    })
}

function getAllCountry () {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cities/countries",
        success: function (data) {
            let result = "";
            for (let i = 0; i < data.length; i++) {
                result += `<option value="${data[i].id}">${data[i].name}</option>`

            }
            $("#listCreateCountry").html(result);
            $("#listEditCountry").html(result);
        }
    })
}
getAllCountry();

function createCity() {
    event.preventDefault();
    let name = $("#createNameCity").val();
    let country = $("#listCountry").val();
    let acreage = $("#createAcreageCity").val();
    let population = $("#createPopulationCity").val()
    let gdp = $("#createGDPCity").val();
    let description = $("#createTextArea").val();
    let cityForm = new FormData();
    cityForm.append("name", name);
    cityForm.append("country", country);
    cityForm.append("acreage", acreage);
    cityForm.append("population", population);
    cityForm.append("gdp", gdp);
    cityForm.append("description", description);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/cities",
        data: cityForm,
        enctype: "multipart/from-data",
        processData: false,
        contentType: false,
        success: function () {
            $(`#create_modalCity`).modal('hide');
            $(`#createNameCity`).val("");
            showListCity();
        }
    })
}

function showFormEditCity(id) {
    let footer = `<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="editCity(${id})">Save</button>`;
    $("#edit_footerCity").html(footer);
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities/${id}`,
        success: function (data) {
            $("#editNameCity").val(data.name);
            $("#listEditCountry").val(data.country.name);
            $("#editAcreageCity").val(data.acreage);
            $("#editPopulationCity").val(data.population);
            $("#editGDPCity").val(data.gdp);
            $("#editTextArea").val(data.description);
        }
    })
}

function editCity(id) {
    event.preventDefault();
    let name = $("#editNameCity").val();
    let country = $("#listEditCountry").val();
    let acreage = $("#editAcreageCity").val();
    let population = $("#editPopulationCity").val()
    let gdp = $("#editGDPCity").val();
    let description = $("#editTextArea").val();
    let cityForm = new FormData();
    cityForm.append("name", name);
    cityForm.append("country", country);
    cityForm.append("acreage", acreage);
    cityForm.append("population", population);
    cityForm.append("gdp", gdp);
    cityForm.append("description", description);
    $.ajax({
        type: "POST",
        url: `http://localhost:8080/cities/edit/${id}`,
        data: cityForm,
        enctype: "multipart/from-data",
        processData: false,
        contentType: false,
        success: function () {
            $(`#edit_modalCity`).modal('hide');
            showListCity();
        }
    })
}

function showFormDetailCity(id) {
    let footer = `<button data-bs-target="#detail_modalCity" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>`;
    $("#detail_footerCity").html(footer);
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/cities/${id}`,
        success: function (data) {
            $("#detailNameCity").val(data.name);
            $("#detailCountryCity").val(data.country.name);
            $("#detailAcreageCity").val(data.acreage);
            $("#detailPopulationCity").val(data.population);
            $("#detailGDPCity").val(data.gdp);
            $("#detailTextArea").val(data.description);
        }
    })
}

function deleteCity(element) {
    event.preventDefault();
    let cityId = element.getAttribute("href");
    if (confirm("Yes") === true) {
        $.ajax({
            type: "DELETE",
            url: `http://localhost:8080/cities/${cityId}`,
            success: function () {
                showListCity();
            }
        })
    } else {
        window.location.href = "city.html";
    }
}
