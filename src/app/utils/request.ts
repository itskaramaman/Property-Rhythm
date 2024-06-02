import axios from "axios";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties() {
  try {
    // handle the case where domain is not available yet.
    if (!apiDomain) return [];
    const res = await axios.get(`${apiDomain}/properties`);
    return res.data.properties;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function fetchProperty(id: string) {
  try {
    // handle the case where domain is not available yet.
    if (!apiDomain) return null;
    const res = await axios.get(`${apiDomain}/properties/${id}`);
    return res.data.property;
  } catch (error) {
    console.log(error);
    return null;
  }
}
