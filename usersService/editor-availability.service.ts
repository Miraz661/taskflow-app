import { Fetch } from "@/lib/Fetch";

export interface AvailabilityData {
  isAvailable: boolean;
  availableFrom?: string;
  availableUntil?: string;
  reason?: string;
}

export interface AvailabilityResponse {
  success: boolean;
  message?: string;
  data: AvailabilityData & { updatedAt?: string };
}

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const EditorAvailabilityService = {
  /**
   * Set editor availability status
   * @param availability - The availability data to set
   * @returns Promise with the updated availability
   */
  setAvailability: async (
    availability: AvailabilityData
  ): Promise<AvailabilityResponse> => {
    try {
      const response = await Fetch.post(
        "/api/editor/availability",
        availability,
        config
      );
      return response;
    } catch (error) {
      console.error("Error setting availability:", error);
      throw error;
    }
  },

  /**
   * Get current editor availability status
   * @returns Promise with the current availability
   */
  getAvailability: async (): Promise<AvailabilityResponse> => {
    try {
      const response = await Fetch.get(
        "/api/editor/availability",
        config
      );
      return response;
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw error;
    }
  },

  /**
   * Mark editor as available
   * @returns Promise with the updated availability
   */
  markAvailable: async (): Promise<AvailabilityResponse> => {
    return EditorAvailabilityService.setAvailability({
      isAvailable: true,
    });
  },

  /**
   * Mark editor as temporarily unavailable
   * @param from - Start date of unavailability (YYYY-MM-DD)
   * @param until - End date of unavailability (YYYY-MM-DD)
   * @param reason - Optional reason for unavailability
   * @returns Promise with the updated availability
   */
  markUnavailable: async (
    from: string,
    until: string,
    reason?: string
  ): Promise<AvailabilityResponse> => {
    return EditorAvailabilityService.setAvailability({
      isAvailable: false,
      availableFrom: from,
      availableUntil: until,
      reason,
    });
  },
};
