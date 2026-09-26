export type Language = 'ua' | 'en';

export type AlertState = 'N' | 'P' | 'A'; // None, Partial, Full Alarm

export interface RegionData {
  id: number;
  nameUa: string;
  nameEn: string;
  pointOffset: number;
  pointCount: number;
  apiIndex?: number;
}

export interface MapPoint {
  x: number;
  y: number;
}

export interface RtosTask {
  name: string;
  folder: string;
  priority: number;
  blockedOn: string;
  descriptionUa: string;
  descriptionEn: string;
  stackWatermark: number;
  status: 'RUNNING' | 'BLOCKED' | 'SUSPENDED';
}

export interface BomItem {
  id: string;
  component: string;
  componentEn: string;
  gpio: string;
  roleUa: string;
  roleEn: string;
  approxPriceUah: number;
  approxPriceUsd: number;
  notesUa: string;
  notesEn: string;
}
