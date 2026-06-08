using System.Net.Http.Json;
using TaxiBlazor.Shared.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using TaxiBoatBaltic.Components;
using static System.Net.WebRequestMethods;
namespace TaxiBlazor.Client.Components
{
    public partial class BookingFormBase : ComponentBase
    {
        [Inject]
        protected NavigationManager Navigation { get; set; }
        protected BookingModel booking = new();
        protected int activeTab = 0;
        protected bool IsVisible { get; set; }
        protected bool ShowSuccess { get; set; }
        protected bool ShowError { get; set; }
        protected string SelectedService { get; set; }
        protected string Status = "";
        protected bool IsSending = false;
        protected List<string> CurrentOptions = new();
        protected int MaxPeople { get; set; } = 8;
        [Inject]
        protected HttpClient Http { get; set; } = default!;


        protected readonly List<string> Transfers = new() {
             "Šibenik → Zlarin",
             "Zlarin → Šibenik",
             "Šibenik → Prvić Luka",
             "Prvić Luka → Šibenik",
             "Šibenik → Prvić Šepurine",
             "Prvić Šepurine → Šibenik",
             "Šibenik → Obonjan",
             "Obonjan → Šibenik",
             "Šibenik → Kaprije",
             "Kaprije → Šibenik",
             "Šibenik → Žirije (Muna)",
             "Žirije (Muna) → Šibenik",
             "Šibenik → AM Adria Resort",
             "AM Adria Resort → Šibenik"
        };
        protected readonly List<string> Tours = new() {
             "Rivijera (Half-Day Tour)",
             "Panorma Tour (One hour Tour)",
             "NP Krka Waterfalls (Half-Day Tour)",
             "NP Kornati Tour (All-Day Tour)",
             "Šibenik Archipelago Tour (All-Day Tour)",
             "NP Krka Waterfalls + Rivijera Tour (All-Day Tour)"
        };
        protected readonly List<string> Boats = new() {
             "Mia (6.7m, 200HP)",
             "Emanuela (6.5m, 150HP)",
             "Andrea (6.2m, 130HP)"
        };
        protected readonly List<string> Scooters = new() {
             "Suzuki Burgman 400 (Gray)",
             "Suzuki Burgman 400 (Black)",
             "Sym Jet 125",
             "Aprilia SR 125",
             "Piaggio Fly 125",
             "Piaggio Typhoon 50",
             "Piaggio Fly 50",
             "Derbi Boulevard 50",
             "Peugeot JetForce 50",
             "Peugeot Speedfight 50",
             "Aprilia SR 50"
        };

        public void Show()
        {
            IsVisible = true;
            StateHasChanged();
        }

        public void Hide()
        {
            IsVisible = false;
            StateHasChanged();
        }

        protected void OnBackdropClick()
        {
            Hide();
        }
        protected void SetTab(int index)
        {
            activeTab = index;
            switch (index)
            {
                case 0:
                    OnServiceChanged("speedboat");
                    break;
                case 1:
                    OnServiceChanged("tour");
                    break;
                case 2:
                    OnServiceChanged("boat");
                    break;
                case 3:
                    OnServiceChanged("scooter");
                    break;
            }
        }

        protected void OnServiceChanged(string selectedService)
        {
            SelectedService = selectedService;
            booking.SelectedOption = string.Empty;
            switch (SelectedService)
            {
                case "speedboat":
                    CurrentOptions = Transfers;
                    MaxPeople = 8;
                    break;
                case "tour":
                    CurrentOptions = Tours;
                    MaxPeople = 8;
                    break;
                case "boat":
                    CurrentOptions = Boats;
                    MaxPeople = 8;
                    break;
                case "scooter":
                    CurrentOptions = Scooters;
                    MaxPeople = 2;
                    break;
                default:
                    CurrentOptions = new List<string>();
                    MaxPeople = 1;
                    break;
            }
        }
        public class StripeSessionResponse
        {
            public string Url { get; set; } = string.Empty;
        }
        private string GetStripePriceId()
        {
            return activeTab switch
            {
                1 => "price_boat_tour_test",
                2 => "price_rent_boat_test",
                _ => string.Empty
            };
        }



        protected async Task SubmitBooking()
        {
            IsSending = true;
            ShowSuccess = false;
            Console.WriteLine("HTML BODY GENERATED:");
            Console.WriteLine(GenerateClientHtml(booking));
            ShowError = false;
            Status = "";
            StateHasChanged();

            /*bool requiresPayment =
                activeTab == 1 ||   // Private Boat Tour
                activeTab == 2;     // Rent a Boat

            if (requiresPayment)
            {
                var response = await Http.PostAsJsonAsync(
                    "api/payment/create-checkout-session",
                    new
                    {
                        priceId = GetStripePriceId(),
                        redirectBaseUrl = Navigation.BaseUri
                    });

                var result = await response.Content.ReadFromJsonAsync<StripeSessionResponse>();

                Navigation.NavigateTo(result!.Url, true);
                return;
            }*/

            var request = new
            {

                to = booking.Email,
                subject = $"Thank you for reservation {booking.FullName}",
                Body = GenerateClientHtml(booking),

                adminSubject = $"New Booking Request - {booking.FullName}",
                adminBody = GenerateAdminBody(booking),
            };

            try
            {
                var client = new HttpClient();
                client.BaseAddress = new Uri(Navigation.BaseUri);

                var response = await client.PostAsJsonAsync("api/email/send", request);

                if (response.IsSuccessStatusCode)
                {
                    Status = "Check you email!";
                    ShowSuccess = true;
                }
                else
                {
                    Status = "Error: " + response.StatusCode;
                    ShowError = true;
                }
            }
            catch (Exception ex)
            {
                Status = "Exception: " + ex.Message;
                ShowError = true;
            }

            IsSending = false;
        }

        protected string GenerateClientHtml(BookingModel b)
        {
            return $@"
                <table width=""100%"" cellpadding=""0"" cellspacing=""0"" border=""0"" style=""background:#e8f6ff; padding:30px 0;"">
                    <tr>
                        <td align=""center"">
                <table width=""600"" cellpadding=""0"" cellspacing=""0"" border=""0"" 
                    style=""background:#ffffff; border-radius:12px; padding:20px; font-family:Arial;"">
                    <tr style=""background:#2c3e50"">
                        <td align=""center"">
                <img src=""https://taxiboatbaltic.hr/wp-content/uploads/2022/04/Logo-bez-pozadine-topshit.png"" 
                     alt=""Taxi Boat Baltic"" style=""height:90px; margin-bottom:10px;"">
                <h2 style=""color:#0077cc; margin:0; font-size:22px;"">Your Reservation has been sent</h2>
            </td>
        </tr>
        <tr>
            <td style=""font-size:14px; color:#333; line-height:20px; padding-top:20px;"">
                <p>Dear {b.FullName},</p>
                <p>Thank you for choosing Taxi Boat Baltić! Here are your reservation details:</p>

                <table width=""100%"" style=""font-size:14px; color:#333;"">
                    <tr><td><strong>Service:</strong></td><td>{SelectedService}</td></tr>
                    <tr><td><strong>Option:</strong></td><td>{b.SelectedOption}</td></tr>
                    <tr><td><strong>Date:</strong></td><td>{b.Date?.ToString("yyyy-MM-dd")}</td></tr>
                    <tr><td><strong>Departure:</strong></td><td>{b.DepartureTime}</td></tr>
                    <tr><td><strong>People:</strong></td><td>{b.NumberOfPeople}</td></tr>
                </table>

                {(string.IsNullOrWhiteSpace(b.Notes) ? "" : $"<p><strong>Notes:</strong> {b.Notes}</p>")}

                <p style=""margin-top:20px;"">You are very close to your new sea adventures! </br>We will reach out shortly with confirmation.</p>

                <hr style=""border:none; border-top:1px solid #ccc; margin:20px 0;"">
                <p style=""font-size:12px; color:#777;"">Taxi Boat Baltić</p>
            </td>
        </tr>
    </table>
</td>
</tr>
</table>";

        }

        protected string GenerateAdminBody(BookingModel b)
        {
            return $@"
NEW BOOKING REQUEST
-----------------------

Service: {SelectedService}
Option: {b.SelectedOption}

Full Name: {b.FullName}
Email: {b.Email}
Date: {b.Date:yyyy-MM-dd}
Time: {b.DepartureTime}
People: {b.NumberOfPeople}

Notes:
{b.Notes}

--- END ---
";
        }


        protected void OnInvalidSubmit(EditContext context)
        {
            ShowSuccess = false;
            ShowError = true;
        }
    }
}
