import axios from 'axios';

// Mapping of our local location names to KSRTC Swift City IDs
// This can be expanded or fetched dynamically from https://assets.onlineksrtcswift.com/api/resource/getCities
const CITY_MAP = {
  'Thiruvananthapuram Central': { id: 443, name: 'Trivandrum (1)' },
  'Kochi': { id: 449, name: 'Ernakulam (7)' },
  'Ernakulam': { id: 449, name: 'Ernakulam (7)' },
  'Thrissur': { id: 447, name: 'Thrissur (5)' },
  'Kozhikode': { id: 452, name: 'Kozhikode (10)' },
  'Kannur': { id: 453, name: 'Kannur (12)' },
  'Kasaragod': { id: 454, name: 'Kasargod (14)' },
  'Palakkad': { id: 451, name: 'Palakkad (8)' },
  'Kottayam': { id: 446, name: 'Kottayam (4)' },
  'Kollam': { id: 444, name: 'Kollam (2)' },
  'Alappuzha': { id: 448, name: 'Alappuzha (6)' },
  'Malappuram': { id: 450, name: 'Malappuram (9)' },
  'Kalpetta': { id: 1045, name: 'Kalpetta (13)' }
};

/**
 * Fetches real-time bus data from KSRTC Swift API
 */
export const fetchKSRTCLiveBuses = async (fromName, toName, date) => {
  try {
    const from = CITY_MAP[fromName];
    const to = CITY_MAP[toName];

    if (!from || !to) {
      console.log(`Mapping not found for ${fromName} or ${toName}. Falling back to local data.`);
      return null;
    }

    // Format: YYYY-MM-DD
    const searchDate = new Date(date).toISOString().split('T')[0];

    const url = `https://onlineksrtcswift.com/api/resource/searchRoutesV4`;
    const params = {
      fromCityID: from.id,
      toCityID: to.id,
      fromCityName: from.name,
      toCityName: to.name,
      journeyDate: searchDate,
      mode: 'oneway'
    };

    const response = await axios.get(url, {
      params,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      }
    });

    if (!response.data || !response.data.data || !response.data.data.routeScheduleList) {
      return [];
    }

    // Map KSRTC format to our Bus Schema
    return response.data.data.routeScheduleList.map(item => ({
      _id: `live-${item.RouteScheduleId}`,
      busNumber: item.BusNumber || `KSRTC-${item.RouteScheduleId}`,
      busType: item.ServiceTypeName || 'KSRTC Swift',
      totalSeats: item.TotalSeats || 40,
      availableSeats: item.AvailableSeats || 0,
      farePerKm: item.Fare / 100, // Approximate fare mapping
      route: [
        {
          stationName: fromName,
          arrivalTime: item.DepartureTime.split('T')[1].substring(0, 5),
          departureTime: item.DepartureTime.split('T')[1].substring(0, 5)
        },
        {
          stationName: toName,
          arrivalTime: item.ArrivalTime.split('T')[1].substring(0, 5),
          departureTime: item.ArrivalTime.split('T')[1].substring(0, 5)
        }
      ],
      liveStatus: item.AvailableSeats > 10 ? "Seats Available" : "Filling Fast",
      isLive: true,
      provider: 'KSRTC Official'
    }));

  } catch (error) {
    console.error("KSRTC API Error:", error.message);
    return null; // Return null to indicate failure and fallback to local DB
  }
};
