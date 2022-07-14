$(document).ready(async function () {
  //@ts-ignore
  const software = $("#software").DataTable({
    ajax: "/api/software",
    columns: [{ data: "id" }, { data: "bezeichnung" }],
  });

  const form = $("form#softwareForm");

  form.on("submit", async (event) => {
    event.preventDefault();

    const id = $("input#id").val().toString();
    const bezeichnung = $("input#bezeichnung").val().toString();

    await fetch("/api/software", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        bezeichnung: bezeichnung,
      }),
    }).then((res) => res.json());

    location.reload();
  });

  $("#software tbody").on("click", "tr", function () {
    $(this).toggleClass("selected");

    const row = software.row(".selected").data();

    if ($(this).hasClass("selected")) {
      $("input#id").val(row.id);
      $("input#bezeichnung").val(row.bezeichnung);
    } else {
      //@ts-ignore
      form[0].reset();
    }
  });

  $("#softwareUnselect").on("click", function () {
    software.$("tr.selected").removeClass("selected");
    //@ts-ignore
    form[0].reset();
  });

  $("#softwareDelete").click(async function () {
    const rows = software.rows(".selected").data();

    for (const row of rows) {
      await fetch("/api/software", {
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
