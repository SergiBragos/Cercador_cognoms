const form = document.getElementById("transaction-form");
const resposta = document.getElementById("resposta");

form.addEventListener("submit", getInfo);

async function getInfo(event){
  event.preventDefault();  // evita recarregar la pàgina
  const name = document.getElementById("name").value; //TODO: per què no podria ser textContent???
  const url = `https://api.nationalize.io?name=${name}`;

  const resp = await fetch(url);
  const data = await resp.json(); //TODO: entendre això

  const count = JSON.stringify(data["count"], null, 2);
  const cognom = JSON.stringify(data["name"], null, 2);
  const country = data["country"];

  console.log(count, cognom, country);
  createHTMLtext(count, cognom, country); //TODO: entendre els paràmetres null i 2.
}

function createHTMLtext(count, cognom, country){
  resposta.innerHTML = ""; //esborra resultats anteriors
  const textResposta = document.createElement("p");
  const taula = document.createElement("table");
  const titleCountry = document.createElement("th");
  titleCountry.textContent = "País";
  titleCountry.classList.add("capçalera");
  const titlePercentage = document.createElement("th");
  titlePercentage.textContent = "Incidència";
  titlePercentage.classList.add("capçalera");
  const titleRegion = document.createElement("th");
  titleRegion.textContent = "Regió";
  titleRegion.classList.add("capçalera");
  const fila0 = document.createElement("tr");
  fila0.appendChild(titleRegion);
  fila0.appendChild(titleCountry);
  fila0.appendChild(titlePercentage);
  taula.appendChild(fila0);
  textResposta.textContent = `El cognom ${cognom} apareix ${count} vegades. Es reparteix entre les següents nacionalitats:`;

  country.forEach(element => {

    const countryName = countries[element.country_id]["name"];
    const countryRegion = countries[element.country_id]["region"];
    const probability = element.probability;
    const fila = document.createElement("tr");
    taula.appendChild(fila);

    casellaRegion = document.createElement("th");
    colRegion = fila.appendChild(casellaRegion);
    colRegion.textContent = countryRegion;

    casellaCountry = document.createElement("th");
    colCountry = fila.appendChild(casellaCountry);
    colCountry.textContent = countryName;

    casellaProbability = document.createElement("th");
    colProbability = fila.appendChild(casellaProbability);
    colProbability.textContent = `${(100*Number(probability)).toFixed(2)}%`;

  });

  document.getElementById("resposta").appendChild(textResposta);
  document.getElementById("resposta").appendChild(taula);
}

//Diccionari que conté tots els països i els seus codis per tal que apareguin amb el nom sencer a la web (i no el codi de 2 lletres).
const countries = {
  AF: { name: "Afghanistan", region: "Asia" },
  AL: { name: "Albania", region: "Europe" },
  DZ: { name: "Algeria", region: "Africa" },
  AD: { name: "Andorra", region: "Europe" },
  AO: { name: "Angola", region: "Africa" },
  AG: { name: "Antigua and Barbuda", region: "Americas" },
  AR: { name: "Argentina", region: "Americas" },
  AM: { name: "Armenia", region: "Asia" },
  AU: { name: "Australia", region: "Oceania" },
  AT: { name: "Austria", region: "Europe" },
  AZ: { name: "Azerbaijan", region: "Asia" },
  BS: { name: "Bahamas", region: "Americas" },
  BH: { name: "Bahrain", region: "Asia" },
  BD: { name: "Bangladesh", region: "Asia" },
  BB: { name: "Barbados", region: "Americas" },
  BY: { name: "Belarus", region: "Europe" },
  BE: { name: "Belgium", region: "Europe" },
  BZ: { name: "Belize", region: "Americas" },
  BJ: { name: "Benin", region: "Africa" },
  BT: { name: "Bhutan", region: "Asia" },
  BO: { name: "Bolivia", region: "Americas" },
  BA: { name: "Bosnia and Herzegovina", region: "Europe" },
  BW: { name: "Botswana", region: "Africa" },
  BR: { name: "Brazil", region: "Americas" },
  BN: { name: "Brunei", region: "Asia" },
  BG: { name: "Bulgaria", region: "Europe" },
  BF: { name: "Burkina Faso", region: "Africa" },
  BI: { name: "Burundi", region: "Africa" },
  KH: { name: "Cambodia", region: "Asia" },
  CM: { name: "Cameroon", region: "Africa" },
  CA: { name: "Canada", region: "Americas" },
  CV: { name: "Cape Verde", region: "Africa" },
  CF: { name: "Central African Republic", region: "Africa" },
  TD: { name: "Chad", region: "Africa" },
  CL: { name: "Chile", region: "Americas" },
  CN: { name: "China", region: "Asia" },
  CO: { name: "Colombia", region: "Americas" },
  KM: { name: "Comoros", region: "Africa" },
  CG: { name: "Congo (Brazzaville)", region: "Africa" },
  CD: { name: "Congo (Kinshasa)", region: "Africa" },
  CR: { name: "Costa Rica", region: "Americas" },
  HR: { name: "Croatia", region: "Europe" },
  CU: { name: "Cuba", region: "Americas" },
  CY: { name: "Cyprus", region: "Asia" },
  CZ: { name: "Czech Republic", region: "Europe" },
  DK: { name: "Denmark", region: "Europe" },
  DJ: { name: "Djibouti", region: "Africa" },
  DM: { name: "Dominica", region: "Americas" },
  DO: { name: "Dominican Republic", region: "Americas" },
  EC: { name: "Ecuador", region: "Americas" },
  EG: { name: "Egypt", region: "Africa" },
  SV: { name: "El Salvador", region: "Americas" },
  GQ: { name: "Equatorial Guinea", region: "Africa" },
  ER: { name: "Eritrea", region: "Africa" },
  EE: { name: "Estonia", region: "Europe" },
  SZ: { name: "Eswatini", region: "Africa" },
  ET: { name: "Ethiopia", region: "Africa" },
  FJ: { name: "Fiji", region: "Oceania" },
  FI: { name: "Finland", region: "Europe" },
  FR: { name: "France", region: "Europe" },
  GA: { name: "Gabon", region: "Africa" },
  GM: { name: "Gambia", region: "Africa" },
  GE: { name: "Georgia", region: "Asia" },
  DE: { name: "Germany", region: "Europe" },
  GH: { name: "Ghana", region: "Africa" },
  GR: { name: "Greece", region: "Europe" },
  GD: { name: "Grenada", region: "Americas" },
  GT: { name: "Guatemala", region: "Americas" },
  GN: { name: "Guinea", region: "Africa" },
  GW: { name: "Guinea-Bissau", region: "Africa" },
  GY: { name: "Guyana", region: "Americas" },
  HT: { name: "Haiti", region: "Americas" },
  HN: { name: "Honduras", region: "Americas" },
  HU: { name: "Hungary", region: "Europe" },
  IS: { name: "Iceland", region: "Europe" },
  IN: { name: "India", region: "Asia" },
  ID: { name: "Indonesia", region: "Asia" },
  IR: { name: "Iran", region: "Asia" },
  IQ: { name: "Iraq", region: "Asia" },
  IE: { name: "Ireland", region: "Europe" },
  IL: { name: "Israel", region: "Asia" },
  IT: { name: "Italy", region: "Europe" },
  JM: { name: "Jamaica", region: "Americas" },
  JP: { name: "Japan", region: "Asia" },
  JO: { name: "Jordan", region: "Asia" },
  KZ: { name: "Kazakhstan", region: "Asia" },
  KE: { name: "Kenya", region: "Africa" },
  KI: { name: "Kiribati", region: "Oceania" },
  KP: { name: "North Korea", region: "Asia" },
  KR: { name: "South Korea", region: "Asia" },
  KW: { name: "Kuwait", region: "Asia" },
  KG: { name: "Kyrgyzstan", region: "Asia" },
  LA: { name: "Laos", region: "Asia" },
  LV: { name: "Latvia", region: "Europe" },
  LB: { name: "Lebanon", region: "Asia" },
  LS: { name: "Lesotho", region: "Africa" },
  LR: { name: "Liberia", region: "Africa" },
  LY: { name: "Libya", region: "Africa" },
  LI: { name: "Liechtenstein", region: "Europe" },
  LT: { name: "Lithuania", region: "Europe" },
  LU: { name: "Luxembourg", region: "Europe" },
  MG: { name: "Madagascar", region: "Africa" },
  MW: { name: "Malawi", region: "Africa" },
  MY: { name: "Malaysia", region: "Asia" },
  MV: { name: "Maldives", region: "Asia" },
  ML: { name: "Mali", region: "Africa" },
  MT: { name: "Malta", region: "Europe" },
  MH: { name: "Marshall Islands", region: "Oceania" },
  MR: { name: "Mauritania", region: "Africa" },
  MU: { name: "Mauritius", region: "Africa" },
  MX: { name: "Mexico", region: "Americas" },
  FM: { name: "Micronesia", region: "Oceania" },
  MD: { name: "Moldova", region: "Europe" },
  MC: { name: "Monaco", region: "Europe" },
  MN: { name: "Mongolia", region: "Asia" },
  ME: { name: "Montenegro", region: "Europe" },
  MA: { name: "Morocco", region: "Africa" },
  MZ: { name: "Mozambique", region: "Africa" },
  MM: { name: "Myanmar", region: "Asia" },
  NA: { name: "Namibia", region: "Africa" },
  NR: { name: "Nauru", region: "Oceania" },
  NP: { name: "Nepal", region: "Asia" },
  NL: { name: "Netherlands", region: "Europe" },
  NZ: { name: "New Zealand", region: "Oceania" },
  NI: { name: "Nicaragua", region: "Americas" },
  NE: { name: "Niger", region: "Africa" },
  NG: { name: "Nigeria", region: "Africa" },
  NO: { name: "Norway", region: "Europe" },
  OM: { name: "Oman", region: "Asia" },
  PK: { name: "Pakistan", region: "Asia" },
  PW: { name: "Palau", region: "Oceania" },
  PA: { name: "Panama", region: "Americas" },
  PG: { name: "Papua New Guinea", region: "Oceania" },
  PY: { name: "Paraguay", region: "Americas" },
  PE: { name: "Peru", region: "Americas" },
  PH: { name: "Philippines", region: "Asia" },
  PL: { name: "Poland", region: "Europe" },
  PT: { name: "Portugal", region: "Europe" },
  QA: { name: "Qatar", region: "Asia" },
  RO: { name: "Romania", region: "Europe" },
  RU: { name: "Russia", region: "Europe/Asia" },
  RW: { name: "Rwanda", region: "Africa" },
  KN: { name: "Saint Kitts and Nevis", region: "Americas" },
  LC: { name: "Saint Lucia", region: "Americas" },
  VC: { name: "Saint Vincent and the Grenadines", region: "Americas" },
  WS: { name: "Samoa", region: "Oceania" },
  SM: { name: "San Marino", region: "Europe" },
  ST: { name: "Sao Tome and Principe", region: "Africa" },
  SA: { name: "Saudi Arabia", region: "Asia" },
  SN: { name: "Senegal", region: "Africa" },
  RS: { name: "Serbia", region: "Europe" },
  SC: { name: "Seychelles", region: "Africa" },
  SL: { name: "Sierra Leone", region: "Africa" },
  SG: { name: "Singapore", region: "Asia" },
  SK: { name: "Slovakia", region: "Europe" },
  SI: { name: "Slovenia", region: "Europe" },
  SB: { name: "Solomon Islands", region: "Oceania" },
  SO: { name: "Somalia", region: "Africa" },
  ZA: { name: "South Africa", region: "Africa" },
  ES: { name: "Spain", region: "Europe" },
  LK: { name: "Sri Lanka", region: "Asia" },
  SD: { name: "Sudan", region: "Africa" },
  SR: { name: "Suriname", region: "Americas" },
  SE: { name: "Sweden", region: "Europe" },
  CH: { name: "Switzerland", region: "Europe" },
  SY: { name: "Syria", region: "Asia" },
  TW: { name: "Taiwan", region: "Asia" },
  TJ: { name: "Tajikistan", region: "Asia" },
  TZ: { name: "Tanzania", region: "Africa" },
  TH: { name: "Thailand", region: "Asia" },
  TL: { name: "Timor-Leste", region: "Asia" },
  TG: { name: "Togo", region: "Africa" },
  TO: { name: "Tonga", region: "Oceania" },
  TT: { name: "Trinidad and Tobago", region: "Americas" },
  TN: { name: "Tunisia", region: "Africa" },
  TR: { name: "Turkey", region: "Asia/Europe" },
  TM: { name: "Turkmenistan", region: "Asia" },
  TV: { name: "Tuvalu", region: "Oceania" },
  UG: { name: "Uganda", region: "Africa" },
  UA: { name: "Ukraine", region: "Europe" },
  AE: { name: "United Arab Emirates", region: "Asia" },
  GB: { name: "United Kingdom", region: "Europe" },
  US: { name: "United States", region: "Americas" },
  UY: { name: "Uruguay", region: "Americas" },
  UZ: { name: "Uzbekistan", region: "Asia" },
  VU: { name: "Vanuatu", region: "Oceania" },
  VE: { name: "Venezuela", region: "Americas" },
  VN: { name: "Vietnam", region: "Asia" },
  YE: { name: "Yemen", region: "Asia" },
  ZM: { name: "Zambia", region: "Africa" },
  ZW: { name: "Zimbabwe", region: "Africa" }
};
