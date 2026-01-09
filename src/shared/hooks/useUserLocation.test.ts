import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { useUserLocation } from "./useUserLocation";

interface GeoSuccessCallback {
  (pos: GeolocationPosition): void;
}

describe("useUserLocation", () => {
  let watchPositionMock: Mock;
  let clearWatchMock: Mock;

  beforeEach(() => {
    watchPositionMock = vi.fn();
    clearWatchMock = vi.fn();

    const mockGeolocation: Geolocation = {
      watchPosition: watchPositionMock,
      clearWatch: clearWatchMock,
      getCurrentPosition: vi.fn(),
    };

    Object.defineProperty(global.navigator, "geolocation", {
      value: mockGeolocation,
      configurable: true,
    });
  });

  it("devuelve null inicialmente", () => {
    const { result } = renderHook(() => useUserLocation());
    expect(result.current).toBeNull();
  });

  it("actualiza coordenadas cuando watchPosition llama al callback", () => {
    const { result } = renderHook(() => useUserLocation());

    const successCallback = watchPositionMock.mock
      .calls[0][0] as GeoSuccessCallback;

    const fakePos: GeolocationPosition = {
      coords: {
        latitude: 40,
        longitude: -3,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        toJSON: () => "",
      },
      timestamp: Date.now(),
      toJSON: () => "",
    };

    act(() => successCallback(fakePos));

    expect(result.current).toEqual({ lat: 40, lng: -3 });
  });

  it("llama a clearWatch al desmontar", () => {
    watchPositionMock.mockReturnValue(123);

    const { unmount } = renderHook(() => useUserLocation());
    unmount();

    expect(clearWatchMock).toHaveBeenCalled();
  });
});
