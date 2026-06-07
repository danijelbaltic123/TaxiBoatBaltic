namespace TaxiBlazor.Shared.Services
{
    public class PauseCarouselService
    {
        public event Action<bool>? OnPauseChanged;

        private bool _paused;
        public bool IsPaused => _paused;

        public void Pause()
        {
            if (_paused) return;
            _paused = true;
            OnPauseChanged?.Invoke(true);
        }

        public void Resume()
        {
            if (!_paused) return;
            _paused = false;
            OnPauseChanged?.Invoke(false);
        }
    }
}
