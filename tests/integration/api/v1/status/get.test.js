const { version } = require("react");

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.update_at).toISOString(); // Verifica se é uma data válida

  expect(responseBody.update_at).toEqual(parsedUpdatedAt); // Verifica se a data é a mesma que foi retornada
  expect(responseBody.depenendencies.database.version).toEqual("16.0");
  expect(responseBody.depenendencies.database.max_connections).toEqual(100);
  expect(responseBody.depenendencies.database.current_connections).toEqual(1);
  console.log(responseBody);
});
