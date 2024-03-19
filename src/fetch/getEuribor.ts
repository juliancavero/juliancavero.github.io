type Response = {
  non_central_bank_rates: {
    name: string;
    rate_pct: number;
    last_updated: string;
  }[];
};

export const getEuribor = async () => {
  const response = await fetch(
    "https://api.api-ninjas.com/v1/interestrate?name=Euribor",
    {
      headers: {
        "X-Api-Key": "WWpJyKoHha2V93WfyUAs0A==5m4z0ze60I89YA1L",
      },
    }
  );
  const data: Response = await response.json();
  if (
    data &&
    data.non_central_bank_rates &&
    data.non_central_bank_rates.length > 0
  ) {
    return data.non_central_bank_rates[0].rate_pct;
  }
  return 1;
};
