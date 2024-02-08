let regForm = document.querySelector(".register-form");
let allInput = regForm.querySelectorAll("INPUT");
let allBtn = regForm.querySelectorAll("BUTTON");
let closeBtn = document.querySelector(".btn-close");
let regList = document.querySelector(".reg-list");
let addBtn = document.querySelector(".add-btn");
let searchEl = document.querySelector(".search");
let delAllBtn = document.querySelector(".delete-all-btn");
let allRegData = [];
let url = "";

if(localStorage.getItem("allRegData") != null)
{
    allRegData = JSON.parse(localStorage.getItem("allRegData"));
}

// adding data
regForm.onsubmit = (e) => {
  e.preventDefault();
  
  {
    allRegData.push({
      name : allInput[0].value,
      material : allInput[1].value,
      dat : allInput[2].value,
      tel : allInput[3].value,
      foto : url == "" ? "profile.jpg" : url
    });
    localStorage.setItem("allRegData",JSON.stringify(allRegData));
    swal("Data Inserted","successfully !","success"); 
    closeBtn.click();
    regForm.reset('');
    getRegData();
  }
}

const getRegData = () => {
  regList.innerHTML = "";
    allRegData.forEach((data,index)=> {
        let dataStr = JSON.stringify(data);
        let finalData = dataStr.replace(/"/g,"'");
        regList.innerHTML += `
        <tr>
            <td>${index+1}</td>
            <td>
              <img src="${data.foto}" width="50" alt="">
            </td>
            <td>${data.name}</td>
            <td>${data.material}</td>
            <td>${data.dat}</td>
            <td>${data.tel}</td>
            <td>
                <button data="${finalData}" index="${index}" class="edit-btn btn p-1 px-2 btn-primary">
                  <i class="fa fa-edit"></i>
                </button>
                <button index="${index}" class="del-btn btn p-1 px-2  btn-danger">
                  <i class="fa fa-trash"></i>
                </button>
            </td>
      </tr>
        `;
    });
    action();
}

// delete coding
const action = () => {
  // delete coding
    let allDelBtn = regList.querySelectorAll(".del-btn");
    for(let btn of allDelBtn)
    {
        btn.onclick = async () => {
              let isConfirm = await confirm();
              if(isConfirm)
              {
                let index = btn.getAttribute("index");
                allRegData.splice(index,1);
                localStorage.setItem("allRegData",JSON.stringify(allRegData))
                getRegData();
              }
          
           
        }
    }

    // update coding
    let allEditBtn = regList.querySelectorAll(".edit-btn");
    for(let btn of allEditBtn)
    {
      btn.onclick =()=>{
          let index = btn.getAttribute("index");
          let dataStr = btn.getAttribute("data");
          let finalData = dataStr.replace(/'/g,'"');
          let data = JSON.parse(finalData);
          addBtn.click();
          allInput[0].value = data.name;
          allInput[1].value = data.material;
          allInput[2].value = data.dat;
          allInput[3].value = data.tel;
          url = data.foto;
          allBtn[0].disabled = false;
          allBtn[1].disabled = true;

          allBtn[0].onclick = ()=>{
            allRegData[index] = {
                name : allInput[0].value,
                material : allInput[1].value,
                dat : allInput[2].value,
                tel : allInput[3].value,
                foto : url == "" ? "profile.jpg" : url
            }
            localStorage.setItem("allRegData",JSON.stringify(allRegData));
            swal("Data Updated","successfully !","success"); 
            closeBtn.click();
            regForm.reset('');
            getRegData();
            allBtn[1].disabled = false;
            allBtn[0].disabled = true;
          }

      }
    }

}
getRegData();

// reading prodfile
allInput[4].onchange = () => {
  let fReader = new FileReader(); 
  fReader.readAsDataURL(allInput[4].files[0]);
  fReader.onload = (e) =>{
    url = e.target.result;
    console.log(url);
  } 
}

// delete all data
delAllBtn.onclick = async () => {
    let isConfirm = await confirm();
    if(isConfirm)
    {    
        allRegData = [];
        localStorage.removeItem("allRegData");
        getRegData();
    }
}

// let confirm
const confirm = () => {
    return new Promise((resolve,reject)=>{
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            resolve(true);
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
            reject(false);
          swal("Your imaginary file is safe!");
        }
      });
    });
}

// searching data
searchEl.oninput = () =>{
    search();
}

const search = () =>{
    let value = searchEl.value.toLowerCase();
    let tr = regList.querySelectorAll("TR");
    let i;
    for(i=0;i<tr.length;i++)
    {
        let allTd = tr[i].querySelectorAll("TD");
        let name = allTd[2].innerHTML;
        let material = allTd[3].innerHTML;
        let tel = allTd[4].innerHTML;
        if(name.toLocaleLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else if(material.toLocaleLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else if(tel.toLocaleLowerCase().indexOf(value) != -1)
        {
            tr[i].style.display = "";
        }
        else {
          tr[i].style.display = "none";
        }
        
    }
}