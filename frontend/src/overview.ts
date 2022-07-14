$(document).ready(async function () {
  //@ts-ignore
  $("#overview").DataTable({
    ajax: "/api/overview",
    columns: [
      { data: "computername" },
      { data: "ip_adress" },
      { data: "datum" },
      { data: "bezeichnung" },
      { data: "key" },
    ],
  });
});
