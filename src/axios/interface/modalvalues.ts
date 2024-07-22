export interface modalValues {
  writetime: string;
  bpm: number;
  arrCnt: number;
  actCal: number;
  step: number;
  temp: number;
  distance: number;
}

export interface ModalDefaultType {
  open: boolean;
  setModalOpen: (value: React.SetStateAction<boolean>) => void;
}
