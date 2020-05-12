import { STRIPE } from './stripeSettings';

export function stripeCheckoutRedirectHTML(email) {

  return `
  <html>
    <body>
    
    <!-- Load Stripe.js on your website. -->
    <script src="https://js.stripe.com/v3"></script>
    
    <div id="error-message"></div>
    
    <script>
      var stripe = Stripe('pk_test_mKFM1iDRQmiHFzdV3duvCJ0c009WWBvC8j');
      
        stripe.redirectToCheckout({
          items: [{sku: 'sku_HGUjGxZH2IXBjS', quantity: 1}],
          customerEmail: '${email}',
          // Do not rely on the redirect to the successUrl for fulfilling
          // purchases, customers may not always reach the success_url after
          // a successful payment.
          // Instead use one of the strategies described in
          // https://stripe.com/docs/payments/checkout/fulfillment
          successUrl: '${STRIPE.SUCCESS_URL}',
          cancelUrl: '${STRIPE.CANCELED_URL}',
        })
        .then(function (result) {
          if (result.error) {
            
            var displayError = document.getElementById('error-message');
            displayError.textContent = result.error.message;
          }
          window.close()

        });

        </script>
    </body>
  </html>
  `;
}