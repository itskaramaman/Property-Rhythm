export interface PropertyInterface {
  _id: string;
  owner: string;
  name: string;
  type: string;
  description: string;
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  };
  beds: number;
  baths: number;
  square_feet: number;
  amenities: string[];
  rates: {
    nightly?: number;
    weekly?: number;
    monthly?: number;
  };
  seller_info: {
    name: string;
    email: string;
    phone: string;
  };
  images: string[];
  is_featured: boolean;
}

export interface MessageInterface {
  _id: string;
  sender: string;
  recipient: string;
  property: PropertyInterface;
  name: string;
  email: string;
  phone?: string;
  body?: string;
  read: boolean;
  createdAt: string;
}
