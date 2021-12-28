const form = document.querySelector("form")!;
const inputEndereco = document.getElementById("endereco")! as HTMLInputElement;

function buscaEnderecoHandler(event: Event) {
  event.preventDefault();

  const endereco = inputEndereco.value;
}

form.addEventListener("submit", buscaEnderecoHandler);
