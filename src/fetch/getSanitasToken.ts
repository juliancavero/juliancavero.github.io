type Response = {
  access_token: string;
  refresh_token: string;
};

const URL =
  "https://api.sanitas.es/oauth2p_inet/api/v3/token?grant_type=password";

export const getSanitasToken = async () => {
  const response = await fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      applicationId: "MSApp",
      login: "17468568E",
      remember: false,
      password: "Diciembre1995",
    }),
    headers: {
      Authorization:
        "Basic OUxNTUViVzZJUGNEM2diVVY4dWxhWnBjQmVkOWlHaks6M3B2SHo0TEo4UzJaM2NlVg==",
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw new Error("Error en la petición");
  }
  const data: Response = await response.json();
  if (data && data.access_token) {
    return data.access_token;
  }
  return null;
};
