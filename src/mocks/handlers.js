import { http, HttpResponse } from "msw";
import appliances from "../data/appliances.json";

export const handlers = [
  http.get("/api/v1/appliances", ({ request }) => {
    console.log("request", request);

    const url = new URL(request.url);

    const pageParams = url.searchParams.get("page");
    const pageSizeParams = url.searchParams.get("pageSize");
    const searchTerm = url.searchParams.get("searchTerm");

    const page = parseInt(pageParams) || 1;
    const pageSize = parseInt(pageSizeParams) || 10;

    // Apply search filter only on theatreName

    const filteredAppliances = appliances.filter((appliance) =>
      appliance.theatreName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log("filteredAppliances", filteredAppliances);

    // Calculate pagination
    const totalPages = Math.ceil(filteredAppliances.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredAppliances.length);
    const paginatedAppliances = filteredAppliances.slice(startIndex, endIndex);

    return HttpResponse.json({
      appliances: paginatedAppliances,
      totalPages: totalPages,
      currentPage: page,
    });
  }),

  http.get("/api/v1/appliances/:id", ({ params }) => {
    console.log("params", params);
    const applianceId = params.id;

    const foundAppliance = appliances.find(
      (appliance) => appliance.serialNo === applianceId
    );

    console.log("foundAppliance", foundAppliance);

    if (foundAppliance) {
      return HttpResponse.json({
        appliance: foundAppliance,
      });
    } else {
      return new HttpResponse(404, "Appliance not found");
    }
  }),
];
