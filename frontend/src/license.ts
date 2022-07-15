$(document).ready(async function () {
  //@ts-ignore
  const license = $("#license").DataTable({
    ajax: "/api/license",
    columns: [
      { data: "id" },
      { data: "key" },
      { data: "cors" },
      { data: "quantity" },
      { data: "software_id" },
      { data: "bezeichnung" },
      { data: "geraete_id" },
    ],
  });

  const form = $("form#licenseForm");

  form.on("submit", async (event) => {
    event.preventDefault();

    const id = $("input#id").val().toString();
    const geraete_id = $("input#geraete_id").val().toString();
    const cors = $("input#cors").val().toString();
    const quantity = $("input#quantity").val().toString();
    const key = $("input#key").val().toString();
    const software_id = $("input#software_id").val().toString();

    await fetch("/api/license", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        key: key,
        cors: cors,
        quantity: quantity,
        software_id: software_id,
        geraete_id: geraete_id,
      }),
    }).then((res) => res.json());

    location.reload();
  });

  $("#license tbody").on("click", "tr", function () {
    $(this).toggleClass("selected");

    const row = license.row(".selected").data();

    if ($(this).hasClass("selected")) {
      $("input#id").val(row.id);
      $("input#key").val(row.key);
      $("input#cors").val(row.cors);
      $("input#quantity").val(row.quantity);
      $("input#software_id").val(row.software_id);
      $("input#geraete_id").val(row.geraete_id);
    } else {
      //@ts-ignore
      form[0].reset();
    }
  });

  $("#licenseUnselect").on("click", function () {
    license.$("tr.selected").removeClass("selected");
    //@ts-ignore
    form[0].reset();
  });

  $("#licenseDelete").click(async function () {
    const rows = license.rows(".selected").data();

    for (const row of rows) {
      await fetch("/api/license", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: row.id,
        }),
      }).then((res) => res.json());
    }
    location.reload();
  });
});
