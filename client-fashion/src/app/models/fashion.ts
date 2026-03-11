export interface Fashion {
  _id?: string;
  title: string;
  details: string;
  thumbnail: string;
  style: 'Street Style' | 'Trends' | 'Minimal' | string;
  creationDate: string | Date;
}
