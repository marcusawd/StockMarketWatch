const BASE_URL = "https://api.airtable.com/v0";
const BASE_ID = "appZc59ROH4zLPJTz";
const TABLE_ID = "tblLaD4KtenvcHkkr";
const API_URL = `${BASE_URL}/${BASE_ID}/${TABLE_ID}`;
const API_TOKEN =
	"patNoseWzzfciIf4z.ef8d367f7e4fe88f3829bfe60bbdfec0859b78c9d5412590608f831ad362a3c2";

async function getPortfolioData() {
	const response = await fetch(API_URL, {
		method: "GET",
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
		},
	});
	const data = await response.json();
	return data;
}

async function postPortfolioData(data) {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const newRecord = await response.json();
	return newRecord;
}

async function patchPortfolioData(data) {
	const response = await fetch(API_URL, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${API_TOKEN}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const updatedRecord = await response.json();
	return updatedRecord;
}

export { getPortfolioData, postPortfolioData, patchPortfolioData };
