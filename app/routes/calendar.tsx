export default function Calendar() {
  const baseURL = 'https://calendar.google.com/calendar/embed'
  const params = {
    height: 600,
    wkst: 2,
    color: '#D50000',
    bgcolor: '#ffffff',
    ctz: 'Europe/Madrid',
    src: 'YXNvY2lhY2lvbi5ndWFyZGlhbmVzQGdtYWlsLmNvbQ',
    showPrint: 0,
    showTitle: 0,
    showTz: 0,
    showCalendars: 0,
    showTabs: 1,
    title: 'Eventos Guardianes',
    mode: 'WEEK'
  }
  return (
    <div className="max-w-4xl mx-auto px-2 mb-2">
      <h2 className="text-center text-red-900 font-medium text-xl md:text-3xl mb-6">Calendario de eventos</h2>
      <div className="relative" style={{ paddingTop: '100%' }}>
        <iframe
          title="Google Calendar asociacion.guardianes@gmail.com"
          src={`${baseURL}?${Object.entries(params).map(e => `${e[0]}=${encodeURIComponent(e[1])}`).join('&')}`}
          frameBorder="0"
          scrolling="no"
          className="mx-auto absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  )
}
