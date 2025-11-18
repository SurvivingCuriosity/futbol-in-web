export function createClusterRenderer(google: typeof window.google) {
  return {
    render: ({
      count,
      position,
    }: {
      count: number;
      position: google.maps.LatLng;
    }) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true">
          <circle cx="20" cy="20" r="18"
            fill="var(--color-neutral-900)"
            stroke="var(--color-neutral-700)" stroke-width="2" />
          <text x="20" y="25" text-anchor="middle"
            font-size="14" font-weight="700" font-family="Poppins"
            fill="var(--color-background)">${count}</text>
        </svg>`;
      return new google.maps.marker.AdvancedMarkerElement({
        position,
        content: div,
        zIndex: 1000,
      });
    },
  };
}
