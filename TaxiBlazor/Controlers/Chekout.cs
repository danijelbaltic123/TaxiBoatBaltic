using Microsoft.AspNetCore.Mvc;
using Stripe.Checkout;

namespace TaxiBlazor.Controlers
{
    public class Chekout : Controller
    {
        [HttpPost("create-checkout-session")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] CreateCheckoutRequest req)
        {
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                Mode = "payment",
                SuccessUrl = $"{req.RedirectBaseUrl}/success?session_id={{CHECKOUT_SESSION_ID}}",
                CancelUrl = $"{req.RedirectBaseUrl}/cancel",
                LineItems = new List<SessionLineItemOptions>
        {
            new()
            {
                Price = req.PriceId,
                Quantity = 1
            }
        }
            };

            var service = new SessionService();
            var session = await service.CreateAsync(options);

            return Ok(new { url = session.Url });
        }

        public class CreateCheckoutRequest
        {
            public string PriceId { get; set; } = string.Empty; // povezano s tourom
            public string RedirectBaseUrl { get; set; } = string.Empty;
        }
    }
}
