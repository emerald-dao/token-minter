import 'dotenv/config';

export async function GET({ url }) {
  try {
    response = await fetch('https://pro-api.coinmarketcap.com//cryptocurrency/quotes/latest?id=4558', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.CMC_PRO_API_KEY,
      },
    });

    let json = await response.json();
    let flowPrice = json.data[4558].quote.USD.price;
    console.log(flowPrice);
    console.log(json);

    return {
      status: 200,
      body: {
        flowPrice,
      },
    };
  } catch (error) {
    return {
      status: 500,
      body: {
        error: 'Could not fetch flow price. ' + error,
      },
    };
  }
};
