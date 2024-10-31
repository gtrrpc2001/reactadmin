export interface graphModal {
  bpm: boolean;
  pulse: boolean;
  stress?: boolean;
  cal: boolean;
  step: boolean;
  hrv: boolean;
}

export interface graphBpm {
  bpm: number;
  hrv: number;
  stress: { pns: number, sns: number };
  writetime: string;
}

export interface StressData {
  pns_percent: number;
  sns_percent: number;
  writetime: string;
}

export interface writetimeButtonModal {
  today: boolean;
  days2: boolean;
  days3: boolean;
}

export interface dayGubunButtonModal {
  day: boolean;
  week: boolean;
  month: boolean;
  year: boolean;
}

export interface graphValueReduce {
  max: number;
  min: number;
  aver: number;
}

export interface graphPulse {
  count: number;
  writetime: string;
}

export interface graphCalStep {
  cal: number;
  calexe: number;
  step: number;
  distanceKM: number;
  writetime: string;
}
