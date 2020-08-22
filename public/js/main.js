
let url = "/api/product?count=1"

window.onload = init;

async function init(e) {


    let res = await fetch(url);
    let count = await res.json();
    count = count.count

    // console.log(count);

    if (!count) {
        throw new Error("Some thing wrong!")
    } else {

        let currentIndex = 1;

        pageSize = await getPageSize()
        sortOption = await getSortOption();
        showControls(count, pageSize, sortOption)
        showTableContent(pageSize, currentIndex, e, sortOption);

        document.getElementById('pageSize').onclick = async function () {

            pageSize = await getPageSize()
            sortOption = await getSortOption();
            // console.log(pageSize);

            showControls(count, pageSize, sortOption)

            showTableContent(pageSize, currentIndex, e, sortOption);
        }

        document.getElementById('sorts').onclick = async function () {
            sortOption = await getSortOption();

            // console.log(pageSize);
            // console.log(sortOption);

            showControls(count, pageSize, sortOption)

            showTableContent(pageSize, currentIndex, e, sortOption);
        }

    }




}

async function showTableContent(pageSize, currentIndex, e, sortOption) {
    e.preventDefault();

    let max = localStorage.getItem("max")

    if (currentIndex > max) {
        currentIndex = currentIndex - 1;
    }

    if (currentIndex == 0) {
        currentIndex = currentIndex + 1;
    }

    if (sortOption) {

    }

    sortOptionUrl = "&sortBy=title&sort=" + sortOption;

    // console.log(sortOption);


    let url = `/api/product?pageSize=${pageSize}&pageIndex=${currentIndex}${sortOptionUrl}`
    // console.log(url);

    let res = await fetch(url)
    let data = await res.json()
    //console.log(data);

   // console.log('current index:', currentIndex);

    let tableContentHTML = '';

    // data.forEach(element => {
    //     tableContentHTML += `
    //     <tr>
    //     <th scope="row">${element._id}</th>
    //     <td>${element.title}</td>
    //     <td>
    //             <button type="button" class="btn btn-outline-primary btnAdd" data-toggle="modal" data-target="#addModal">
    //                Add
    //             </button>
    //             <button type="button" id="${element._id}" class="btn btn-outline-warning btnUpdate" data-toggle="modal" data-target="#updateModal">
    //                Update
    //             </button>
    //             <button type="button" id="${element._id}" class="btn btn-outline-danger btnDelete" data-toggle="modal" data-target="#deleteModal">
    //             Delete
    //          </button>
    //     </td>
    //   </tr>
    //     `
    //     // console.log(element.index);
        
    // });

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        tableContentHTML += `
        <tr>
      
        <td>${element.name}</td>
        <td>${element.address}</td>
        <td>${element.description}</td>
        <td>${element.price}đ/đêm</td>
        <td>${element.discountNumber}%</td>
        <td>${element.roomNumber}</td>
        <td>${element.area}</td>

        <td>
               
                <button type="button" id="${element._id}" class="btn btn-outline-warning btnUpdate" data-toggle="modal" data-target="#updateModal" onclick="getId(${i})">
                   Update
                </button>
                <button type="button" id="${element._id}" class="btn btn-outline-danger btnDelete" data-toggle="modal" data-target="#deleteModal" onclick="getId(${i})" >
                Delete
             </button>
        </td>
      </tr>
        `
        
    }

    let arrPaginations = document.getElementsByClassName('pagination-items')

    for (let i = 0; i < arrPaginations.length; i++) {
        if (arrPaginations[i].innerHTML == currentIndex) {
            arrPaginations[i].className = 'current pagination-items'
        } else {
            arrPaginations[i].className = 'pagination-items'
        }
    }


    document.getElementById('body-content').innerHTML = tableContentHTML;


    // console.log(sortOption);

    document.getElementById('right').onclick = () => {
        showTableContent(pageSize, currentIndex + 1, event, sortOption)
    }

    document.getElementById('left').onclick = () => {
        showTableContent(pageSize, currentIndex - 1, event, sortOption)
    }

    addDeleteEvent()

}

function showControls(count, pageSize, sortOption) {

    document.getElementById('paginations').innerHTML = '';
    let paginationNumbers = Math.ceil(count / pageSize)
    //console.log('pagination numbers:', paginationNumbers);

    localStorage.setItem("max", paginationNumbers);


    // Show pagination numbers

    for (let index = 1; index <= paginationNumbers; index++) {
        document.getElementById('paginations').innerHTML +=
            `
        <a class="pagination-items" href="" onclick=showTableContent(${pageSize},${index},event,"${sortOption}")>${index}</a>
        `

    }




}


function getPageSize() {
    let e = document.getElementById("pageSize");
    let pageSize = e.options[e.selectedIndex].value;

    // console.log(pageSize);
    return pageSize
}

function getSortOption() {
    let e = document.getElementById("sorts");
    let selectedOption = e.options[e.selectedIndex].value

    // console.log(selectedOption);
    return selectedOption
}


async function addDeleteEvent() {
    let btnDelete = document.getElementsByClassName('btnDelete')

    numberOfProducts = await getPageSize()
    let content = document.getElementById('body-content')
    let tr = content.getElementsByTagName('tr')
    let arrIDs = [];

    //console.log(btnDelete);
    //console.log(btnDelete[2].id);

    for (let i = 0; i < numberOfProducts.length; i++) {
        // arrIDs.push(tr[i].firstElementChild.innerHTML)
        // console.log(tr[i].firstElementChild.innerText);
        //console.log(btnDelete[i]);

    }

    //console.log(tr);

    //console.log(arrIDs);

    for (let i = 0; i < btnDelete.length; i++) {
         //console.log(btnDelete[i].id);

    }

}
function getId(i) {
    let btnDelete = document.getElementsByClassName('btnDelete')
    localStorage.setItem("id", btnDelete[i].id)
    return btnDelete[i].id
    
}




