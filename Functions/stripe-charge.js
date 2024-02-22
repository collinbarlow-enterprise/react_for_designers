const stripe = require('stripe')('sk_test_51OmPolHA0hKEPcdAGk3Qqp9NZQZUAsudRKtuKEQIVgVHrhK9n8qK8kLbByPGiTdK4jk1AQohMGqCNKue3PLLfQcJ00NXlDKwLB')

exports.handler = async function (event) {
    const {
        tokenId,
        email,
        name,
        description,
        amount
    } = JSON.parse(event.body)

    const customer = await stripe.customers.create({
        description: email,
        source: tokenId
    })

    await stripe.charges.create({
        customer: customer.id,
        amount,
        name,
        description,
        currency: 'usd'
    })
}