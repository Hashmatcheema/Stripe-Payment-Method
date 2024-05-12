const express = require('express');
const stripe = require('stripe')('Replace YOUR_SECRET_KEY with your actual Stripe secret key'); 
const app = express();

app.use(express.static('public'));
app.use(express.json());

const YOUR_DOMAIN = 'http://localhost:5000'; 

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000, 
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(5000, () => {
  console.log('Running on port 5000');
});
