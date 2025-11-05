import { useEffect, useRef } from "react";
import { MarkerClusterer, SuperClusterAlgorithm } from "@googlemaps/markerclusterer";

export function useMarkerCluster(
  map: google.maps.Map | null,
  markers: google.maps.marker.AdvancedMarkerElement[],
  renderer: ReturnType<typeof import("../utils/createClusterRenderer").createClusterRenderer> | null,
  zoom: number
) {
  const clusterRef = useRef<MarkerClusterer | null>(null);
  const algorithmRef = useRef(new SuperClusterAlgorithm({ radius: 60, minPoints: 3, maxZoom: 16 }));

  useEffect(() => {
    if (!map || !renderer) return;

    clusterRef.current?.clearMarkers();
    clusterRef.current?.setMap(null);

    const clusterer = new MarkerClusterer({
      map,
      markers,
      algorithm: algorithmRef.current,
      renderer,
    });

    clusterer.onClusterClick = (_, cluster) => {
      const pos = cluster.position;
      if (!pos) return;
      const currentZoom = map.getZoom() ?? zoom;
      map.panTo(pos);
      map.setZoom(Math.min(currentZoom + 1.5, 18));
    };

    clusterRef.current = clusterer;

    return () => {
      clusterRef.current?.clearMarkers();
      clusterRef.current?.setMap(null);
      clusterRef.current = null;
    };
  }, [map, markers, renderer, zoom]);
}
