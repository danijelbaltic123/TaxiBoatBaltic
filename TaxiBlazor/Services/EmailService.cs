using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using TaxiBlazor.Client.Components;
using TaxiBoatBaltic.Components;

namespace TaxiBlazor.Services
{
    public class EmailService
    {
        private readonly EmailSettings _settings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> settings, ILogger<EmailService> logger)
        {
            _settings = settings.Value ?? throw new ArgumentNullException(nameof(settings));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task SendClientEmail(string to, string subject, string htmlBody)
        {
            ValidateInputs(to, subject, htmlBody);
            ValidateSettings();

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_settings.DisplayName, _settings.From));
            email.To.Add(MailboxAddress.Parse(to));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Html) { Text = htmlBody };

            await SendAsync(email);
        }
        public async Task SendAdminEmail(string subject, string textBody)
        {
            if (string.IsNullOrWhiteSpace(_settings.AdminTo))
                throw new InvalidOperationException("Admin email address (AdminTo) is not configured.");

            ValidateInputs(_settings.AdminTo, subject, textBody);
            ValidateSettings();

            var email = new MimeMessage();
            email.From.Add(new MailboxAddress($"{_settings.DisplayName} – Notification", _settings.From));
            email.To.Add(MailboxAddress.Parse(_settings.AdminTo));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Plain) { Text = textBody };

            await SendAsync(email);
        }
        private async Task SendAsync(MimeMessage email)
        {
            try
            {
                using var smtp = new SmtpClient();

                _logger.LogInformation("Connecting to SMTP server {Host}:{Port}",
                    _settings.Host, _settings.Port);

                await smtp.ConnectAsync(
                    _settings.Host,
                    _settings.Port,
                    SecureSocketOptions.StartTls);

                _logger.LogInformation("Authenticating as {Username}", _settings.Username);

                await smtp.AuthenticateAsync(
                    _settings.Username,
                    _settings.Password);

                await smtp.SendAsync(email);

                _logger.LogInformation("Email successfully sent to: {Recipients}",
                    string.Join(", ", email.To.Mailboxes.Select(x => x.Address)));

                await smtp.DisconnectAsync(true);
            }
            catch (MailKit.Security.AuthenticationException ex)
            {
                _logger.LogError(ex, "SMTP authentication failed.");
                throw new InvalidOperationException("SMTP authentication failed. Check email credentials.", ex);
            }
            catch (SmtpCommandException ex)
            {
                _logger.LogError(ex, "SMTP command error: {StatusCode}", ex.StatusCode);
                throw new InvalidOperationException($"SMTP command error: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unexpected error while sending email.");
                throw new InvalidOperationException("Unexpected email sending error.", ex);
            }
        }
        private void ValidateInputs(string to, string subject, string body)
        {
            Console.WriteLine($"TO: '{to}'");
            Console.WriteLine($"SUBJECT: '{subject}'");
            Console.WriteLine($"BODY: '{body}'");

            if (string.IsNullOrWhiteSpace(to))
                throw new ArgumentException("Recipient email address is required.");

            if (string.IsNullOrWhiteSpace(subject))
                throw new ArgumentException("Email subject is required.");

            if (string.IsNullOrWhiteSpace(body))
                throw new ArgumentException("Email body is required.");
        }
        private void ValidateSettings()
        {
            if (string.IsNullOrWhiteSpace(_settings.Host))
                throw new InvalidOperationException("SMTP Host is not configured.");

            if (string.IsNullOrWhiteSpace(_settings.Username))
                throw new InvalidOperationException("SMTP Username is not configured.");

            if (string.IsNullOrWhiteSpace(_settings.Password))
                throw new InvalidOperationException("SMTP Password is not configured.");

            if (string.IsNullOrWhiteSpace(_settings.From))
                throw new InvalidOperationException("Email 'From' address is not configured.");

            if (_settings.Port <= 0)
                throw new InvalidOperationException("SMTP Port is invalid or missing.");
        }
    }

    public class EmailSettings
    {
        public string Host { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string DisplayName { get; set; } = "Taxi Boat Baltić";
        public string From { get; set; } = string.Empty;
        public string AdminTo { get; set; } = "taxiboatbaltic@gmail.com";
        public int Port { get; set; }
    }
}
