const apiHost = 'http://localhost:3000/categories';
document.getElementById("addCategory").addEventListener("click", function () {
    const categoryName = document.getElementById("categoryName").value;
    fetch(apiHost, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            categoryName: categoryName,
        })
    }).then(function () {
        alert("Category added!");
        renderCategory();
    })
});

function renderCategory() {
    fetch(apiHost, {
        method: "GET"
    })
        .then(function (data) {
            return data.json();
        })
        .then(function (categories) {
            console.log(categories)

            // reset if something was in table
            document.getElementById("tableBody").innerHTML = "";

            for (let category of categories) {
                const tableRow = document.createElement("tr");

                const tdId = document.createElement("td");
                tdId.textContent = category.id;

                const tdcategoryName = document.createElement("td");
                tdcategoryName.textContent = category.categoryName;


                const tdDelete = document.createElement("td");
                const tdDeleteLink = document.createElement("a");
                tdDeleteLink.textContent = "Delete";
                tdDeleteLink.href = "#s";
                tdDeleteLink.classList.add("delete");
                tdDeleteLink.setAttribute("data-categoryid", category.id);

                tdDelete.appendChild(tdDeleteLink);

                tableRow.appendChild(tdId);
                tableRow.appendChild(tdcategoryName);
                tableRow.appendChild(tdDelete);

                document.getElementById("tableBody").appendChild(tableRow);
            }
            const deleteLinks = document.getElementsByClassName("delete");
            console.log(deleteLinks);

            for (let deleteLink of deleteLinks) {
                deleteLink.addEventListener("click", function (event) {
                    event.preventDefault();

                    console.log(event);

                    const id = event.target.getAttribute("data-categoryid");

                    fetch(apiHost + id, {
                        method: "DELETE"
                    })
                        .then(function () {
                            alert("Category deleted!!");
                            renderCategory();

                        })
                })
            }
        })
}
window.onload = function () {
    renderCategory();
}