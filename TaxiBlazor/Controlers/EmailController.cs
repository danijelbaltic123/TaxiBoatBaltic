using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using TaxiBlazor.Services;

namespace TaxiBlazor.Controlers
{
    [ApiController]
    [Route("api/email")]
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailService;

        public EmailController(EmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
        {
            try
            {
                await _emailService.SendClientEmail(request.To, request.Subject, request.Body);
                await _emailService.SendAdminEmail(request.AdminSubject, request.AdminBody);
                return Ok(new { message = "Email sent successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = $"Error: {ex.Message}" });
            }
        }

        public class EmailRequest
        {
            public string Subject { get; set; } = string.Empty;
            public string Body { get; set; } = string.Empty;
            public string To { get; set; } = string.Empty;
            public string AdminSubject { get; set; } = string.Empty;
            public string AdminBody { get; set; } = string.Empty;
        }
    }
}
