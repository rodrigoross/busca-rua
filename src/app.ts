import axios from "axios";
// import ol from 'ol';

const form = document.querySelector("form")!;
const inputEndereco = document.getElementById("endereco")! as HTMLInputElement;

type NominationGeocodingResponse = [
  {
    lat: string;
    lon: string;
    boundingbox: [string, string, string, string];
    display_name: string;
    class: string;
    place_id: number;
  }
];

declare var ol: any;

function buscaEnderecoHandler(event: Event) {
  event.preventDefault();

  const endereco = inputEndereco.value;

  // const numero = +endereco[1];
  // let uriEndereco = "";

  // if (numero != null) {
  //   uriEndereco = uriEndereco + numero + ' '
  // }
  // uriEndereco = uriEndereco +  endereco[0].split(" ").join("+");

  const uriEndereco = endereco.split(' ').join('+')
  console.log(uriEndereco)

  axios
    .get<NominationGeocodingResponse>(
      `https://nominatim.openstreetmap.org/search?format=json&street=${encodeURI(
        uriEndereco
      )}`
    )
    .then((response) => {
      // console.log(response.data.length);
      if (response.data.length < 1) {
        throw new Error("Nenhum local encontrado!");
      }

      const coordenadas: {
        lng: number;
        lat: number;
      } = {
        lat: +response.data[0].lat,
        lng: +response.data[0].lon,
      };

      console.log(coordenadas);

      document.getElementById("map")!.innerHTML = ""; // clear <p> from <div id="map">
      new ol.Map({
        target: "map",
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM(),
          }),
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([coordenadas.lng, coordenadas.lat]),
          zoom: 20,
        }),
      });
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
}

form.addEventListener("submit", buscaEnderecoHandler);
