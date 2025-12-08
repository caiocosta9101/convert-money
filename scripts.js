//cotação de moedas do dia 
const USD = 4.87
const EUR = 5.32
const GBP = 6.08


// obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")

// manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// captando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
    event.preventDefault()

    switch (currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break
        
    }
}

//função para converter a moeda.
function convertCurrency(amount, price, symbol){
  try {
    description.textContent = `${symbol} 1 = ${price}`
    //aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add("show-result")
  } catch (error) {
    console.log(error)
    // remove a classe do footer removendo ele da tela
    footer.classList.remove("show-result")

    console.log(error)
    alert("não foi possível converter. tente novamente mais tarde")
  }
     
}

