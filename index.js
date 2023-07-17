// npm install express
// npm install mercadopago

const express = require("express")
const MercadoPago = require("mercadopago")
const app = express()

MercadoPago.configure({
    sandbox: true,
    access_token: "seu-token-gerado-via-mercadopago"
})


app.get("/", (req, res) => {
    res.send("Olá mundo!" + Date.now())
})

app.get("/pagar", async (req, res) => {

    var id = "" + Date.now()
    var emailDoPagador = "testedevtb@gmail.com"

    var dados = {
        items: [
            item = {
                id: id,
                title: "Anything",
                quantity: 1,
                currency_id: "BRL",
                unit_price: parseFloat(150)
            }
        ],

        payer: {
            email: emailDoPagador,
        },

        external_reference: id
    }

    try {

        var pagamento = await MercadoPago.preferences.create(dados)
        console.log(pagamento)
        // Banco.SalvarPagamento({id: id, pagador: emailDoPagador})
        return res.redirect(pagamento.body.init_point)

    } catch (err) {
        return res.send(err.message)
    }

})

app.listen(3000, (req, res) => {
    console.log("Servidor rodando")
})