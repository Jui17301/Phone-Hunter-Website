const loadPhone=async(searchText='6', isShowAll)=>{
  const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url)
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
  
  // if (data.status === "error") {
  //   const available = document.getElementById('no-data-available');
  //   const removeAvailable =available.classList.remove('hidden')
  //   console.log("not available")
  //   return removeAvailable;
  // }

  // const phones = data.data;
  // displayPhones(phones, isShowAll);
 
}

const displayPhones = (phones, isShowAll)=>{
  const phoneContainer = document.getElementById('phone-container');
  // clear phone container cards before adding new card
  phoneContainer.textContent= '';

  // display show all button if there are more than 6 phones
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length>6 && !isShowAll){
showAllContainer.classList.remove('hidden')
  }
  else{
    showAllContainer.classList.add('hidden');
  }
  // display only first 6 phones if not show all
  if(!isShowAll){
    phones = phones.slice(0,6)
  }


  phones.forEach(phone => {
    // console.log(phone);
    const phoneCard=document.createElement('div');
    phoneCard.classList=`card w-90 bg-gray-100 shadow-xl mb-5  `;
    phoneCard.innerHTML=`
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
              <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
          </div>`
          phoneContainer.appendChild(phoneCard);
  });
  // hide loading spinner
  toggleLoadingSpinner(false);
}

// 
const handleShowDetail=async(id)=>{

  //load single phone data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
   const phone = data.data;
  showPhoneDetails(phone);

}
const showPhoneDetails = (phone)=>{

  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText=phone.name;
  const showDetailContainer =document.getElementById('show-detail-container');
  showDetailContainer.innerHTML=`
  
  <img src="${phone.image}" />
  <p><span>Storage : </span>${phone?.mainFeatures?.storage}</p>
  <p><span>ChipSet : </span>${phone?.mainFeatures?.chipSet}</p>
  
  <p><span>Display Size : </span>${phone?.mainFeatures?.displaySize}</p>
  <p><span>GPS : </span>${phone?.others?.GPS ? phone.others.GPS : 'No GPS available in this device'}</p>
  
  
  
  
  `
  // show the modal
  // show-details-modal.showModal();
    // show the modal
    show_details_modal.showModal();
}

// handle Search button
const handleSearch=(isShowAll)=>{
  // console.log("Search handle")
  toggleLoadingSpinner(true);
 const searchField =  document.getElementById('search-field');
 const searchText = searchField.value ;
//  console.log(searchText )
loadPhone(searchText,isShowAll)
}

const toggleLoadingSpinner =(isLoading)=>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
  loadingSpinner.classList.remove('hidden');
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}

// handle Show All

const handleShowAll =()=>{

  handleSearch(true);

}

loadPhone();














