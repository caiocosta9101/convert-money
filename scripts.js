// 1. Lista de Moedas
const moedas = [
    { code: "USD", name: "Dólar Americano", symbol: "US$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "Libra Esterlina", symbol: "£" },
    { code: "BTC", name: "Bitcoin", symbol: "BTC" },
    { code: "ARS", name: "Peso Argentino", symbol: "$" }
]

// Obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Preenchendo o Select Automaticamente
// Percorre a lista 'moedas' e cria as opções no HTML
moedas.forEach(item => {
    const option = document.createElement("option")
    option.value = item.code // Define o valor (Ex: USD)
    option.textContent = item.name // Define o texto (Ex: Dólar Americano)
    currency.appendChild(option) // Adiciona ao <select>
})

// Manipulando o input amount para receber somente números
amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// O evento de submit Assíncrono
form.onsubmit = async (event) => {
    event.preventDefault()

    const code = currency.value 
    
    // Se o usuário tentar enviar sem selecionar nada (embora o HTML bloqueie)
    if(!code) return

    // Monta o par para a API (Ex: USDBRL)
    const apiPair = `${code}-BRL` 

    try {
        description.textContent = "Obtendo cotação..."
        
        // Requisição na API
        const response = await fetch(`https://economia.awesomeapi.com.br/last/${apiPair}`)
        const data = await response.json()

        // Acessa a cotação
        const key = code + "BRL"
        const exchangeRate = data[key].bid

        // Procura na nossa lista 'moedas' qual tem o código igual ao selecionado
        // para pegar o símbolo correto
        const itemMoeda = moedas.find(m => m.code === code)
        const symbol = itemMoeda.symbol

        // Converte
        convertCurrency(amount.value, Number(exchangeRate), symbol)

    } catch (error) {
        console.error(error)
        alert("Não foi possível buscar a cotação. Tente mais tarde.")
        footer.classList.remove("show-result")
    }
}

// Função para converter (Mantida igual)
function convertCurrency(amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`
        
        let total = amount * price
        
        if(isNaN(total)) {
            return alert("Por favor, digite um valor válido.")
        }

        total = formatCurrencyBRL(total).replace("R$", "")
        result.textContent = `${total} reais`
        
        footer.classList.add("show-result")
    } catch (error) {
        console.log(error)
        footer.classList.remove("show-result")
        alert("Erro ao calcular.")
    }
}

// Formata para Real Brasileiro
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}