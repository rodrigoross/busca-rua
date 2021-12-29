import axios from "axios";

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

function buscaEnderecoHandler(event: Event) {
  event.preventDefault();

  const endereco = inputEndereco.value;
  const uriEndereco = endereco.split(" ").join("+");

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

      const coordenadas: [number, number] = [
        +response.data[0].lat,
        +response.data[0].lon,
      ];
      console.log(coordenadas);
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
}

form.addEventListener("submit", buscaEnderecoHandler);
