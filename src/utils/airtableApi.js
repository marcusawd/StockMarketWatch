const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = "appZc59ROH4zLPJTz";
const TABLE_ID = "tblLaD4KtenvcHkkr";
const API_TOKEN =
	"patNoseWzzfciIf4z.ef8d367f7e4fe88f3829bfe60bbdfec0859b78c9d5412590608f831ad362a3c2";
async function getPortfolioData() {
	const url = `${BASE_URL}/${BASE_ID}/${TABLE_ID}`;
	const response = await fetch(url, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
		},
	});
	const data = await response.json();
	console.log(data);
}

export { getPortfolioData };
