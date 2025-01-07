export interface Weather {
  current: {
    temp_c: number;
    humidity: number;
    is_day: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  location: {
    country: string;
    name: string;
  };
}
