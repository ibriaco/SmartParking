import { STRIPE } from './stripeSettings';


/**
 * Create the Stripe Checkout redirect html code for a given user
 * @param {String} userID
 * @returns {String}
 */
export function stripeCheckoutRedirectHTML() {
  

  return `
  <html>
    <body>
    <h1></h1>
    <h1></h1>
    
    <!-- Load Stripe.js on your website. -->
    <script src="https://js.stripe.com/v3"></script>
    
    <div id="error-message"></div>
    
    <script>
      var stripe = Stripe('pk_test_mKFM1iDRQmiHFzdV3duvCJ0c009WWBvC8j');
      
        stripe.redirectToCheckout({
          items: [{sku: 'sku_HGUjGxZH2IXBjS', quantity: 1}],
          
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