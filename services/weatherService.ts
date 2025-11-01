import { GoogleGenAI, Type } from "@google/genai";

// Define the structure of the weather data we expect from the API
export interface WeatherData {
  location: {
    city: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    is_day: boolean;
    condition: {
      text: string;
      code: number;
    };
    wind_kph: number;
    humidity: number;
    feelslike_c: number;
  };
  forecast: {
    date: string;
    day: {
      maxtemp_c: number;
      mintemp_c: number;
      condition: {
        text: string;
        code: number;
      };
    };
  }[];
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Define the JSON schema for the API response
const weatherSchema = {
  type: Type.OBJECT,
  properties: {
    location: {
      type: Type.OBJECT,
      properties: {
        city: { type: Type.STRING },
        country: { type: Type.STRING },
        localtime: { type: Type.STRING },
      },
    },
    current: {
      type: Type.OBJECT,
      properties: {
        temp_c: { type: Type.NUMBER },
        is_day: { type: Type.BOOLEAN },
        condition: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            code: { type: Type.INTEGER },
          },
        },
        wind_kph: { type: Type.NUMBER },
        humidity: { type: Type.INTEGER },
        feelslike_c: { type: Type.NUMBER },
      },
    },
    forecast: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING },
          day: {
            type: Type.OBJECT,
            properties: {
              maxtemp_c: { type: Type.NUMBER },
              mintemp_c: { type: Type.NUMBER },
              condition: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  code: { type: Type.INTEGER },
                },
              },
            },
          },
        },
      },
    },
  },
};

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  const model = 'gemini-2.5-flash';
  
  const prompt = `
    You are a weather API. Provide the current weather and a 5-day forecast for the following location: "${location}".
    Use real, up-to-date weather data. The 'code' property for the condition should be based on standard weather condition codes.
    Today's date is ${new Date().toDateString()}.
    The forecast should start from tomorrow.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: weatherSchema,
      },
    });

    if (!response.text) {
      throw new Error("API returned an empty response.");
    }
    
    // Clean potential markdown formatting from the response
    const cleanedJsonString = response.text.replace(/```json|```/g, '').trim();
    const weatherData: WeatherData = JSON.parse(cleanedJsonString);
    
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error("Failed to fetch weather data from Gemini API. The location might not be valid.");
  }
};
