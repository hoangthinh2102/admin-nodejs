// const e = require("express");

// const e = require("express");

const baseUrl = '/api'
const workApiUrl = `${baseUrl}/product`



async function deleteProduct(){
    let id = localStorage.getItem("id");
    let res = await fetch(`${workApiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  
    let deletedProduct = await res.json()
    console.log(deletedProduct);
    window.location.reload()
    $('#deleteModal').modal('hide');
    // loadTable()
  
  }

  async function createProduct() {
    let data = {
        name: document.getElementById("add-name").value,
        address: document.getElementById("add-address").value,
        description: document.getElementById("add-description").value,
        price: document.getElementById("add-price").value,
        discountNumber: document.getElementById("add-discount").value,
        roomNumber: document.getElementById("add-room").value,
        area: document.getElementById("add-area").value
        
    }
    let res = await fetch(workApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let item = await res.json()
    console.log(item);
      window.location.reload()
     $('#addModal').modal('hide');
    
  }

  async function editProduct() {
    let i = localStorage.getItem("id");
  
    let data ={
      _id: i,
      name: document.getElementById("edit-name").value,
      address: document.getElementById("edit-address").value,
      description: document.getElementById("edit-description").value,
      price: document.getElementById("edit-price").value,
      discountNumber: document.getElementById("edit-discount").value,
      roomNumber: document.getElementById("edit-room").value,
      area: document.getElementById("edit-area").value
      
      
    }
    let res = await fetch(workApiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let item = await res.json()
    //console.log(item);
    
    window.location.reload()
   $('#editModal').modal('hide');
  
  }



  