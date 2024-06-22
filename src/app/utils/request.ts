import axios from "axios";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

export async function fetchProperties(page = 1, pageSize = 9) {
  try {
    // handle the case where domain is not available yet.
    if (!apiDomain) return { properties: [], total: 0 };
    const res = await axios.get(
      `${apiDomain}/properties?page=${page}&pageSize=${pageSize}`
    );
    return { properties: res.data.properties, total: res.data.total };
  } catch (error) {
    console.log(error);
    return { properties: [], total: 0 };
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
