using System.ComponentModel.DataAnnotations;

namespace TaxiBoatBaltic.Components
{
    public class BookingModel
    {
        [Required(ErrorMessage = "Full name is required.")]
        public string? FullName { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Please select a date.")]
        [CustomValidation(typeof(BookingModel), nameof(ValidateDate))]
        public DateTime? Date { get; set; }

        [Required(ErrorMessage = "Departure time is required.")]
        public TimeOnly? DepartureTime { get; set; }

        [Range(1, 20, ErrorMessage = "Number of people must be at least 1.")]
        public int NumberOfPeople { get; set; } = 1;

        public string? Notes { get; set; }
        [Required(ErrorMessage = "Please select an option.")]
        public string? SelectedOption { get; set; }

        public static ValidationResult? ValidateDate(DateTime? date, ValidationContext context)
        {
            if (date == null)
                return new ValidationResult("Date is required.");

            if (date.Value.Date < DateTime.Now.Date)
                return new ValidationResult("Date cannot be in the past.");

            return ValidationResult.Success;
        }
    }
}
