
const IPAddressInput = document.querySelector('.ip-input');
const SubmitBtn = document.querySelector('.submit-btn');
const IPAddress = document.querySelector('.ip');
const Location = document.querySelector('.location');
const Timezone = document.querySelector('.timezone');
const ISP = document.querySelector('.ISP');
const section = document.querySelector('section')

const map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

window.addEventListener('load', () => {
  fetchIPData();
});

SubmitBtn.addEventListener('click', () => {
  section.classList.remove('active')
  const ipAddress = IPAddressInput.value;
  if (ipAddress === '') return;
  fetchIPData(ipAddress);
});

function fetchIPData(ipAddress) {
  const apiKey = 'at_Pto7mljTxyPuFpGXnU0iesinKrqWC';
  const url = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress || ''}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const { ip, location, isp } = data;
      IPAddress.innerHTML = ip;
      Location.innerHTML = `${location.city}, ${location.region} ${location.postalCode}`;
      Timezone.innerHTML = `UTC ${location.timezone}`;
      ISP.innerHTML = isp;
      const { lat, lng } = location;
      map.setView([lat, lng], 13);
      L.marker([lat, lng]).addTo(map);
    })
    .catch(err => console.log(err));
}


IPAddressInput.addEventListener('focus', () => {
  section.classList.add('active')
})

IPAddressInput.addEventListener('blur', () => {
  section.classList.remove('active')
  console.log('blur')
})