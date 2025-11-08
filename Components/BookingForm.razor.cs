using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.JSInterop;

namespace TaxiBoatBaltic.Components
{
    public partial class BookingForm
    {
        private BookingModel booking = new();
        private int activeTab = 0;
        private bool IsVisible { get; set; }
        private bool ShowSuccess { get; set; }
        private bool ShowError { get; set; }
        private string SelectedService { get; set; }

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

        private void OnBackdropClick()
        {
            Hide();
        }
        private void SetTab(int index)
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

        private List<string> CurrentOptions = new();

        private readonly List<string> Transfers = new() {
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
        private readonly List<string> Tours = new() {
             "Rivijera (Half-Day Tour)",
             "Panorma Tour (One hour Tour)",
             "NP Krka Waterfalls (Half-Day Tour)",
             "NP Kornati Tour (All-Day Tour)",
             "Šibenik Archipelago Tour (All-Day Tour)",
             "NP Krka Waterfalls + Rivijera Tour (All-Day Tour)"
        };
        private readonly List<string> Boats = new() {
             "Mia (6.7m, 200HP)",
             "Emanuela (6.5m, 150HP)",
             "Andrea (6.2m, 130HP)"
        };
        private readonly List<string> Scooters = new() {
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

        private int MaxPeople { get; set; } = 8;

        private void OnServiceChanged(string selectedService)
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

        private async Task SubmitBooking()
        {
            // For now, just debug to console
            await JS.InvokeVoidAsync("console.log", new
            {
                SelectedService,
                booking.SelectedOption,
                booking.FullName,
                booking.Email,
                booking.Date,
                booking.DepartureTime,
                booking.NumberOfPeople,
                booking.Notes
            });

            ShowError = false;
            ShowSuccess = true;
        }
        private void OnInvalidSubmit(EditContext context)
        {
            ShowSuccess = false;
            ShowError = true;
        }
    }
}
