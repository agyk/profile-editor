const firstNameInput = document.getElementById("firstName")
const surnameInput = document.getElementById("surname")
const zipInput = document.getElementById("zip")
const countryInput = document.getElementById("country")
const cityInput = document.getElementById("city")
const streetInput = document.getElementById("street")
const houseNumInput =document.getElementById("houseNum")
const introduction = document.getElementById("introduction")
const saveButton = document.getElementById("save")
const deleteButton = document.getElementById("delete")
const profileImg = document.getElementById("profImg")

let showName = document.getElementById("showName")
let showZip = document.getElementById("showZip")
let showCountry = document.getElementById("showCountry")
let showCity = document.getElementById("showCity")
let showStreet = document.getElementById("showStreet")
let showHouseNum = document.getElementById("showhouseNum")
let showIntroduction = document.getElementById("showintroduction")



async function getProfile() {
    let url = "http://localhost:9000"

    const response = await fetch(url)
    const profile = await response.json()
    return profile
}

const postName = async (firstName, surname, zip, country, city, street, houseNum, introduction ) => {
    const url = "http://localhost:9000"
    const response  = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"  /* Indicates that the request body format is JSON.*/ 
        },
        body: JSON.stringify({ firstName, surname, zip, country, city, street, houseNum, introduction })
    })
    return response.status  /*indicate whether a specific HTTP request has been successfully completed 200-299*/ 
}

const resetProfile = () => {
    firstNameInput.value="" 
    surnameInput.value="" 
    zipInput.value=""
    countryInput.value=""
    cityInput.value=""  
    streetInput.value=""
    houseNumInput.value=""
    introduction.value=""

}

const createName = async () => {
    const resStatus= await postName(firstNameInput.value, surnameInput.value, zipInput.value, countryInput.value, cityInput.value,  streetInput.value, houseNumInput.value, introduction.value  )
    const formData = new FormData()
    const fileField = document.querySelector('input[type="file"]')
    formData.append('firstNameInput',firstNameInput.value);
    formData.append('surnameInput',surnameInput.value);
    formData.append('zipInput',zipInput.value);
    formData.append('countryInput',countryInput.value);
    formData.append('cityInput',cityInput.value);
    formData.append('streetInput',streetInput.value);
    formData.append('houseNumInput',houseNumInput.value);
    formData.append('introduction',introduction.value);
    formData.append('picture', fileField.files[0]);
    const resPicture = await uploadImg(formData)
    if(resStatus === 200){
        // geeks()
        alert("profile saved")
        resetProfile()
        showName.innerText= firstNameInput.value + " " + surnameInput.value
        showZip.innerText= zipInput.value
        showCountry.innerText= countryInput.value
        showCity.innerText= cityInput.value
        showStreet.innerText= streetInput.value
        showHouseNum.innerText= houseNumInput.value
        showIntroduction.innerText=introduction.value
        console.log(fileField.files[0]);
        profileImg.src=fileField.files[0]
    }else{
        alert("upps, error")
    }
}


const uploadImg = async (formData) => {
    const url = "http://localhost:9000"
    const response = await fetch(url,{
        method: 'POST',
        body: formData
        
    })
    return response.status
}
// fetch("http://localhost:9000/", {
//   method: 'POST',
//   body: formData
// })
//   .then((response) => response.json())
//   .then((result) => {
//     console.log('Success:', result);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });



const init= () => {
    saveButton.addEventListener("click",createName )
}

init()


const deleteProfile = async () => {
    const url = "http://localhost:9000/"
    const response  = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"  
        },
        body: JSON.stringify({})
    })
    return response.status 
}

const message = () =>{
    alert("profil will be deleted")
    // alertDel()
    deleteProfile()
    //  alert("Profile deleted")
}
const del = () => {
    deleteButton.addEventListener("click",message)
}

del()

/*---alert box-----*/ 
// function geeks(msg, gfg) {
//     var confirmBox = $("#container");
//      confirmBox.style
//     /* Trace message to display */
//     confirmBox.find(".message").text(msg);
     
//     /* Calling function */
//     confirmBox.find(".yes").unbind().click(function()
//     {
//     confirmBox.hide();
//     });
//     confirmBox.find(".yes").click(gfg);
//     confirmBox.show();
// }

// function alertDel(msg, gfg) {
//     var confirmBox = $("#alertDel");
    
//     /* Trace message to display */
//     confirmBox.find(".message").text(msg);
     
//     /* Calling function */
//     confirmBox.find(".yes").unbind().click(function()
//     {
//     deleteProfile()
//     confirmBox.hide();
//     });
//     confirmBox.find(".yes").click(gfg);
   
//     confirmBox.show();
    
//     confirmBox.find(".no").unbind().click(function()
//     {
//     confirmBox.hide();
//     });
//     confirmBox.find(".no").click(gfg);
//     confirmBox.show();
// }




